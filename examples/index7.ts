import { createWalletClient, formatEther, parseEther } from "viem";
import {
  getAccountClientFromPrivateKeyV7,
  getPublicClient,
} from "../dist";
import { Network } from "../dist";
import "dotenv/config";

const network = Network.VANAR_TESTNET;
const publicClient = await getPublicClient(network);
const privateKey = process.env.PVT_KEY as `0x${string}`;
const bundlerUrl = process.env.BUNDLER_URL as string;
const paymasterUrl = process.env.PAYMASTER_URL as string;
const JIFFYSCAN_API_KEY = process.env.JIFFYSCAN_API_KEY as string;

const accountClient = await getAccountClientFromPrivateKeyV7({
  privateKey: privateKey,
  network: network,
  bundler: {
    url: bundlerUrl,
    header: { "x-api-key": JIFFYSCAN_API_KEY },
  },
  index: 0n,
  paymaster: {
    sponsoredBy: "Jiffy", // "None" | "Jiffy" , if "Jiffy" is selected, paymasterUrl must be provided
    url: paymasterUrl,
    header: { "x-api-key": JIFFYSCAN_API_KEY },
  },
});

const address = accountClient.account?.address;
console.log("account address: ", address);

// note: paymaster is not enabled , please deposit vanar to the account before running the rest of the script

const balance = await publicClient.getBalance({
  address: address as `0x${string}`,
});

console.log("balance - ", parseInt(balance.toString()) / 1000000000000000000);

if (paymasterUrl || balance > parseEther("0.04")) {
  // @ts-ignore
  const tx = await accountClient.sendTransaction({
    to: "0x8D582d98980248F1F0849710bd0626aDE4c44E3D",
    value: 100n,
    maxFeePerGas: 1000000000n,
    maxPriorityFeePerGas: 1000000000n,
  });

  console.log("txHash: ", tx);
} else {
  console.log("account does not have enough balance");
}
