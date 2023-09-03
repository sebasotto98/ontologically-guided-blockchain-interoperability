import { Express } from "express";
import OAS from "../../json/openapi.json";
import {
  Logger,
  Checks,
  LogLevelDesc,
  LoggerProvider,
} from "@hyperledger/cactus-common";
import {
  ICactusPlugin,
  IPluginWebService,
  IWebServiceEndpoint,
} from "@hyperledger/cactus-core-api";
import {
  DefaultApi as QuorumApi,
  Web3SigningCredential,
} from "@hyperledger/cactus-plugin-ledger-connector-quorum";
import { DefaultApi as BesuApi } from "@hyperledger/cactus-plugin-ledger-connector-besu";
import { InsertBambooHarvestEndpoint } from "./web-services/insert-bamboo-harvest-endpoint";
import { DefaultApi as FabricApi } from "@hyperledger/cactus-plugin-ledger-connector-fabric";

import { ListBambooHarvestEndpoint } from "./web-services/list-bamboo-harvest-endpoint";
import { ISupplyChainContractDeploymentInfo } from "../i-supply-chain-contract-deployment-info";
import { InsertBookshelfEndpoint } from "./web-services/insert-bookshelf-endpoint";
import { ListBookshelfEndpoint } from "./web-services/list-bookshelf-endpoint";
import { InsertShipmentEndpoint } from "./web-services/insert-shipment-endpoint";
import { ListShipmentEndpoint } from "./web-services/list-shipment-endpoint";
import { parse, sym, graph, IndexedFormula, literal, namedNode } from "rdflib";
import {
  BusinessProcess,
  BusinessFunction,
  BusinessRole,
} from "../model/business-entities";
import * as fs from "fs";
import * as path from "path";

export interface OrgEnv {
  CORE_PEER_LOCALMSPID: string;
  CORE_PEER_ADDRESS: string;
  CORE_PEER_MSPCONFIGPATH: string;
  CORE_PEER_TLS_ROOTCERT_FILE: string;
  ORDERER_TLS_ROOTCERT_FILE: string;
}

export interface ISupplyChainCactusPluginOptions {
  logLevel?: LogLevelDesc;
  instanceId: string;
  quorumApiClient: QuorumApi;
  besuApiClient: BesuApi;
  fabricApiClient: FabricApi;
  web3SigningCredential?: Web3SigningCredential;
  fabricEnvironment?: NodeJS.ProcessEnv;
  contracts: ISupplyChainContractDeploymentInfo;
}

const labelUri = "http://www.w3.org/2000/01/rdf-schema#label";
const compositionUri = "http://bp4mc2.org/def/archimate#composition";
//const typeUri = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
//const businessFunctionUri = sym('http://bp4mc2.org/def/archimate#BusinessFunction');
//const businessProcessUri = sym('http://bp4mc2.org/def/archimate#BusinessProcess');
//const businessRoleUri = sym('http://bp4mc2.org/def/archimate#BusinessRole');

export class RDFQuerier {
  private static readonly CLASS_NAME = "RDFQuerier";

  static ONTOLOGY_NAME = "blockchain-interoperability-ontology";
  static ONTOLOGY_PREFIX = "http://example.com/" + RDFQuerier.ONTOLOGY_NAME;

  static store: IndexedFormula;

  public get className(): string {
    return RDFQuerier.CLASS_NAME;
  }

  private static addValueToMap(
    map: Map<string, string[]>,
    key: string,
    value: any,
  ) {
    if (map.has(key)) {
      const values = map.get(key);
      values?.push(value);
    } else {
      map.set(key, [value]);
    }
  }

  private static fetchDetailsByUri(uri: string): any {
    const entity = namedNode(uri);
    const triples = this.store.match(entity);
    const properties = new Map<string, string[]>();
    triples.forEach((triple) => {
      const predicate = triple.predicate.value;
      const object = triple.object.value;
      RDFQuerier.addValueToMap(properties, predicate, object);
    });
    return properties;
  }

  public static fetchDetailsByLabel(label: string): any {
    const entityUri = this.fetchEntityByLabel(label);
    if (!entityUri) {
      return null;
    }
    return this.fetchDetailsByUri(entityUri[1]);
  }

  public static fetchLabelByUri(uri: string): any {
    const properties = this.fetchDetailsByUri(uri);
    return properties.get(labelUri)[0];
  }

