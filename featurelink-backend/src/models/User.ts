import mongoose, { Document, Schema } from 'mongoose';

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

const nftSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    address: { type: String, required: true },
  },
  { _id: false }
);

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    featCoinBalance: { type: Number, required: true, default: 0 },
    latestDailyClaimDate: { type: Date, required: true, default: Date.now },
    nfts: { type: [nftSchema], default: [] }, // Array of NFT subdocuments
  },
  { timestamps: true }
);

const User = mongoose.model<UserDoc>('User', userSchema);

export default User;