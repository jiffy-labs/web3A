import { type Address } from "viem";
import { type UserOperation } from "../types";

export abstract class Paymaster {
  abstract sponsorUserOperation(args: {
    userOperation: UserOperation;
    entryPoint: Address;
  }): Promise<UserOperation>;
}

