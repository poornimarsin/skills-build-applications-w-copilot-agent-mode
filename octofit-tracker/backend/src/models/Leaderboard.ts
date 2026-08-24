import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  userEmail: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>({
  userEmail: { type: String, required: true, lowercase: true, trim: true },
  points: { type: Number, required: true, min: 0, default: 0 },
  rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });

export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);