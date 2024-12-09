const { PublicKey, PrivateKey } = require("@bsv/sdk");

const createWallet = () => {
  const privateKey = PrivateKey();
  const publicKey = privateKey.toPublicKey();
  cosnt memo = privateKey.toWIF();
  return { privateKey, publicKey };
};
