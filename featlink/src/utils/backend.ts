import { FeatureDoc } from "@/types/features.types";
import { ProductDoc } from "@/types/products.types";
import { UserDoc } from "@/types/user.types";
import axios from 'axios';

export const API_URL = 'http://localhost:8080';

// export const createFeature = async (data: UserDoc): Promise<UserDoc> => {
//   const res = await axios.post('https://wt-server.onrender.com/monitor/list', {
//       headers: {
//           Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
//       }
//   })
//   return res.data;
// }

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

export const createProduct = async (data: Partial<ProductDoc>): Promise<UserDoc> => {
  const res = await axios.post(`${API_URL}/products/create`,{
    name: data.name,
    founder: data.founder,
  },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
      }
  })
  console.log(res.data);
  return res.data;
}


export const getAllFeatures = async (): Promise<FeatureDoc[]> => {
  const res = await axios.get(`${API_URL}/features/all`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
      }
  })
  console.log(res.data);
  return res.data;
}


export const getFeaturesByProductId = async (productId: string): Promise<FeatureDoc[]> => {
  const res = await axios.get(`${API_URL}/features/${productId}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('walletAddress')}`
      }
  })
  console.log(res.data);
  return res.data;
}