import { Router } from 'express';

import ensureAuthoticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProvidersController from '../controllers/ProvidersController';

const providerController = new ProvidersController();

const providersRouter = Router();

providersRouter.use(ensureAuthoticated);

// providersRouter.get('/', async (request, response) => {
//    const appointmentRepository = getCustomRepository(AppointmentRepository);

//    const repositories = await appointmentRepository.find();

//    return response.json(repositories);
// });

providersRouter.get('/', providerController.index);

export default providersRouter;
