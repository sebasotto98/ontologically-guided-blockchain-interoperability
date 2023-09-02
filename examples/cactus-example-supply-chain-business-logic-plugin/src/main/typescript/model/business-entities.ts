import { Configuration } from "./configuration";
import { RequestArgs, BaseAPI, BASE_PATH } from "./base";
import globalAxios, { AxiosPromise, AxiosInstance } from "axios";
import {
  DUMMY_BASE_URL,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "./common";
// --------------------------------------------------------------------------- APIs -----------------------------------------------------------------------------------
/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Inserts the provided BambooHarvest entity to the ledger.
     * @param {InsertBambooHarvestRequest} [insertBambooHarvestRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async insertBambooHarvestV1(
      insertBambooHarvestRequest?: InsertBambooHarvestRequest,
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<InsertBambooHarvestResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.insertBambooHarvestV1(
        insertBambooHarvestRequest,
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Inserts the provided Bookshelf entity to the ledger.
     * @param {InsertBookshelfRequest} [insertBookshelfRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async insertBookshelfV1(
      insertBookshelfRequest?: InsertBookshelfRequest,
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<InsertBookshelfResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.insertBookshelfV1(
        insertBookshelfRequest,
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Inserts the provided Shipment entity to the ledger.
     * @param {InsertShipmentRequest} [insertShipmentRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async insertShipmentV1(
      insertShipmentRequest?: InsertShipmentRequest,
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<InsertShipmentResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.insertShipmentV1(
        insertShipmentRequest,
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Lists all the BambooHarvest entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listBambooHarvestV1(
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<ListBambooHarvestResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listBambooHarvestV1(
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Lists all the Bookshelf entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listBookshelfV1(
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<ListBookshelfResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listBookshelfV1(
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Lists all the Shipments entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listShipmentV1(
      options?: any,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<ListShipmentResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listShipmentV1(
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
  };
};
/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
  /**
   *
   * @summary Inserts the provided BambooHarvest entity to the ledger.
   * @param {InsertBambooHarvestRequest} [insertBambooHarvestRequest]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public insertBambooHarvestV1(
    insertBambooHarvestRequest?: InsertBambooHarvestRequest,
    options?: any,
  ) {
    return DefaultApiFp(this.configuration)
      .insertBambooHarvestV1(insertBambooHarvestRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Inserts the provided Bookshelf entity to the ledger.
   * @param {InsertBookshelfRequest} [insertBookshelfRequest]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public insertBookshelfV1(
    insertBookshelfRequest?: InsertBookshelfRequest,
    options?: any,
  ) {
    return DefaultApiFp(this.configuration)
      .insertBookshelfV1(insertBookshelfRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Inserts the provided Shipment entity to the ledger.
   * @param {InsertShipmentRequest} [insertShipmentRequest]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public insertShipmentV1(
    insertShipmentRequest?: InsertShipmentRequest,
    options?: any,
  ) {
    return DefaultApiFp(this.configuration)
      .insertShipmentV1(insertShipmentRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Lists all the BambooHarvest entities stored on the ledger.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public listBambooHarvestV1(options?: any) {
    return DefaultApiFp(this.configuration)
      .listBambooHarvestV1(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Lists all the Bookshelf entities stored on the ledger.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public listBookshelfV1(options?: any) {
    return DefaultApiFp(this.configuration)
      .listBookshelfV1(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Lists all the Shipments entities stored on the ledger.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public listShipmentV1(options?: any) {
    return DefaultApiFp(this.configuration)
      .listShipmentV1(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (
  configuration?: Configuration,
): any {
  return {
    /**
     *
     * @summary Inserts the provided BambooHarvest entity to the ledger.
     * @param {InsertBambooHarvestRequest} [insertBambooHarvestRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    insertBambooHarvestV1: async (
      insertBambooHarvestRequest?: InsertBambooHarvestRequest,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/insert-bamboo-harvest`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        insertBambooHarvestRequest,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Inserts the provided Bookshelf entity to the ledger.
     * @param {InsertBookshelfRequest} [insertBookshelfRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    insertBookshelfV1: async (
      insertBookshelfRequest?: InsertBookshelfRequest,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/insert-bookshelf`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        insertBookshelfRequest,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Inserts the provided Shipment entity to the ledger.
     * @param {InsertShipmentRequest} [insertShipmentRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    insertShipmentV1: async (
      insertShipmentRequest?: InsertShipmentRequest,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/insert-shipment`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        insertShipmentRequest,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Lists all the BambooHarvest entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listBambooHarvestV1: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/list-bamboo-harvest`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Lists all the Bookshelf entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listBookshelfV1: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/list-bookshelf`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Lists all the Shipments entities stored on the ledger.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listShipmentV1: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/plugins/@hyperledger/cactus-example-supply-chain-backend/list-shipment`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};
// --------------------------------------------------------------------------- REQUESTS -----------------------------------------------------------------------------------
/**
 *
 * @export
 * @interface InsertBambooHarvestRequest
 */
export interface InsertBambooHarvestRequest {
  /**
   *
   * @type {BambooHarvest}
   * @memberof InsertBambooHarvestRequest
   */
  bambooHarvest: Bamboo;
}
/**
 *
 * @export
 * @interface InsertBookshelfRequest
 */
export interface InsertBookshelfRequest {
  /**
   *
   * @type {Bookshelf}
   * @memberof InsertBookshelfRequest
   */
  bookshelf: Bookshelf;
}
/**
 *
 * @export
 * @interface InsertShipmentRequest
 */
export interface InsertShipmentRequest {
  /**
   *
   * @type {Shipment}
   * @memberof InsertShipmentRequest
   */
  shipment: Shipment;
}
// --------------------------------------------------------------------------- RESPONSES -----------------------------------------------------------------------------------
/**
 *
 * @export
 * @interface InsertBambooHarvestResponse
 */
export interface InsertBambooHarvestResponse {
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertBambooHarvestResponse
   */
  callOutput?: { [key: string]: Record<string, unknown> };
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertBambooHarvestResponse
   */
  transactionReceipt?: { [key: string]: Record<string, unknown> };
}
/**
 *
 * @export
 * @interface InsertBookshelfResponse
 */
export interface InsertBookshelfResponse {
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertBookshelfResponse
   */
  callOutput?: { [key: string]: Record<string, unknown> };
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertBookshelfResponse
   */
  transactionReceipt?: { [key: string]: Record<string, unknown> };
}
/**
 *
 * @export
 * @interface InsertShipmentResponse
 */
export interface InsertShipmentResponse {
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertShipmentResponse
   */
  callOutput?: { [key: string]: Record<string, unknown> };
  /**
   *
   * @type {{ [key: string]: object; }}
   * @memberof InsertShipmentResponse
   */
  transactionReceipt?: { [key: string]: Record<string, unknown> };
}
/**
 *
 * @export
 * @interface ListBambooHarvestResponse
 */
export interface ListBambooHarvestResponse {
  /**
   *
   * @type {Array<Bamboo>}
   * @memberof ListBambooHarvestResponse
   */
  data: Array<Bamboo>;
}
/**
 *
 * @export
 * @interface ListBookshelfResponse
 */
export interface ListBookshelfResponse {
  /**
   *
   * @type {Array<Bookshelf>}
   * @memberof ListBookshelfResponse
   */
  data: Array<Bookshelf>;
}
/**
 *
 * @export
 * @interface ListShipmentResponse
 */
export interface ListShipmentResponse {
  /**
   *
   * @type {Array<Shipment>}
   * @memberof ListShipmentResponse
   */
  data: Array<Shipment>;
}
// --------------------------------------------------------------------------- BUSINESS OBJECTS ---------------------------------------------------------------------------
/**
 *
 * @export
 * @interface Bamboo
 */
export interface Bamboo {
  /**
   *
   * @type {string}
   * @memberof Bamboo
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Bamboo
   */
  location: string;
  /**
   *
   * @type {string}
   * @memberof Bamboo
   */
  startedAt: string;
  /**
   *
   * @type {string}
   * @memberof Bamboo
   */
  endedAt: string;
  /**
   *
   * @type {BusinessRole}
   * @memberof Bamboo
   */
  harvester: BusinessRole;
}
/**
 *
 * @export
 * @interface Bookshelf
 */
export interface Bookshelf {
  /**
   *
   * @type {string}
   * @memberof Bookshelf
   */
  id: string;
  /**
   * The number of shelves the bookshelf comes with.
   * @type {number}
   * @memberof Bookshelf
   */
  shelfCount: number;
  /**
   * The foreign key ID referencing the bamboo harvest that yielded the wood material for the construction of the bookshelf.
   * @type {string}
   * @memberof Bookshelf
   */
  bambooHarvestId: string;
  /**
   *
   * @type {BusinessRole}
   * @memberof Bookshelf
   */
  manufacturer: BusinessRole;
}
/**
 *
 * @export
 * @interface Shipment
 */
export interface Shipment {
  /**
   *
   * @type {string}
   * @memberof Shipment
   */
  id: string;
  /**
   * The foreign key ID referencing the bookshelfId that will go in the shipment.
   * @type {string}
   * @memberof Shipment
   */
  bookshelfId: string;
  /**
   *
   * @type {BusinessRole}
   * @memberof Shipment
   */
  shipper: BusinessRole;
}
// ---------------------------------------------------------------------------- BUSINESS ROLES ----------------------------------------------------------------------------
export interface BusinessRole {
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  entity: string;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  nameFormat?: string;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  inventoryQuantity?: number;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  inventoryQuantityFormat?: string;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  accountBalance?: number;
  /**
   *
   * @type {string}
   * @memberof BusinessRole
   */
  accountBalanceFormat?: string;
  /**
   *
   * @type {string[]}
   * @memberof BusinessRole
   */
  readonly validatable?: ["name", "inventoryQuantity", "accountBalance"];
}
// POC instances:
// entity(harvester) -> name(ABC harvesters), inventory_quantity, account_balance
// entity(manufacturer) -> name(DEF manufacturers), inventory_quantity, account_balance
// entity(shipper) -> name(GHI Shippers), inventory_quantity, account_balance
// -------------------------------------------------------------------------- BUSINESS PROCESSES --------------------------------------------------------------------------
export interface BusinessProcess {
  /**
   *
   * @type {string}
   * @memberof BusinessProcess
   */
  entity: string;
  /**
   *
   * @type {BusinessFunction[]}
   * @memberof BusinessProcess
   */
  functionFlow: BusinessFunction[];
}
// POC instances:
// entity(product sale) -> function_flow(list of business functions according to EA model)
// -------------------------------------------------------------------------- BUSINESS FUNCTIONS --------------------------------------------------------------------------
export interface BusinessFunction {
  /**
   *
   * @type {string}
   * @memberof BusinessFunction
   */
  entity: string;
  /**
   *
   * @type {string}
   * @memberof BusinessFunction
   */
  object: string;
  /**
   *
   * @type {string}
   * @memberof BusinessFunction
   */
  triggeredBy: string;
}
// POC instances:
// entity(supply) -> object(bamboo), triggeredBy(harvester)
// entity(manufacture) -> object(bookshelf), triggeredBy(manufacturer)
// entity(ship) -> object(shipment), triggeredBy(shipper)
