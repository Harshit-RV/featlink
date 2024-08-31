import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Signer, Transaction } from "@solana/web3.js"
import config from "../config"
import { createMint, createTransferInstruction, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const createTokenMint = async (mintWallet : Keypair) => {
  const conn = new Connection(config.rpcUrl, "confirmed");
  const creatorAccount = await createMint(conn, mintWallet, mintWallet.publicKey, null, 8, undefined, undefined, TOKEN_PROGRAM_ID);
  return creatorAccount;
}

export const transferToken = async (tokenAddress : PublicKey, mintWallet : Keypair, receiver: PublicKey, amount: number) => {
  const conn = new Connection(config.rpcUrl, "confirmed");
  const mintTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    mintWallet,
    tokenAddress,
    mintWallet.publicKey,
  )

  
  await mintTo(
    conn,
    mintWallet,
    tokenAddress,
    mintTokenAccount.address,
    mintWallet,
    amount * 100000000
  );


  const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    mintWallet,
    tokenAddress,
    receiver
  );


  const transaction = new Transaction().add(
    createTransferInstruction(
      mintTokenAccount.address,
      receiverTokenAccount.address,
      mintWallet.publicKey,
      amount * 100000000,
      [],
      TOKEN_PROGRAM_ID
    )
  );


  await sendAndConfirmTransaction(conn, transaction, [
    mintWallet,
  ]);

}