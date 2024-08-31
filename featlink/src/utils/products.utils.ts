import axios from 'axios';
import { API_URL } from './backend';

export interface ProductDoc {
  name: string;
  founder: string;
}

export const createProduct = async (data: Partial<ProductDoc>): Promise<ProductDoc> => {
  const res = await axios.post(`${API_URL}/products/create`, {
    name: data.name,
    founder: data.founder,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  console.log(res.data);
  return res.data;
};

// Function to get all products
export const getAllProducts = async (): Promise<ProductDoc[]> => {
  const res = await axios.get(`${API_URL}/products/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

// Function to get a product by ID
export const getProductById = async (id: string): Promise<ProductDoc | null> => {
  const res = await axios.get(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

// Function to get a product by name
export const getProductByName = async (name: string): Promise<ProductDoc | null> => {
  const res = await axios.get(`${API_URL}/products/name/${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

// Function to update a product's details
export const updateProduct = async (id: string, updateData: Partial<ProductDoc>): Promise<ProductDoc | null> => {
  const res = await axios.put(`${API_URL}/products/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};

// Function to delete a product by ID
export const deleteProduct = async (id: string): Promise<ProductDoc | null> => {
  const res = await axios.delete(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
    }
  });
  return res.data;
};