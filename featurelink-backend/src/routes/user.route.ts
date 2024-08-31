import express from 'express';
import {
  createNewUser,
  getAllUsers,
  getUserById,
  getUserByAddress,
  updateUserFeatCoinBalance,
  updateUserDailyClaimDate,
  addOrUpdateUserNFT,
  removeUserNFT,
  deleteUser,
} from '../services/user.service';
import { mintFeatCoinToAddress } from '../utils/solana';

const router = express.Router();

// Route to create a new user
router.post('/create', async (req, res) => {
  try {
    const { name, address } = req.body;
    console.log(name, address);
    const newUser = await createNewUser({ 
      name, 
      address, 
      featCoinBalance: 0, 
      latestDailyClaimDate: new Date(), 
      nfts: [], 
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json(err);
  }
});

// Route to get all users
router.get('/all', async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json(err);
  }
});

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json(err);
  }
});

// Route to get a user by address
router.get('/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const user = await getUserByAddress(address);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by address:', err);
    res.status(500).json(err);
  }
});

// Route to update user's FeatCoin balance
router.put('/featcoin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const response = await mintFeatCoinToAddress(user.address, amount);


    if (!response) {
      return res.status(500).json({ message: 'Error transferring tokens' });
    }

    const updatedUser = await updateUserFeatCoinBalance(id, amount);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating FeatCoin balance:', err);
    res.status(500).json(err);
  }
});

// Route to update user's latest daily claim date
router.put('/daily-claim/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUserDailyClaimDate(id);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating daily claim date:', err);
    res.status(500).json(err);
  }
});

// Route to add or update an NFT for a user
router.post('/nft/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const nft = req.body;

    const updatedUser = await addOrUpdateUserNFT(id, nft);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error adding or updating NFT:', err);
    res.status(500).json(err);
  }
});

// Route to remove an NFT from a user
router.delete('/nft/:id/:nftAddress', async (req, res) => {
  try {
    const { id, nftAddress } = req.params;

    const updatedUser = await removeUserNFT(id, nftAddress);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error removing NFT:', err);
    res.status(500).json(err);
  }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(deletedUser);
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json(err);
  }
});

export default router;