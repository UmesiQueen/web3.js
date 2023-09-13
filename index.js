import Web3 from "web3";
import config from "./config.js";

// Configuring the connection to an Ethereum node
const rpcURL = `https://mainnet.infura.io/v3/${config.infuraPrivateKey}`;

const web3 = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(rpcURL)
);

// Retrieving Balance
const address = "0x40B38765696e3d5d8d9d834D8AaD4bB6e418E489";

await web3.eth.getBalance(address).then((wei, err) => {
  if (!err) {
    const balanceInEther = web3.utils.fromWei(wei, "ether"); // convert wei(default) to ether
    console.log("Balance in Ether:", balanceInEther);
  } else {
    console.error("Error:", err);
  }
});

// Create an account
web3.eth.accounts.create();
// >  {
//     address: '0x8bfE2e2706eBDe4922D33f0979F15D391bd4f8AE',
//     privateKey: '0x5814fe78dd16d5d2f05e4eb217c30dfa7203cb268eaa064b2ed5266e0092f50e',
//     signTransaction: [Function: signTransaction],
//     sign: [Function: sign],
//     encrypt: [Function: encrypt]
//   }


