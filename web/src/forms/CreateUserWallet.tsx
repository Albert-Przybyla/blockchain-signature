import { PrivateKey } from "@bsv/sdk";
import { useEffect } from "react";
// import crypto from "crypto";

const CreateUserWalletForm = ({ password }: { password: string }) => {
  const createWallet = () => {
    const privateKey = PrivateKey.fromRandom();

    // Generowanie adresu na podstawie klucza prywatnego
    // const address = Address.fromPrivateKey(privateKey).toString();

    console.log("Private key (WIF):", privateKey.toWif());
    // encryptPrivateKey(privateKey.toWif(), password);
    // console.log("Address:", address);
  };

  useEffect(() => {
    if (password) createWallet();
  }, [password]);

  return <div>{password}</div>;
};

export default CreateUserWalletForm;
