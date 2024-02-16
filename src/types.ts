import type {
    Address,
    Hex,
} from "viem"

export type TransactionStatus = "success" | "reverted";

export type UserOperationHexed = {
    sender: Address
    nonce: Hex
    initCode: Hex
    callData: Hex
    callGasLimit: Hex
    verificationGasLimit: Hex
    preVerificationGas: Hex
    maxFeePerGas: Hex
    maxPriorityFeePerGas: Hex
    paymasterAndData: Hex
    signature: Hex
}

export type UserOperation = {
    sender: Address
    nonce: bigint
    initCode: Hex
    callData: Hex
    callGasLimit: bigint
    verificationGasLimit: bigint
    preVerificationGas: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    paymasterAndData: Hex
    signature: Hex
}

export type RPCResponse = Promise<{
    result: any;
} | undefined>
