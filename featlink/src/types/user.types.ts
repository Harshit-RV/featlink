import { Document } from 'mongoose';

export interface NFT {
  name: string;
  quantity: number;
  address: string;
}

export interface UserDoc extends Document {
  name: string;
  address: string;
  featCoinBalance: number;
  latestDailyClaimDate: Date;
  nfts: NFT[];
  createdAt: Date;
  updatedAt: Date;
}
