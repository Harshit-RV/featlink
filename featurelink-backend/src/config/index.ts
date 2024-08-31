import { configDotenv } from 'dotenv';
configDotenv()

export default {
    mongoURI: process.env.MONGO_URI || '',
    rpcUrl: process.env.RPC_URL || '',
    featCoinAddress: process.env.FEATCOIN_ADDRESS || '',
    mintWallet: process.env.MINT_WALLET || '',
};