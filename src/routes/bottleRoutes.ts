import { Router } from 'express';
import {
  checkId,
  getAllBottles,
  checkBody,
  createBottle,
  getAllBottlesJSON,
  getBottle,
} from '../controllers/bottleController';

const bottleRouter = Router();

bottleRouter.param('id', checkId);

bottleRouter.route('/').get(getAllBottles).post(checkBody, createBottle);

bottleRouter.route('/json').get(getAllBottlesJSON);

bottleRouter.route('/:id').get(getBottle);

export default bottleRouter;
