import { parseEther } from "viem";
import {
  getAccountClientFromPrivateKeyV6,
  getPublicClient,
} from "@jiffy-labs/web3a";
import { Network } from "@jiffy-labs/web3a";
import "dotenv/config";
import { getRequiredPrefund } from "permissionless";

const publicClient = await getPublicClient(Network.VANAR_TESTNET);
const privateKey = process.env.PVT_KEY as `0x${string}`;
const bundlerUrl = process.env.BUNDLER_URL as string;
const paymasterUrl = process.env.PAYMASTER_URL as string;
const network = Network.VANAR_TESTNET;
const JIFFYSCAN_API_KEY = process.env.JIFFYSCAN_API_KEY as string;

const accountClient = await getAccountClientFromPrivateKeyV6({
  privateKey: privateKey,
  network: network,
  bundler: {
    url: bundlerUrl,
    header: { "x-api-key": JIFFYSCAN_API_KEY },
  },
  index: 0n,
  paymaster: {
    sponsoredBy: "None", // "None" | "Jiffy" , if "Jiffy" is selected, paymasterUrl must be provided
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

if (paymasterUrl || balance > parseEther("0.04")) {
  // @ts-ignore
  const tx = await accountClient.sendTransaction({
    to: "0x8D582d98980248F1F0849710bd0626aDE4c44E3D",
    value: 100_000_000n,
    maxFeePerGas: 1_000_000_000n,
    maxPriorityFeePerGas: 1_000_000_000n,
  });

  console.log("txHash: ", tx);
} else {
  console.log("account does not have enough balance");
}
