// models/SellerAnalytics.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  userId: string;
  totalRevenue: number;
  totalPaidAmount: number;
  productsSold: number;
  lastUpdated: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  userId: { type: String, required: true },
  totalRevenue: { type: Number, default: 0 },
  totalPaidAmount: { type: Number, default: 0 },
  productsSold: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export const AnalyticsModel = mongoose.models?.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
