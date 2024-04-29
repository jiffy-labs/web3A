import { type PublicClient, createPublicClient, http } from "viem";
import {
  ADDRESS_FACTORY_MAP,
  ADDRESS_TYPES,
  Network,
  NetworkChainMap,
  PUBLIC_RPC,
  SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP,
  vanarTestnet,
  type ENTRY_POINT,
} from "../../common/constants";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import {
  type SmartAccountClient,
  createSmartAccountClient,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless";
import { createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { JiffyPaymaster } from "../../paymaster/jiffy/paymaster";
import {
  type ENTRYPOINT_ADDRESS_V07_TYPE,
  type ENTRYPOINT_ADDRESS_V06_TYPE,
} from "permissionless/types";

export const publicClient: PublicClient = createPublicClient({
  transport: http("https://rpca-vanguard.vanarchain.com/"),
});
export type Bundler = {
  url: string;
  header?: Record<string, string>;
};
export type Paymaster = {
  sponsoredBy: "None" | "Jiffy";
  url: string;
  header?: Record<string, string>;
};

export type AccountClientOptions = {
  network: Network;
  privateKey: `0x${string}`;
  factoryType?: ADDRESS_TYPES;
  index?: bigint;
  bundler: Bundler;
  paymaster: Paymaster;
};

export const getAccountClientFromPrivateKeyV7 = async ({
  privateKey,
  network,
  index = 0n,
  bundler,
  paymaster,
}: AccountClientOptions): Promise<
  SmartAccountClient<"0x0000000071727De22E5E9d8BAf0edAc6f37da032">
> => {
  if (paymaster.sponsoredBy == "Jiffy" && !paymaster.url) {
    throw new Error("paymasterUrl is required if sponsoredBy is Jiffy");
  }

  const publicClient = createPublicClient({
    chain: NetworkChainMap[network],
    transport: http(NetworkChainMap[network].rpcUrls.default.http[0]),
  });

  const account = await privateKeyToSimpleSmartAccount(publicClient, {
    privateKey: privateKey as `0x${string}`,
    factoryAddress:
      SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP[network][
      "0x0000000071727De22E5E9d8BAf0edAc6f37da032"
      ],
    entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    index: index || 0n,
  });

  const paymasterClient =
    paymaster.url && paymaster.sponsoredBy == "Jiffy"
      ? new JiffyPaymaster(
        paymaster.url,
        publicClient?.chain.id,
        paymaster.header
      )
      : undefined;

  const smartAccClient = createSmartAccountClient({
    account: account,
    chain: NetworkChainMap[network],
    entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    bundlerTransport: http(bundler.url, {
      fetchOptions: {
        headers: bundler.header,
      },
    }),
    middleware: {
      sponsorUserOperation: paymasterClient
        ? paymasterClient.sponsorUserOperationV7
        : undefined,
    }
  });
  return smartAccClient;
};

export const getAccountClientFromPrivateKeyV6 = async ({
  privateKey,
  network,
  index = 0n,
  bundler,
  paymaster,
}: AccountClientOptions): Promise<
  SmartAccountClient<"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789">
> => {
  if (paymaster.sponsoredBy == "Jiffy" && !paymaster.url) {
    throw new Error("paymasterUrl is required if sponsoredBy is Jiffy");
  }

  const publicClient = createPublicClient({
    chain: NetworkChainMap[network],
    transport: http(NetworkChainMap[network].rpcUrls.default.http[0]),
  });

  const account = await privateKeyToSimpleSmartAccount(publicClient, {
    privateKey: privateKey as `0x${string}`,
    factoryAddress:
      SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP[Network.VANAR_TESTNET][
      "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
      ],
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    index: index || 0n,
  });

  const paymasterClient =
    paymaster.url && paymaster.sponsoredBy == "Jiffy"
      ? new JiffyPaymaster(
        paymaster.url,
        publicClient?.chain.id,
        paymaster.header
      )
      : undefined;

  const smartAccClient = createSmartAccountClient({
    account: account,
    chain: NetworkChainMap[network],
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    bundlerTransport: http(bundler.url, {
      fetchOptions: {
        headers: bundler.header,
      },
    }),
    middleware: {
      sponsorUserOperation: paymasterClient
        ? paymasterClient.sponsorUserOperationV6
        : undefined,
    }
  });
  return smartAccClient;
};

export const getPublicClient = (network: Network): PublicClient => {
  return createPublicClient({
    chain: NetworkChainMap[network],
    transport: http(NetworkChainMap[network].rpcUrls.default.http[0]),
  });
};
