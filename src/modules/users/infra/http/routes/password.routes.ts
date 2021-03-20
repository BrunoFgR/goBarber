import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const sessionRouter = Router();

sessionRouter.post('/forgot', forgotPasswordController.create);
sessionRouter.post('/reset', resetPasswordController.create);

export default sessionRouter;
