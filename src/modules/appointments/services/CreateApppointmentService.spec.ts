import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('CreateAppointment', () => {
   it('Should be able to create a new appointment', async () => {
      const fakeAppoitmentRepository = new FakeAppointmentRepository();
      const createAppointmet = new CreateAppointmentService(
         fakeAppoitmentRepository,
      );

      const appointment = await createAppointmet.execute({
         date: new Date(),
         provider_id: '123456689',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123456689');
   });

   it('Should not be able to create two appointment on the same time', async () => {
      const fakeAppoitmentRepository = new FakeAppointmentRepository();
      const createAppointmet = new CreateAppointmentService(
         fakeAppoitmentRepository,
      );

      const appointmentDate = new Date(2021, 2, 18, 12);

      await createAppointmet.execute({
         date: appointmentDate,
         provider_id: '123456689',
      });

      expect(
         createAppointmet.execute({
            date: appointmentDate,
            provider_id: '123456689',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