  public static fetchEntityByLabel(label: string): any {
    // TODO: Might need to change this to "match" in the future to account for multiple entities
    const entityUri = this.store.any(
      undefined,
      sym(labelUri),
      literal(label, "en"),
    );

    if (entityUri) {
      console.log(
        this.CLASS_NAME + ` :: ` + `Found entity with label ${label}`,
      );
      // Will make sense to also return the label in the future when a semantically similar entity may exist
      return [label, entityUri];
    } else {
      console.log(
        this.CLASS_NAME + ` :: ` + `No entity found with label ${label}`,
      );
      return null;
    }
  }
}

export class SupplyChainCactusPlugin
  implements ICactusPlugin, IPluginWebService {
  public static readonly CLASS_NAME = "SupplyChainCactusPlugin";

  private static log: Logger;
  private readonly instanceId: string;

  private endpoints: IWebServiceEndpoint[] | undefined;

  public get className(): string {
    return SupplyChainCactusPlugin.CLASS_NAME;
  }

  public static businessRoles?: BusinessRole[];
  public static businessFunctions?: BusinessFunction[];
  public static businessProcess?: BusinessProcess;

  constructor(public readonly options: ISupplyChainCactusPluginOptions) {
    const fnTag = `${this.className}#constructor()`;

    Checks.truthy(options, `${fnTag} arg options`);
    Checks.truthy(options.instanceId, `${fnTag} arg options.instanceId`);
    Checks.nonBlankString(options.instanceId, `${fnTag} options.instanceId`);
    Checks.truthy(options.contracts, `${fnTag} arg options.contracts`);
    Checks.truthy(
      options.quorumApiClient,
      `${fnTag} arg options.quorumApiClient`,
    );

    const level = this.options.logLevel || "INFO";
    const label = this.className;
    SupplyChainCactusPlugin.log = LoggerProvider.getOrCreate({ level, label });
    this.instanceId = options.instanceId;

    SupplyChainCactusPlugin.initModel();
    SupplyChainCactusPlugin.initQuerier();
  }

  public static initQuerier() {
    if (!RDFQuerier.store) {
      RDFQuerier.store = graph();
      const ontologyUrl = RDFQuerier.ONTOLOGY_PREFIX + ".rdf";
      const ontologyContent = fs.readFileSync(
        path.resolve(
          __dirname,
          "../../rdf/" + RDFQuerier.ONTOLOGY_NAME + ".rdf",
        ),
        "utf-8",
      );
      parse(
        ontologyContent,
        RDFQuerier.store,
        ontologyUrl,
        "application/rdf+xml",
      );
    }
  }

  // TODO: Crawl ontology for all available business roles, functions and process entities instead of initializing them manually
  public static initModel() {
    this.businessRoles = [
      // TODO: Extract format values from ontology
      {
        entity: "Harvester",
        nameFormat: "^[a-zA-Z0-9\\-,. ]+$",
        inventoryQuantityFormat: "^\\d{1,9}$",
        accountBalanceFormat: "^\\d+(\\.\\d{1,2})?$",
      },
      {
        entity: "Manufacturer",
        nameFormat: "^[a-zA-Z0-9\\-,. ]+$",
        inventoryQuantityFormat: "^\\d{1,9}$",
        accountBalanceFormat: "^\\d+(\\.\\d{1,2})?$",
      },
      {
        entity: "Shipper",
        nameFormat: "^[a-zA-Z0-9\\-,. ]+$",
        inventoryQuantityFormat: "^\\d{1,9}$",
        accountBalanceFormat: "^\\d+(\\.\\d{1,2})?$",
      },
    ];

    this.businessFunctions = [
      // TODO: Extract object (access, association and specialization relations) and triggeredBy values from ontology
      {
        entity: "Harvest",
        object: "bamboo",
        triggeredBy: this.businessRoles[0].entity,
      },
      {
        entity: "Manufacture",
        object: "bookshelf",
        triggeredBy: this.businessRoles[1].entity,
      },
      {
        entity: "Ship",
        object: "shipment",
        triggeredBy: this.businessRoles[2].entity,
      },
    ];
  }

  public getOpenApiSpec(): unknown {
    return OAS;
  }

  async registerWebServices(app: Express): Promise<IWebServiceEndpoint[]> {
    const webServices = await this.getOrCreateWebServices();
    await Promise.all(webServices.map((ws) => ws.registerExpress(app)));
    return webServices;
  }

  public async getOrCreateWebServices(): Promise<IWebServiceEndpoint[]> {
    if (Array.isArray(this.endpoints)) {
      return this.endpoints;
    }
    const insertBambooHarvest = new InsertBambooHarvestEndpoint({
      contractName: this.options.contracts.bambooHarvestRepository.contractName,
      apiClient: this.options.quorumApiClient,
      web3SigningCredential: this.options
        .web3SigningCredential as Web3SigningCredential,
      logLevel: this.options.logLevel,
      keychainId: this.options.contracts.bambooHarvestRepository.keychainId,
    });

    const listBambooHarvest = new ListBambooHarvestEndpoint({
      contractName: this.options.contracts.bambooHarvestRepository.contractName,
      apiClient: this.options.quorumApiClient,
      logLevel: this.options.logLevel,
      keychainId: this.options.contracts.bambooHarvestRepository.keychainId,
    });

    const insertBookshelf = new InsertBookshelfEndpoint({
      contractName: this.options.contracts.bookshelfRepository.contractName,
      besuApi: this.options.besuApiClient,
      web3SigningCredential: this.options
        .web3SigningCredential as Web3SigningCredential,
      logLevel: this.options.logLevel,
      keychainId: this.options.contracts.bookshelfRepository.keychainId,
    });

    const listBookshelf = new ListBookshelfEndpoint({
      contractName: this.options.contracts.bookshelfRepository.contractName,
      besuApi: this.options.besuApiClient,
      logLevel: this.options.logLevel,
      keychainId: this.options.contracts.bookshelfRepository.keychainId,
    });

    const insertShipment = new InsertShipmentEndpoint({
      logLevel: this.options.logLevel,
      fabricApi: this.options.fabricApiClient,
      keychainId: this.options.contracts.bookshelfRepository.keychainId,
    });

    const listShipment = new ListShipmentEndpoint({
      logLevel: this.options.logLevel,
      fabricApi: this.options.fabricApiClient,
      keychainId: this.options.contracts.bookshelfRepository.keychainId,
    });

    this.endpoints = [
      insertBambooHarvest,
      listBambooHarvest,
      insertBookshelf,
      listBookshelf,
      insertShipment,
      listShipment,
    ];
    return this.endpoints;
  }

  public async shutdown(): Promise<void> {
    SupplyChainCactusPlugin.log.info(`Shutting down ${this.className}...`);
  }

  public getInstanceId(): string {
    return this.instanceId;
  }

  public getPackageName(): string {
    return "@hyperledger/cactus-example-supply-chain-backend";
  }

  public async onPluginInit(): Promise<unknown> {
    return;
  }

  // Takes the source role name as input and retrieves the name of a relevant role from the ontology
  public static map(sourceRoleObj: BusinessRole): BusinessRole {
    console.log(
      this.CLASS_NAME +
        ` :: ` +
        "Attempting to map source role " +
        sourceRoleObj.entity +
        " to ontology role...",
    );
    const role = RDFQuerier.fetchEntityByLabel(sourceRoleObj.entity || "");
    if (!role) {
      // Role not found
      throw new Error(
        this.CLASS_NAME +
          ` :: ` +
          "Unable to map source role " +
          sourceRoleObj.entity +
          " to ontology role",
      );
    }
    // Found exact role or a semantically similar one so proceed with its conversion
    console.log(
      this.CLASS_NAME +
        ` :: ` +
        "Found an ontology role " +
        role[0] +
        " with URI " +
        role[1] +
        " compatible with source role " +
        sourceRoleObj.entity,
    );
    return this.convert(role[0], sourceRoleObj);
  }

  // Takes as input the name of the ontology role and the source role object and returns an ontology role object
  private static convert(
    ontologyRole: string,
    sourceRoleObj: BusinessRole,
  ): BusinessRole {
    console.log(
      this.CLASS_NAME +
        ` :: ` +
        "Attempting to convert source role " +
        sourceRoleObj.entity +
        " to ontology role " +
        ontologyRole +
        "...",
    );
    let ontologyRoleObj = this.businessRoles?.find(
      (role) => role.entity === ontologyRole,
    ) as BusinessRole;
    if (!ontologyRoleObj) {
      throw new Error(
        this.CLASS_NAME + ` :: ` + "Unable to find ontology role",
      );
    }
    // Builds corresponding ontology role object based on the source role object (i.e., extract available data)
    ontologyRoleObj = Object.assign({}, ontologyRoleObj, sourceRoleObj);
    console.log(
      this.CLASS_NAME +
        ` :: ` +
        "Built an ontology role " +
        ontologyRoleObj.entity +
        " based on the source role " +
        sourceRoleObj.entity,
    );
    return ontologyRoleObj;
  }

  public static validate(
    ontologyRoleObj: BusinessRole,
    targetRole: string,
    process: string,
  ): boolean {
    return (
      this.validateData(ontologyRoleObj) &&
      this.validateState(ontologyRoleObj.entity, targetRole, process)
    );
  }

  private static getFieldsContainingWord(obj: any, word: string): string[] {
    const fields: string[] = [];
    for (const key in obj) {
      if ({}.propertyIsEnumerable.call(obj, key) && key.includes(word)) {
        fields.push(key);
      }
    }
    return fields;
  }

  private static isValidRegex(regexString: string): boolean {
    try {
      new RegExp(regexString);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static matchesRegex(
    regexString: string,
    inputString: string,
  ): boolean {
    const regex = new RegExp(regexString);
    return regex.test(inputString);
  }

  // Takes as input the ontology entity object and checks wether all its field values conform to their corresponding format fields
  private static validateData(ontologyRoleObj: any): boolean {
    console.log(this.CLASS_NAME + ` :: ` + "Starting data validation...");
    const fieldsToCompare = SupplyChainCactusPlugin.getFieldsContainingWord(
      ontologyRoleObj,
      "Format",
    );
    // Ensures that the properties of the object to be sent are valid (i.e., the values are within what is expected according to the EA model)
    for (let i = 0; i < fieldsToCompare.length; i++) {
      const formatFieldName = fieldsToCompare[i];
      const fieldName = formatFieldName.replace("Format", "");
      if (!(fieldName in ontologyRoleObj)) {
        console.log(
          this.CLASS_NAME + ` :: ` + `No format field found for ${fieldName}`,
        );
        continue;
      }
      const fieldValue = ontologyRoleObj[fieldName];
      const formatValue = ontologyRoleObj[formatFieldName];
      if (!this.isValidRegex(formatValue)) {
        console.log(
          this.CLASS_NAME +
            ` :: ` +
            `${formatFieldName} is not a regular expression`,
        );
        return false;
      }
      if (!this.matchesRegex(formatValue, fieldValue)) {
        console.log(
          this.CLASS_NAME +
            ` :: ` +
            `${fieldName} does not match the format specified in ${formatFieldName}`,
        );
        return false;
      }
    }
    console.log(this.CLASS_NAME + ` :: ` + "Data validated successfully");
    return true;
  }

  private static areAdjacent<T>(obj1: T, obj2: T, arr: T[]): boolean {
    const index1 = arr.indexOf(obj1);
    const index2 = arr.indexOf(obj2);
    if (index1 < 0 || index2 < 0) {
      // Either object not found in array
      return false;
    }
    // Check if the absolute difference in indices is 1
    return Math.abs(index1 - index2) === 1;
  }

  // Takes as input the source and target roles and their process and checks wether the process has a function that is triggered by the source role
  // and a function that is triggered by the target role, where the latter succeeds the former
  private static validateState(
    sourceRole: string,
    targetRole: string,
    process: string,
  ): boolean {
    console.log(this.CLASS_NAME + ` :: ` + "Starting state validation...");
    if (!sourceRole) {
      return false;
    }
    const processObj = RDFQuerier.fetchDetailsByLabel(process);
    if (!processObj) {
      // Process not found
      return false;
    }
    let sourceFunction;
    let targetFunction;
    // Ensures that the transaction being executed is valid (i.e., a transition from/to the specific business functions can occur in the current business process
    // according to the EA model)
    // TODO - FUTURE: Fix not being applicable for cases where an entity triggers multiple functions inside a process
    const funcs: any[] = [];
    processObj.get(compositionUri).forEach((funcUri: string) => {
      const funcName = RDFQuerier.fetchLabelByUri(funcUri);
      const func = this.businessFunctions?.find(
        (func) => func.entity === funcName,
      ) as BusinessFunction;
      if (func?.triggeredBy === sourceRole) {
        sourceFunction = func;
      }
      if (func?.triggeredBy === targetRole) {
        targetFunction = func;
      }
      funcs.push(func);
    });
    return (
      sourceFunction !== null &&
      ((targetFunction !== null &&
        SupplyChainCactusPlugin.areAdjacent(
          sourceFunction,
          targetFunction,
          funcs,
        )) ||
        !targetRole)
    );
  }
}
