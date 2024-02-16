import { InvalidHexValueError, PublicClient, createPublicClient, http } from "viem";
import { ADDRESS_FACTORY_MAP, ADDRESS_TYPES, ENTRY_POINT_MAP, Network, NetworkChainMap, SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP } from "../../common/constants";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";

export const publicClient: PublicClient = createPublicClient({
    transport: http("https://rpca-vanguard.vanarchain.com/"),
});

export type AccountClientOptions = {
    version?: "v0.6";
    network: Network;
    privateKey: `0x${string}`;
    factoryType?: ADDRESS_TYPES;
    index?: bigint;
    sponsoredBy: "None" | "Jiffy";
};

export const getAccountClientFromPrivateKey = async ({ privateKey, network, index = 0n, version = 'v0.6', factoryType = ADDRESS_TYPES.SIMPLE_ACCOUNT, sponsoredBy = "None" }: AccountClientOptions) => {
    const publicClient = await createPublicClient({
        chain: NetworkChainMap[network],
        transport: http("https://rpca-vanguard.vanarchain.com/"),
    });

    const account = await privateKeyToSimpleSmartAccount(publicClient, {
        privateKey: privateKey as `0x${string}`,
        factoryAddress: ADDRESS_FACTORY_MAP[factoryType][network] as `0x${string}`,
        entryPoint: ENTRY_POINT_MAP[network][version], // global entrypoint
        index: index || 0n,
    });

    return account;
}