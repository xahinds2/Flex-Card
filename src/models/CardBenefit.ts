import mongoose, { Schema, Document } from 'mongoose';

export interface ICardBenefit extends Document {
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  category: 'cashback' | 'lounge' | 'rewards' | 'dining' | 'fuel' | 'milestone';
  title: string;
  description: string;
  value: string;
  conditions?: string;
  createdAt: Date;
}

const CardBenefitSchema: Schema = new Schema({
  bank: { type: String, required: true, index: true },
  variant: { type: String, required: true, index: true },
  network: { type: String, required: true, enum: ['Visa', 'Mastercard', 'RuPay', 'Amex'] },
  category: {
    type: String,
    required: true,
    enum: ['cashback', 'lounge', 'rewards', 'dining', 'fuel', 'milestone'],
    index: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: String, required: true },
  conditions: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for quick catalog lookups
CardBenefitSchema.index({ bank: 1, variant: 1 });

export default mongoose.models.CardBenefit || mongoose.model<ICardBenefit>('CardBenefit', CardBenefitSchema);
