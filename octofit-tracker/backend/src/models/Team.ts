import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  memberEmails: string[];
}

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, trim: true },
  memberEmails: [{ type: String, lowercase: true, trim: true }],
}, { timestamps: true });

export const TeamModel = model<Team>('Team', teamSchema);