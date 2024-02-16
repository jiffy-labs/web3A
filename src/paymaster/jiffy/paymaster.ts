import { UserOperation } from "permissionless";
import { Paymaster } from "../paymaster";
import { Address } from "viem";

export class JiffyPaymaster extends Paymaster {
    paymasterUrl: string;
    chainId: number;
    constructor(paymasterUrl: string, chainId: number) {
        super();
        this.paymasterUrl = paymasterUrl;
        this.chainId = chainId;
    }

    sponsorUserOperation = async (args: { userOperation: UserOperation, entryPoint: Address }): Promise<UserOperation> => {
        const { userOperation, entryPoint } = args;
        let modifiedUserOperation = userOperation;
        const paymasterRes = await fetch(`${this.paymasterUrl}/${this.chainId}/sponsorUserOperation?` + new URLSearchParams({
            userOperation: JSON.stringify(modifiedUserOperation, (key, value) => (typeof value === 'bigint' ? value.toString() : value)),
            entryPoint: entryPoint
        }));
        const paymasterResJson = await paymasterRes.json() as { paymasterAndData: `0x${string}`, callGasLimit: string, preVerificationGas: string, verificationGasLimit: string };
        if (paymasterResJson?.callGasLimit) {
            modifiedUserOperation = {
                ...modifiedUserOperation,
                callGasLimit: BigInt(paymasterResJson.callGasLimit),
                preVerificationGas: BigInt(paymasterResJson.preVerificationGas),
                verificationGasLimit: BigInt(paymasterResJson.verificationGasLimit),
                paymasterAndData: paymasterResJson && paymasterResJson.paymasterAndData ? paymasterResJson.paymasterAndData : "0x",
            }
        }
        return modifiedUserOperation;

    }
}