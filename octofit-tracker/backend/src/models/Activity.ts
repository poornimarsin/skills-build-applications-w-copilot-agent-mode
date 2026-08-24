import { Schema, model } from 'mongoose';

export interface Activity {
  userEmail: string;
  type: string;
  durationMinutes: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>({
  userEmail: { type: String, required: true, lowercase: true, trim: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  completedAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

export const ActivityModel = model<Activity>('Activity', activitySchema);