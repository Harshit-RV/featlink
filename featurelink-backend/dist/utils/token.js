"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferToken = exports.createTokenMint = void 0;
const web3_js_1 = require("@solana/web3.js");
const config_1 = __importDefault(require("../config"));
const spl_token_1 = require("@solana/spl-token");
const createTokenMint = async (mintWallet) => {
    const conn = new web3_js_1.Connection(config_1.default.rpcUrl, "confirmed");
    const creatorAccount = await (0, spl_token_1.createMint)(conn, mintWallet, mintWallet.publicKey, null, 8, undefined, undefined, spl_token_1.TOKEN_PROGRAM_ID);
    return creatorAccount;
};
exports.createTokenMint = createTokenMint;
const transferToken = async (tokenAddress, mintWallet, receiver, amount) => {
    const conn = new web3_js_1.Connection(config_1.default.rpcUrl, "confirmed");
    const mintTokenAccount = await (0, spl_token_1.getOrCreateAssociatedTokenAccount)(conn, mintWallet, tokenAddress, mintWallet.publicKey);
    await (0, spl_token_1.mintTo)(conn, mintWallet, tokenAddress, mintTokenAccount.address, mintWallet, amount * 100000000);
    const receiverTokenAccount = await (0, spl_token_1.getOrCreateAssociatedTokenAccount)(conn, mintWallet, tokenAddress, receiver);
    const transaction = new web3_js_1.Transaction().add((0, spl_token_1.createTransferInstruction)(mintTokenAccount.address, receiverTokenAccount.address, mintWallet.publicKey, amount * 100000000, [], spl_token_1.TOKEN_PROGRAM_ID));
    await (0, web3_js_1.sendAndConfirmTransaction)(conn, transaction, [
        mintWallet,
    ]);
};
exports.transferToken = transferToken;
