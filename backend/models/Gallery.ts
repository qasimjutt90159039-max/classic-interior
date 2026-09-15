import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  image: string;
  title: string;
  category: string;
  description?: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  }
);

export const GalleryModel = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
