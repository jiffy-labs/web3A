import { type UserOperation } from "permissionless";
import { Paymaster } from "../paymaster";
import { type Address } from "viem";
import type { EntryPointVersion } from "permissionless/types";

export class JiffyPaymaster extends Paymaster {
  paymasterUrl: string;
  chainId: number;
  headers: Record<string, string> = {};
  constructor(
    paymasterUrl: string,
    chainId: number,
    headers: Record<string, string> = {}
  ) {
    super();
    this.paymasterUrl = paymasterUrl;
    this.chainId = chainId;
    this.headers = headers;
  }

  sponsorUserOperation = async (args: {

    userOperation: UserOperation<"v0.6">;
    entryPoint: Address;
  }): Promise<UserOperation<"v0.6">> => {
    const { userOperation, entryPoint } = args;
    let modifiedUserOperation = userOperation;
    let paymasterRes = null;
    const options = {
      headers: {
        "x-api-key": this.headers?.["x-api-key"] ? this.headers["x-api"] : "",
      },
    };

    paymasterRes = await fetch(
      `${this.paymasterUrl}/${this.chainId}/sponsorUserOperation?` +
      new URLSearchParams({
        userOperation: JSON.stringify(modifiedUserOperation, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        ),
        entryPoint: entryPoint,
      }), // @ts-expect-error: Argument of type
      options
    );

    const paymasterResJson = (await paymasterRes.json()) as {
      paymasterAndData: `0x${string}`;
      callGasLimit: string;
      preVerificationGas: string;
      verificationGasLimit: string;
    };
    if (paymasterResJson?.callGasLimit) {
      modifiedUserOperation = {
        ...modifiedUserOperation,
        callGasLimit: BigInt(paymasterResJson.callGasLimit),
        preVerificationGas: BigInt(paymasterResJson.preVerificationGas),
        verificationGasLimit: BigInt(paymasterResJson.verificationGasLimit),
        paymasterAndData:
          paymasterResJson && paymasterResJson.paymasterAndData
            ? paymasterResJson.paymasterAndData
            : "0x",
      };
    }
    return modifiedUserOperation;
  };
}

