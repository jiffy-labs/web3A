import type { BundlerClient } from "permissionless";
import { createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { Network, NetworkChainMap, type ENTRY_POINT } from "../common/constants";
import { http, type Chain, type Transport } from "viem";
import type { EntryPoint } from "permissionless/types";


export type BundlerParams = {
    url: string;
};

export type BundlerClientOptions = {
    bundler: BundlerParams;
    entryPoint: ENTRY_POINT;
    network: Network;
};

// @ts-ignore
export const getBundlerClient = ({ bundler, entryPoint, network }: BundlerClientOptions): BundlerClient => {
    const bundlerClient = createPimlicoBundlerClient({
        transport: http(bundler.url) as Transport,
        chain: NetworkChainMap[network] as Chain,
        entryPoint: entryPoint as EntryPoint,
    });
    return bundlerClient;
}