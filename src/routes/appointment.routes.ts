import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import ensureAuthoticated from '../middlewares/ensureAutheticated';

const router = Router();

router.use(ensureAuthoticated);

router.get('/', async (request, response) => {
   const appointmentRepository = getCustomRepository(AppointmentRepository);

   const repositories = await appointmentRepository.find();

   return response.json(repositories);
});

router.post('/', async (request, response) => {
   try {
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
         provider_id,
         date: parsedDate,
      });

      return response.json(appointment);
   } catch (err) {
      return response.status(400).json({ message: err.message });
   }
});

export default router;
