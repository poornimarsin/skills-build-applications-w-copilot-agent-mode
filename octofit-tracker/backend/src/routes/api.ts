import { Router, type RequestHandler } from 'express';
import type { Model } from 'mongoose';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const router = Router();

const list = <DocumentType>(model: Model<DocumentType>): RequestHandler => async (_request, response, next) => {
  try {
    response.json(await model.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};

const create = <DocumentType>(model: Model<DocumentType>): RequestHandler => async (request, response, next) => {
  try {
    const document = await model.create(request.body);
    response.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

router.route('/users').get(list(UserModel)).post(create(UserModel));
router.route('/teams').get(list(TeamModel)).post(create(TeamModel));
router.route('/activities').get(list(ActivityModel)).post(create(ActivityModel));
router.route('/leaderboard').get(list(LeaderboardModel)).post(create(LeaderboardModel));
router.route('/workouts').get(list(WorkoutModel)).post(create(WorkoutModel));

export default router;