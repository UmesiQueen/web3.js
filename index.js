import Web3 from "web3";
import config from "./config.js";

// Configuring the connection to an Ethereum node
const rpcURL = `https://mainnet.infura.io/v3/${config.infuraPrivateKey}`;

const web3 = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(rpcURL)
);
