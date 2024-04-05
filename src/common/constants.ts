import { defineChain } from "viem";
import { type Chain, lineaTestnet, polygonMumbai, sepolia } from "viem/chains";

export enum Network {
  SEPOLIA,
  VANAR_TESTNET,
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

export const NetworkChainMap: Record<Network, Chain> = {
  [Network.SEPOLIA]: sepolia,
  [Network.VANAR_TESTNET]: vanarTestnet,
};

export enum ADDRESS_TYPES {
  SIMPLE_ACCOUNT,
}

export const SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP = {
  [Network.VANAR_TESTNET]: "0xeD08Bfd2478C9616f2E2F51F4f6b28D3EE16F99B",
  [Network.SEPOLIA]: "0x9fd25AC3Ac6dfb00C4d11FA32E8454525bF4cFD0",
};

export const ADDRESS_FACTORY_MAP = {
  [ADDRESS_TYPES.SIMPLE_ACCOUNT]: SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP,
};

export const PUBLIC_RPC = {
  [Network.VANAR_TESTNET]: "https://rpca-vanguard.vanarchain.com/",
};

export const ENTRY_POINT_MAP = {
  [Network.VANAR_TESTNET]: {
    "v0.6": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as `0x${string}`,
  },
  [Network.SEPOLIA]: {
    "v0.6": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as `0x${string}`,
  },
};

export const PUBLIC_RPC_MAP = {
  [Network.SEPOLIA]: "https://rpc.ankr.com/eth_sepolia",
};

export const PUBLIC_BUNDLER_MAP = {
  [Network.SEPOLIA]: "https://public.stackup.sh/api/v1/node/ethereum-sepolia",
};

export const JIFFY_END_POINT = "https://api-dev.jiffyscan.xyz/web3a/getUrl";
