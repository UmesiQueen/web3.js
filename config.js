import dotenv from "dotenv";

dotenv.config();

export default {
  infuraPrivateKey: process.env.INFURA_PRIVATE_KEY,
  privateKey1: process.env.PRIVATE_KEY_1,
  privateKey2: process.env.PRIVATE_KEY_2,
};
