import { Router } from 'express';

import ensureAuthoticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentController = new AppointmentController();

const router = Router();

router.use(ensureAuthoticated);

// router.get('/', async (request, response) => {
//    const appointmentRepository = getCustomRepository(AppointmentRepository);

//    const repositories = await appointmentRepository.find();

//    return response.json(repositories);
// });

router.post('/', appointmentController.create);

export default router;
