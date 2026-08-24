import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  avatarUrl: { type: String },
}, { timestamps: true });

export const UserModel = model<User>('User', userSchema);