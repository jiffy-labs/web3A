import { ENTRYPOINT_ADDRESS_V06, ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { defineChain } from "viem";
import { type Chain, lineaTestnet, polygonMumbai, sepolia } from "viem/chains";

export enum Network {
  SEPOLIA,
  VANAR_TESTNET,
  VANAR_MAINNET,
  MOVE_TESTNET,
  EDU_TESTNET
}

export const vanarTestnet = defineChain({
  id: 78600,
  name: "Vanar Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "VANRY",
    symbol: "VANRY",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-vanguard.vanarchain.com/"],
      webSocket: ["wss://ws-vanguard.vanarchain.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer-vanguard.vanarchain.com",
    },
  },
});

export const vanarMainnet = defineChain({
  id: 2040,
  name: "VANAR_MAINNET",
  nativeCurrency: {
    decimals: 18,
    name: "VANRY",
    symbol: "VANRY",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.vanarchain.com"],
      webSocket: ["wss://ws.vanarchain.com"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.vanarchain.com" },
  },
});

export const moveTest = defineChain({
  id: 30732,
  name: "MOVE_TESTNET",
  nativeCurrency: {
    decimals: 18,
    name: "MOVE",
    symbol: "MOVE",
  },
  rpcUrls: {
    default: {
      http: ["https://mevm.devnet.imola.movementlabs.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.devnet.imola.movementlabs.xyz",
    },
  },
});

export const eduTestChain = defineChain({
  id: 656476,
  name: "OPEN_CAMPUS_TEST",
  nativeCurrency: {
    decimals: 18,
    name: "EDU",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://opencampus-codex.blockscout.com/" },
  },
})

export const NetworkChainMap: Record<Network, Chain> = {
  [Network.SEPOLIA]: sepolia,
  [Network.VANAR_TESTNET]: vanarTestnet,
  [Network.VANAR_MAINNET]: vanarMainnet,
  [Network.MOVE_TESTNET]: moveTest,
  [Network.EDU_TESTNET]: eduTestChain,
};

export enum ADDRESS_TYPES {
  SIMPLE_ACCOUNT,
}

interface FactoryAddresses {
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789": `0x${string}`;
  "0x0000000071727De22E5E9d8BAf0edAc6f37da032": `0x${string}`;
}

export const SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP: Record<
  Network,
  FactoryAddresses
> = {
  [Network.VANAR_TESTNET]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789":
      "0xeD08Bfd2478C9616f2E2F51F4f6b28D3EE16F99B",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032":
      "0x41f9E11556e0119E452dF67B2311EC46071ad6c7",
  },
  [Network.VANAR_MAINNET]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789":
      "0xD02a5F77C53A3520b92677eFcfeDa69aC123EbCe",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032":
      "0x0baDC4D69Ac9e13786C8fC30eB543C3472Fd77EA",
  },
  [Network.SEPOLIA]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789":
      "0x9fd25AC3Ac6dfb00C4d11FA32E8454525bF4cFD0",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032":
      "0xe0e7da3f07745fa3c3b3c3d41db9ea8d7c514633",
  },
  [Network.MOVE_TESTNET]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789":
      "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032":
      "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985",
  },
  [Network.EDU_TESTNET]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789":
      "0x468d7d0D7f9B651517153FAe7B4a364B535C963c",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032":
      "0xAe935f0dd79eAf68d516E7aBBa88a58eE69313a1",
  },
};

export const SIMPLE_ACCOUNT_FACTORY_V7_ADDRESS_MAP = {
  [Network.VANAR_TESTNET]: "0x41f9E11556e0119E452dF67B2311EC46071ad6c7",
};

export const ADDRESS_FACTORY_MAP = {
  [ADDRESS_TYPES.SIMPLE_ACCOUNT]: SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP,
};

export type ENTRY_POINT =
  | "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  | "0x0000000071727De22E5E9d8BAf0edAc6f37da032";

export const PUBLIC_RPC = {
  [Network.VANAR_TESTNET]: "https://rpca-vanguard.vanarchain.com/",
};

export const PUBLIC_RPC_MAP = {
  [Network.SEPOLIA]: "https://rpc.ankr.com/eth_sepolia",
};

export const PUBLIC_BUNDLER_MAP = {
  [Network.SEPOLIA]: "https://public.stackup.sh/api/v1/node/ethereum-sepolia",
};

export const JIFFY_END_POINT = "https://api-dev.jiffyscan.xyz/web3a/getUrl";
