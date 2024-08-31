import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import config from "../config";
import { createTokenMint, transferToken } from "./token";

const MINT_WALLET=[112,56,50,125,189,133,38,164,135,209,179,182,212,213,251,83,213,248,105,241,153,168,107,34,44,139,249,32,227,59,155,248,76,146,149,95,73,84,180,171,63,38,227,159,40,197,240,130,190,198,228,138,249,224,221,2,41,63,85,58,183,85,116,240]


export const mintFeatCoinToAddress = async (address: string, amount: number): Promise<boolean| undefined> => {
  const response = await tokenTransfer2(new PublicKey(address), amount);
  return response;
}

const tokenTransfer2 = async (publicKey : PublicKey, amount: number) : Promise<boolean | undefined> => {
  try {

    const mintWallet = Keypair.fromSecretKey(
      Uint8Array.from(MINT_WALLET)
    );

    await transferToken(new PublicKey(config.featCoinAddress), mintWallet, publicKey, amount);
    return true;
  } catch (err) {
    return false;
  }
}