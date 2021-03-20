import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const passwordController = new SessionController();

const sessionRouter = Router();

sessionRouter.post('/', passwordController.create);

export default sessionRouter;
