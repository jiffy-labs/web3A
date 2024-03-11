import { Address } from "viem";
import { UserOperation } from "../types";

export abstract class Paymaster {
    abstract sponsorUserOperation(args: { userOperation: UserOperation, entryPoint: Address }): Promise<UserOperation>;
}