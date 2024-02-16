import { parseEther } from 'viem';
import { getAccountClientFromPrivateKey, getPublicClient } from '../src/accounts/simpleAccount/index.ts';
import { Network } from '../src/common/constants.ts';
import "dotenv/config";

const publicClient = await getPublicClient(Network.VANAR_TESTNET);
const privateKey = process.env.PVT_KEY as `0x${string}`;
const bundlerUrl = process.env.BUNDLER_URL as string;
const network = Network.VANAR_TESTNET;


const accountClient = await getAccountClientFromPrivateKey({
    privateKey: privateKey,
    network: network,
    bundlerUrl: bundlerUrl,
    index: 0n,
})

const address = accountClient.account?.address;
console.log('account address: ', address);

// note: paymaster is not enabled , please deposit vanar to the account before running the rest of the script

const balance = await publicClient.getBalance({
    address: address as `0x${string}`
})

if (balance > parseEther("0.05")) {
    // @ts-ignore
    const tx = await accountClient.sendTransaction({
        to: "0x9fd25AC3Ac6dfb00C4d11FA32E8454525bF4cFD0",
        value: parseEther("0.0001"),
        maxFeePerGas: 1000000000n,
        maxPriorityFeePerGas: 1000000000n,
    });

    console.log('txHash: ', tx);
} else {
    console.log('account does not have enough balance');
}

