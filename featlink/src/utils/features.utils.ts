import axios from 'axios';
import { API_URL } from './backend'; // Ensure you have a config file with your API_URL
import { FeatureDoc, FeatureType, FeatureImplementationStatus, UserReviewMetric, UserQuestionMetric } from '../types/features.types';

const getAuthHeader = () => {
  const walletAddress = localStorage.getItem('walletAddress');
  return walletAddress ? `Bearer ${walletAddress}` : '';
};

export const createFeature = async (data: {
  publisher: string;
  title: string;
  description: string;
  type: FeatureType;
  imageUrl?: string;
  implementationStatus: FeatureImplementationStatus;
  upvotes: UserReviewMetric;
  downvotes: UserReviewMetric;
  usefulness: UserQuestionMetric;
  productId?: string;
}): Promise<FeatureDoc> => {
  const res = await axios.post(`${API_URL}/features/create`, data, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const getAllFeatures = async (): Promise<FeatureDoc[]> => {
  const res = await axios.get(`${API_URL}/features/all`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const getFeatureById = async (id: string): Promise<FeatureDoc | null> => {
  const res = await axios.get(`${API_URL}/features/${id}`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const getFeaturesByPublisher = async (publisher: string): Promise<FeatureDoc[]> => {
  const res = await axios.get(`${API_URL}/features/publisher/${publisher}`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const getFeaturesByProduct = async (productId: string): Promise<FeatureDoc[]> => {
  const res = await axios.get(`${API_URL}/features/product/${productId}`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const updateFeatureStatus = async (id: string, status: FeatureImplementationStatus): Promise<FeatureDoc | null> => {
  const res = await axios.put(`${API_URL}/features/status/${id}`, { status }, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const addVoteToFeature = async (id: string, isUpvote: boolean): Promise<FeatureDoc | null> => {
  const res = await axios.post(`${API_URL}/features/vote/${id}`, { isUpvote }, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const updateUsefulnessMetric = async (id: string, feedback: 'yes' | 'no' | 'maybe'): Promise<FeatureDoc | null> => {
  const res = await axios.post(`${API_URL}/features/usefulness/${id}`, { feedback }, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
  return res.data;
};

export const deleteFeature = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/features/${id}`, {
    headers: {
      Authorization: getAuthHeader()
    }
  });
};