import mongoose, { Schema, Document } from 'mongoose';

export interface IUserCard extends Document {
  userId: string;
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  nickname?: string;
  createdAt: Date;
}

const UserCardSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  bank: { type: String, required: true },
  variant: { type: String, required: true },
  network: { type: String, required: true, enum: ['Visa', 'Mastercard', 'RuPay', 'Amex'] },
  nickname: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// Avoid compile error on hot reloads
export default mongoose.models.UserCard || mongoose.model<IUserCard>('UserCard', UserCardSchema);
