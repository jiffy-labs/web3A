export type sendTransactionRequest = {
    to: `0x${string}`,
    value: bigint,
    data: `0x${string}`
}

export type sendTransactionResponse = Promise<{ result: any; } | undefined>

