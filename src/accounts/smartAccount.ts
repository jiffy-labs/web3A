import { PublicClient } from "viem";
import { BundlerClient } from "permissionless";
import { sendTransactionRequest, sendTransactionResponse } from "./types";
import { RPCResponse, UserOperation } from "../types";

export abstract class SmartAccount {
    abstract address: `0x${string}` | null;
    abstract client: PublicClient;
    abstract bundlerClient: BundlerClient;

    abstract isDeployed(): Promise<boolean>;

    abstract deploy(): RPCResponse;

    abstract getEntryPoint(): Promise<`0x${string}`>;

    abstract sendTransaction({ to, value, data }: sendTransactionRequest): sendTransactionResponse;

    abstract getInitCode(): Promise<`0x${string}`>;

    abstract prepareUserOperation({ to, value, data }: sendTransactionRequest): Promise<UserOperation>;

    abstract sendUserOperation(userOperation: UserOperation): RPCResponse;

    abstract getDummySignature(): Promise<`0x${string}`>;
}