import { UserOperation } from "../types";

export abstract class Paymaster {
    abstract sponsorUserOperation(userOperation: UserOperation): Promise<UserOperation>;
}