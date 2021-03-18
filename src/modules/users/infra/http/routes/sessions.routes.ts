import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
