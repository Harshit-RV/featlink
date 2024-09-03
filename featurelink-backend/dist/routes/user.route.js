"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../services/user.service");
const solana_1 = require("../utils/solana");
const router = express_1.default.Router();
// Route to create a new user
router.post('/create', async (req, res) => {
    try {
        const { name, address } = req.body;
        console.log(name, address);
        const user = await (0, user_service_1.getUserByAddress)(address);
        if (user) {
            return res.status(201).json({ message: 'User already exists' });
        }
        const newUser = await (0, user_service_1.createNewUser)({
            name,
            address,
            featCoinBalance: 0,
            latestDailyClaimDate: new Date(),
            nfts: [],
        });
        return res.status(201).json(newUser);
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json(err);
    }
});
// Route to get all users
router.get('/all', async (req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsers)();
        return res.status(200).json(users);
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json(err);
    }
});
// Route to get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.getUserById)(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json(err);
    }
});
// Route to get a user by address
router.get('/address/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const user = await (0, user_service_1.getUserByAddress)(address);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error('Error fetching user by address:', err);
        res.status(500).json(err);
    }
});
// Route to update user's FeatCoin balance
router.put('/featcoin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;
        const user = await (0, user_service_1.getUserById)(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const response = await (0, solana_1.mintFeatCoinToAddress)(user.address, amount);
        if (!response) {
            return res.status(500).json({ message: 'Error transferring tokens' });
        }
        const updatedUser = await (0, user_service_1.updateUserFeatCoinBalance)(id, amount);
        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error updating FeatCoin balance:', err);
        res.status(500).json(err);
    }
});
// Route to update user's latest daily claim date
router.put('/daily-claim/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await (0, user_service_1.updateUserDailyClaimDate)(id);
        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error updating daily claim date:', err);
        res.status(500).json(err);
    }
});
// Route to add or update an NFT for a user
router.post('/nft/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nft = req.body;
        const updatedUser = await (0, user_service_1.addOrUpdateUserNFT)(id, nft);
        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error adding or updating NFT:', err);
        res.status(500).json(err);
    }
});
// Route to remove an NFT from a user
router.delete('/nft/:id/:nftAddress', async (req, res) => {
    try {
        const { id, nftAddress } = req.params;
        const updatedUser = await (0, user_service_1.removeUserNFT)(id, nftAddress);
        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error removing NFT:', err);
        res.status(500).json(err);
    }
});
// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, user_service_1.deleteUser)(id);
        if (!deletedUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(deletedUser);
    }
    catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json(err);
    }
});
exports.default = router;
