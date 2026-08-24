import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await UserModel.insertMany([
      { name: 'Ada Lovelace', email: 'ada@example.com' },
      { name: 'Grace Hopper', email: 'grace@example.com' },
    ]);
    await TeamModel.create({ name: 'Code Sprinters', memberEmails: ['ada@example.com', 'grace@example.com'] });
    await ActivityModel.create({ userEmail: 'ada@example.com', type: 'Run', durationMinutes: 30 });
    await LeaderboardModel.insertMany([
      { userEmail: 'ada@example.com', points: 120, rank: 1 },
      { userEmail: 'grace@example.com', points: 95, rank: 2 },
    ]);
    await WorkoutModel.create({
      title: 'Morning Momentum',
      description: 'A balanced full-body starter workout.',
      difficulty: 'beginner',
      durationMinutes: 20,
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
