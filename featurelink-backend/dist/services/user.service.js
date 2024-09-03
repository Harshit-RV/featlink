"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByAddress = exports.deleteUser = exports.removeUserNFT = exports.addOrUpdateUserNFT = exports.updateUserDailyClaimDate = exports.updateUserFeatCoinBalance = exports.getUserByAddress = exports.getUserById = exports.getAllUsers = exports.createNewUser = void 0;
const User_1 = __importDefault(require("../models/User"));
/**
 * Create a new user
 * @param args - User properties
 * @returns The created user document
 */
const createNewUser = async (args) => {
    const newUser = new User_1.default(args);
    return newUser.save();
};
exports.createNewUser = createNewUser;
/**
 * Get all users
 * @returns An array of all user documents
 */
const getAllUsers = async () => {
    return User_1.default.find({});
};
exports.getAllUsers = getAllUsers;
/**
 * Get user by ID
 * @param id - User ID
 * @returns The user document or null if not found
 */
const getUserById = async (id) => {
    return User_1.default.findById(id);
};
exports.getUserById = getUserById;
/**
 * Get user by address
 * @param address - User address
 * @returns The user document or null if not found
 */
const getUserByAddress = async (address) => {
    return User_1.default.findOne({ address });
};
exports.getUserByAddress = getUserByAddress;
/**
 * Update user's FeatCoin balance
 * @param id - User ID
 * @param amount - Amount to add or subtract from the current balance
 * @returns The updated user document
 */
const updateUserFeatCoinBalance = async (id, amount) => {
    const user = await User_1.default.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    user.featCoinBalance += amount;
    return user.save();
};
exports.updateUserFeatCoinBalance = updateUserFeatCoinBalance;
/**
 * Update user's latest daily claim date
 * @param id - User ID
 * @param date - New daily claim date
 * @returns The updated user document
 */
const updateUserDailyClaimDate = async (id) => {
    const currentDate = new Date(); // Current server timestamp
    return User_1.default.findByIdAndUpdate(id, { latestDailyClaimDate: currentDate }, { new: true });
};
exports.updateUserDailyClaimDate = updateUserDailyClaimDate;
/**
 * Add or update an NFT for a user
 * @param id - User ID
 * @param nft - NFT data to add or update
 * @returns The updated user document
 */
const addOrUpdateUserNFT = async (id, nft) => {
    const user = await User_1.default.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const existingNFT = user.nfts.find((existing) => existing.address === nft.address);
    if (existingNFT) {
        // Update existing NFT
        existingNFT.name = nft.name;
        existingNFT.quantity = nft.quantity;
    }
    else {
        // Add new NFT
        user.nfts.push(nft);
    }
    return user.save();
};
exports.addOrUpdateUserNFT = addOrUpdateUserNFT;
/**
 * Remove an NFT from a user
 * @param id - User ID
 * @param nftAddress - Address of the NFT to be removed
 * @returns The updated user document
 */
const removeUserNFT = async (id, nftAddress) => {
    const user = await User_1.default.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    user.nfts = user.nfts.filter((nft) => nft.address !== nftAddress);
    return user.save();
};
exports.removeUserNFT = removeUserNFT;
/**
 * Delete a user by ID
 * @param id - User ID
 * @returns The deleted user document
 */
const deleteUser = async (id) => {
    return User_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
const getUserIdByAddress = async (address) => {
    const user = await User_1.default.findOne({ address });
    if (!user) {
        return null;
    }
    return user._id;
};
exports.getUserIdByAddress = getUserIdByAddress;
