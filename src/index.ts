import { parseEther } from 'viem';
import { getAccountClientFromPrivateKey, getPublicClient } from './accounts/simpleAccount/index.ts';
import { Network } from './common/constants.ts';
import "dotenv/config";

const publicClient = await getPublicClient(Network.VANAR_TESTNET);
const privateKey = process.env.PVT_KEY as `0x${string}`;
const bundlerUrl = "https://vanar-testnet.jiffyscan.xyz/";

const accountClient = await getAccountClientFromPrivateKey({
    privateKey: process.env.PVT_KEY as `0x${string}`,
    network: Network.VANAR_TESTNET,
    sponsoredBy: "None",
    bundlerUrl: bundlerUrl
})


console.log('account address: ', accountClient.account?.address);

// note: paymaster is not enabled , please deposit vanar to the account before running the rest of the script

// @ts-ignore
const tx = await accountClient.sendTransaction({

    to: "0x9fd25AC3Ac6dfb00C4d11FA32E8454525bF4cFD0",
    value: parseEther("0.0001"),
    maxFeePerGas: 1000000000n,
    maxPriorityFeePerGas: 1000000000n,

});

console.log('txHash: ', tx);
console.log(`explorer link:  https://explorer-vanguard.vanarchain.com/tx/${tx}`);

