import Web3 from "web3";
import config from "./config.js";

// Configuring the connection to an Ethereum node
const rpcURL = `https://mainnet.infura.io/v3/${config.infuraPrivateKey}`;

var web3 = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(rpcURL)
);

// ``` Retrieving Balance ```
function getBalance(web3) {
  const address = "0x40B38765696e3d5d8d9d834D8AaD4bB6e418E489";

  web3.eth.getBalance(address).then((wei, err) => {
    if (!err) {
      const balanceInEther = web3.utils.fromWei(wei, "ether"); // convert wei(default) to ether
      console.log("Balance in Ether:", balanceInEther);
    } else {
      console.error("Error:", err);
    }
  });
}
// getBalance(web3);

// ``` Create an account ```
function createAccount(web3) {
  web3.eth.accounts.create();

  // >  {
  //     address: '0x8bfE2e2706eBDe4922D33f0979F15D391bd4f8AE',
  //     privateKey: '0x5814fe78dd16d5d2f05e4eb217c30dfa7203cb268eaa064b2ed5266e0092f50e',
  //     signTransaction: [Function: signTransaction],
  //     sign: [Function: sign],
  //     encrypt: [Function: encrypt]
  //   }}
}
// createAccount(web3);

// ``` Read Data from Smart Contracts (BNB) ```
const contractAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "withdrawEther",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "burn",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "unfreeze",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "freezeOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "freeze",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    inputs: [
      { name: "initialSupply", type: "uint256" },
      { name: "tokenName", type: "string" },
      { name: "decimalUnits", type: "uint8" },
      { name: "tokenSymbol", type: "string" },
    ],
    payable: false,
    type: "constructor",
  },
  { payable: true, type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Freeze",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Unfreeze",
    type: "event",
  },
];

const contract = new web3.eth.Contract(contractABI, contractAddress);
// console.log(contract.methods)

function contractMethods(contract) {
  contract.methods
    .name()
    .call()
    .then((res) => {
      console.log("Contract Name:", res);
    });

  contract.methods
    .totalSupply()
    .call()
    .then((res) => {
      console.log("Total Supply:", res);
    });

  const holderAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

  contract.methods
    .balanceOf(holderAddress)
    .call()
    .then((res) => {
      console.log("Balance:", web3.utils.fromWei(res, "ether"));
    });
}
// contractMethods(contract);

// ``` Making Ethereum Transactions ```

// `` Using Ganache
function sendTransactionGanache() {
  var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

  var address1 = "0xEd68Bc527a7832222f676f31c5f77351f663b519";
  var address2 = "0x967aEdb1227E3068CF953DdD91664d82a3968997";

  web3.eth
    .sendTransaction({
      from: address1,
      to: address2,
      value: web3.utils.toWei("1", "ether"),
    })
    .then(console.log("Sent"));
}
// sendTransactionGanache();

// `` Using Infura
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${config.infuraPrivateKey}`
  )
);

var address1 = "0xe8F55dacD2E18b6d72d167bd7619307493d626Fe";
var address2 = "0x7f18d720F0D1c78c4510342bEaBa4CBA613c7C81";

var privateKey1 = Buffer.from(config.privateKey1, "hex"); // convert to binary
var privateKey2 = Buffer.from(config.privateKey2, "hex");

async function sendTransaction(web3) {
  const nonce = await web3.eth.getTransactionCount(address1, "latest");

  // Build the transaction
  const txObject = {
    nonce: nonce,
    to: address2,
    value: web3.utils.toWei("0.1", "ether"),
    gasLimit: 21000,
    gasPrice: web3.utils.toWei("1", "gwei"),
  };

  // Sign Transaction
  const signedTx = await web3.eth.accounts.signTransaction(
    txObject,
    privateKey1
  );

  // Broadcast the transaction
  web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .then((txHash, err) => {
      console.log("txHash:", txHash);
    });
}
// sendTransaction(web3);

// Sign transactions locally using Ethereumjs/tx ????
