"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.default = {
    mongoURI: process.env.MONGO_URI || '',
    rpcUrl: process.env.RPC_URL || '',
    featCoinAddress: process.env.FEATCOIN_ADDRESS || '',
    mintWallet: process.env.MINT_WALLET || '',
};
