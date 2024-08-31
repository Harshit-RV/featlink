import mongoose, { Document } from 'mongoose';

export interface ProductDoc extends Document {
  name: string;
  founder: mongoose.Schema.Types.ObjectId;
}
