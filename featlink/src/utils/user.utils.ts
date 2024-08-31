import axios from 'axios';
import { UserDoc, NFT } from '../types/user.types';

const API_URL = 'http://localhost:8080';

export const fetchUserId = async () => {
  const address = localStorage.getItem('walletAddress');
  if (address == null) return;
  const data = await getUserByAddress(address);
  return String(data?._id);
}


export const createUser = async (data: Partial<UserDoc>): Promise<UserDoc> => {
  const res = await axios.post(`${API_URL}/users/create`,{
    name: data.name,
    address: data.address,
  },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
      }
  })
  console.log(res.data);
  return res.data;
}

export const getAllUsers = async (): Promise<UserDoc[]> => {
  const res = await axios.get(`${API_URL}/users/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const getUserById = async (id: string): Promise<UserDoc | null> => {
  const res = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const getUserByAddress = async (address: string): Promise<UserDoc | null> => {
  const res = await axios.get(`${API_URL}/users/address/${address}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const updateUserFeatCoinBalance = async (id: string, amount: number): Promise<UserDoc | null> => {
  const res = await axios.put(`${API_URL}/users/featcoin/${id}`, { amount }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const updateUserDailyClaimDate = async (id: string): Promise<UserDoc | null> => {
  const res = await axios.put(`${API_URL}/users/daily-claim/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const addOrUpdateUserNFT = async (id: string, nft: NFT): Promise<UserDoc | null> => {
  const res = await axios.post(`${API_URL}/users/nft/${id}`, nft, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const removeUserNFT = async (id: string, nftAddress: string): Promise<UserDoc | null> => {
  const res = await axios.delete(`${API_URL}/users/nft/${id}/${nftAddress}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

export const deleteUser = async (id: string): Promise<UserDoc | null> => {
  const res = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};