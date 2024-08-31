import mongoose from "mongoose";
import User, { UserDoc, NFT } from "../models/User";

/**
 * Create a new user
 * @param args - User properties
 * @returns The created user document
 */
export const createNewUser = async (args: Partial<UserDoc>): Promise<UserDoc> => {
  const newUser = new User(args);
  return newUser.save();
};

/**
 * Get all users
 * @returns An array of all user documents
 */
export const getAllUsers = async (): Promise<UserDoc[]> => {
  return User.find({});
};

/**
 * Get user by ID
 * @param id - User ID
 * @returns The user document or null if not found
 */
export const getUserById = async (id: string): Promise<UserDoc | null> => {
  return User.findById(id);
};

/**
 * Get user by address
 * @param address - User address
 * @returns The user document or null if not found
 */
export const getUserByAddress = async (address: string): Promise<UserDoc | null> => {
  return User.findOne({ address });
};

/**
 * Update user's FeatCoin balance
 * @param id - User ID
 * @param amount - Amount to add or subtract from the current balance
 * @returns The updated user document
 */
export const updateUserFeatCoinBalance = async (id: string, amount: number): Promise<UserDoc | null> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.featCoinBalance += amount;
  return user.save();
};

/**
 * Update user's latest daily claim date
 * @param id - User ID
 * @param date - New daily claim date
 * @returns The updated user document
 */
export const updateUserDailyClaimDate = async (id: string): Promise<UserDoc | null> => {
  const currentDate = new Date(); // Current server timestamp
  return User.findByIdAndUpdate(id, { latestDailyClaimDate: currentDate }, { new: true });
};

/**
 * Add or update an NFT for a user
 * @param id - User ID
 * @param nft - NFT data to add or update
 * @returns The updated user document
 */
export const addOrUpdateUserNFT = async (id: string, nft: NFT): Promise<UserDoc | null> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const existingNFT = user.nfts.find((existing) => existing.address === nft.address);

  if (existingNFT) {
    // Update existing NFT
    existingNFT.name = nft.name;
    existingNFT.quantity = nft.quantity;
  } else {
    // Add new NFT
    user.nfts.push(nft);
  }

  return user.save();
};

/**
 * Remove an NFT from a user
 * @param id - User ID
 * @param nftAddress - Address of the NFT to be removed
 * @returns The updated user document
 */
export const removeUserNFT = async (id: string, nftAddress: string): Promise<UserDoc | null> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.nfts = user.nfts.filter((nft) => nft.address !== nftAddress);

  return user.save();
};

/**
 * Delete a user by ID
 * @param id - User ID
 * @returns The deleted user document
 */
export const deleteUser = async (id: string): Promise<UserDoc | null> => {
  return User.findByIdAndDelete(id);
};

export const getUserIdByAddress = async (address: string): Promise<mongoose.Schema.Types.ObjectId | null> => {
  const user = await User.findOne({ address });

  if (!user) {
    return null;
  }

  return user._id as mongoose.Schema.Types.ObjectId;
}