import { createWalletClient, http, parseEther } from 'viem';
import { getAccountClientFromPrivateKey, getPublicClient } from '../src/accounts/simpleAccount/index.ts';
import { Network, NetworkChainMap } from '../src/common/constants.ts';
import "dotenv/config";
import { getRequiredPrefund } from 'permissionless';
import { privateKeyToAccount } from 'viem/accounts';

const publicClient = await getPublicClient(Network.VANAR_TESTNET);
const privateKey = process.env.PVT_KEY as `0x${string}`;
const bundlerUrl = process.env.BUNDLER_URL as string;
const paymasterUrl = process.env.PAYMASTER_URL as string;
const network = Network.VANAR_TESTNET;


const accountClient = await getAccountClientFromPrivateKey({
    privateKey: privateKey,
    network: network,
    bundlerUrl: bundlerUrl,
    index: 0n,
    sponsoredBy: "None", // "None" | "Jiffy" , if "Jiffy" is selected, paymasterUrl must be provided
    paymasterUrl: paymasterUrl, // required if sponsoredBy is "Jiffy"
})

const address = accountClient.account?.address;
console.log('account address: ', address);

// note: paymaster is not enabled , please deposit vanar to the account before running the rest of the script

// const balance = await publicClient.getBalance({
//     address: address as `0x${string}`
// })

// if (paymasterUrl || balance > parseEther("0.04")) {
//     // @ts-ignore
//     const tx = await accountClient.sendTransaction({
//         to: "0x8D582d98980248F1F0849710bd0626aDE4c44E3D",
//         value: 0n,
//         maxFeePerGas: 1_000_000_000n,
//         maxPriorityFeePerGas: 1_000_000_000n,
//     });

//     // @ts-ignore
//     // const tx = await accountClient.({
//     //     to: "0x8D582d98980248F1F0849710bd0626aDE4c44E3D",
//     //     value: 0n,
//     //     maxFeePerGas: 10_000_000_000n,
//     //     maxPriorityFeePerGas: 10_000_000_000n,
//     // })

//     // const requiredPrefund = getRequiredPrefund({ userOperation: { "sender": "0x6E9fEEa8a95990A544924b56F16d5309F2811507", "nonce": 95n, "initCode": "0x", "callData": "0xb61d27f60000000000000000000000008d582d98980248f1f0849710bd0626ade4c44e3d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000", "paymasterAndData": "0x79aC7538aAd55e4cc5003cdA6669eB596493cc25", "signature": "0x0452537b36e50a5d42765db7cd7c3ec16455d6deb71689d617422795f0e0523c63cf4e20ea605249c684c6e6200f1207d19446cd1ea9d01a65c3846864f660dd1c", "maxFeePerGas": 10000000000n, "maxPriorityFeePerGas": 10000000000n, "callGasLimit": 75811n, "verificationGasLimit": 98658n, "preVerificationGas": 45244n } });
//     // console.log(requiredPrefund);
//     console.log('txHash: ', tx);
// } else {
//     console.log('account does not have enough balance');
// }


const account = privateKeyToAccount(privateKey);

const walletClient = createWalletClient({
    account: account,
    chain: NetworkChainMap[Network.VANAR_TESTNET],
    transport: http('https://rpc-vanguard.vanarchain.com/'),
})

console.log(await walletClient.sendTransaction({
    to: '0x8D582d98980248F1F0849710bd0626aDE4c44E3D',
    value: parseEther('0')
}).then((tx) => {
    console.log('tx: ', tx);
}));

console.log(await walletClient.prepareTransactionRequest({
    to: '0x8D582d98980248F1F0849710bd0626aDE4c44E3D',
    value: parseEther('0')
}).then((tx) => {
    console.log('tx: ', tx);
}));

await publicClient.getGasPrice().then((gasPrice) => {
    console.log('gasPrice: ', gasPrice);
});

await publicClient.estimateGas({
    account: walletClient.account?.address as `0x${string}`,
    to: '0x8D582d98980248F1F0849710bd0626aDE4c44E3D',
    value: parseEther('0')
}).then((gas) => {
    console.log('gas: ', gas);
});


// console.log(await publicClient.estimateGas({
//     account: walletClient.account?.address as `0x${string}`,
//     to: '0x8D582d98980248F1F0849710bd0626aDE4c44E3D',
//     value: parseEther('0')
// }).then((gas) => {
//     console.log('gas: ', gas);
// }));