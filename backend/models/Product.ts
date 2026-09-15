import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  images: string[];
  specifications?: string;
  availability?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    specifications: { type: String, default: '' },
    availability: { type: String, default: 'Available on Request' },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
