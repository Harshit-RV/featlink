import mongoose, { Document, Schema } from 'mongoose';

export interface ProductDoc extends Document {
  name: string;
  founder: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDoc>('Product', productSchema);

export default Product;