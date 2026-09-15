import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email?: string;
  inquiryType: 'Wallpaper' | 'Wallpaper Panels' | 'Interior Design' | 'General Inquiry';
  productId?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    email: { type: String, trim: true, default: '' },
    inquiryType: {
      type: String,
      enum: ['Wallpaper', 'Wallpaper Panels', 'Interior Design', 'General Inquiry'],
      default: 'General Inquiry',
    },
    productId: { type: String, default: '' },
    subject: { type: String, required: [true, 'Subject is required'], trim: true },
    message: { type: String, required: [true, 'Message is required'] },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  }
);

export const InquiryModel = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
