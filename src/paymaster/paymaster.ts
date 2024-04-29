import type { UserOperation } from "permissionless";
import { type Address } from "viem";

export abstract class Paymaster {
  abstract sponsorUserOperationV6(args: {
    userOperation: UserOperation<"v0.6">;
    entryPoint: Address;
  }): Promise<UserOperation<"v0.6">>;

  abstract sponsorUserOperationV7(args: {
    userOperation: UserOperation<"v0.7">;
    entryPoint: Address;
  }): Promise<UserOperation<"v0.7">>;
}

