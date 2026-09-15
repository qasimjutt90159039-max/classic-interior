import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  category: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const CollectionModel = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
