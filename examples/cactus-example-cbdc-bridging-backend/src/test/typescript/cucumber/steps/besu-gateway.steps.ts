import { Given, When, Then, Before, After } from "cucumber";
import { expect } from "chai";
import axios from "axios";
import CryptoMaterial from "../../../../crypto-material/crypto-material.json";
import {
  getBesuBalance,
  isBesuAssetReference,
  lockBesuAssetReference,
  resetBesu,
} from "../besu-helper";
import AssetReferenceContractJson from "../../../../solidity/asset-reference-contract/AssetReferenceContract.json";
import CBDCcontractJson from "../../../../solidity/cbdc-erc-20/CBDCcontract.json";
import { getEthAddress, getPrvKey } from "./common";

const BESU_CONTRACT_CBDC_ERC20_NAME = CBDCcontractJson.contractName;
const BESU_CONTRACT_ASSET_REF_NAME = AssetReferenceContractJson.contractName;

Before({ timeout: 20 * 1000, tags: "@besu" }, async function () {
  await resetBesu();
});

After({ timeout: 20 * 1000, tags: "@besu" }, async function () {
  await resetBesu();
});

Given(
  "{string} with {int} CBDC available in the sidechain smart contract",
  async function (user: string, amount: number) {
    await axios.post(
      "http://localhost:4100/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-besu/invoke-contract",
      {
        contractName: BESU_CONTRACT_ASSET_REF_NAME,
        invocationType: "SEND",
        methodName: "mint",
        gas: 1000000,
        params: [getEthAddress(user), amount],
        signingCredential: {
          ethAccount: getEthAddress(user),
          secret: getPrvKey("bob"),
          type: "PRIVATE_KEY_HEX",
        },
        keychainId: CryptoMaterial.keychains.keychain2.id,
      },
    );
  },
);

When(
  "{string} escrows {int} CBDC and creates an asset reference with id {string} in the sidechain",
  async function (user: string, amount: number, assetRefID: string) {
    await axios.post(
      "http://localhost:4100/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-besu/invoke-contract",
      {
        contractName: BESU_CONTRACT_CBDC_ERC20_NAME,
        invocationType: "SEND",
        methodName: "escrow",
        gas: 1000000,
        params: [amount, assetRefID],
        signingCredential: {
          ethAccount: getEthAddress(user),
          secret: getPrvKey(user),
          type: "PRIVATE_KEY_HEX",
        },
        keychainId: CryptoMaterial.keychains.keychain2.id,
      },
    );
  },
);

When(
  "bob locks the asset reference with id {string} in the sidechain",
  async function (assetRefID: string) {
    await lockBesuAssetReference(
      getEthAddress("bob"),
      getPrvKey("bob"),
      assetRefID,
    );
  },
);

When(
  "bob deletes the asset reference with id {string} in the sidechain",
  async function (assetRefID: string) {
    await axios.post(
      "http://localhost:4100/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-besu/invoke-contract",
      {
        contractName: BESU_CONTRACT_ASSET_REF_NAME,
        invocationType: "SEND",
        methodName: "deleteAssetReference",
        gas: 1000000,
        params: [assetRefID],
        signingCredential: {
          ethAccount: getEthAddress("bob"),
          secret: getPrvKey("bob"),
          type: "PRIVATE_KEY_HEX",
        },
        keychainId: CryptoMaterial.keychains.keychain2.id,
      },
    );
  },
);

Then(
  "the asset reference smart contract has an asset reference with id {string}",
  async function (assetRefID: string) {
    expect(await isBesuAssetReference(assetRefID)).to.be.true;
  },
);

Then(
  "the asset reference smart contract has no asset reference with id {string}",
  async function (assetRefID: string) {
    expect(await isBesuAssetReference(assetRefID)).to.be.false;
  },
);

Then("{string} has {int} CBDC available in the sidechain", async function (
  user: string,
  amount: number,
) {
  expect(await getBesuBalance(getEthAddress(user))).to.equal(amount);
});

Then(
  "the asset reference with id {string} is locked in the sidechain",
  async function (assetRefID: string) {
    const response = await axios.post(
      "http://localhost:4100/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-besu/invoke-contract",
      {
        contractName: BESU_CONTRACT_ASSET_REF_NAME,
        invocationType: "CALL",
        methodName: "isAssetLocked",
        gas: 1000000,
        params: [assetRefID],
        signingCredential: {
          ethAccount: getEthAddress("alice"),
          secret: getPrvKey("alice"),
          type: "PRIVATE_KEY_HEX",
        },
        keychainId: CryptoMaterial.keychains.keychain2.id,
      },
    );

    expect(response.data.callOutput).to.equal(true);
  },
);

Then(
  "{string} fails to lock the asset reference with id {string} in the sidechain",
  async function (user: string, assetRefID: string) {
    await lockBesuAssetReference(
      getEthAddress(user),
      getPrvKey(user),
      assetRefID,
    ).catch((err) => {
      expect(err.response.data.error).to.contain(
        `Transaction has been reverted by the EVM`,
      );
    });
  },
);
