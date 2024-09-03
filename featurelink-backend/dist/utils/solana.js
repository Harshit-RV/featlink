"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintFeatCoinToAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
const config_1 = __importDefault(require("../config"));
const token_1 = require("./token");
const MINT_WALLET = [112, 56, 50, 125, 189, 133, 38, 164, 135, 209, 179, 182, 212, 213, 251, 83, 213, 248, 105, 241, 153, 168, 107, 34, 44, 139, 249, 32, 227, 59, 155, 248, 76, 146, 149, 95, 73, 84, 180, 171, 63, 38, 227, 159, 40, 197, 240, 130, 190, 198, 228, 138, 249, 224, 221, 2, 41, 63, 85, 58, 183, 85, 116, 240];
const mintFeatCoinToAddress = async (address, amount) => {
    const response = await tokenTransfer2(new web3_js_1.PublicKey(address), amount);
    return response;
};
exports.mintFeatCoinToAddress = mintFeatCoinToAddress;
const tokenTransfer2 = async (publicKey, amount) => {
    try {
        const mintWallet = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(MINT_WALLET));
        await (0, token_1.transferToken)(new web3_js_1.PublicKey(config_1.default.featCoinAddress), mintWallet, publicKey, amount);
        return true;
    }
    catch (err) {
        return false;
    }
};
