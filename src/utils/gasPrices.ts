import { type PublicClient } from "viem";

export const getGasPrices = async (client: PublicClient) => {
  let gasPrices = await client.getGasPrice();

  gasPrices = gasPrices * 2n;
  let maxPriorityFeePerGas =
    2_000_000_000n > gasPrices ? gasPrices : 2_000_000_000n;

  return {
    maxFeePerGas: gasPrices,
    maxPriorityFeePerGas,
  };
};

