import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
   provider_id: string;
   date: Date;
}

@injectable()
class CreateAppointmentService {
   constructor(
      @inject('AppointmentRepository')
      private appointmentRepository: IAppointmentRepository,
   ) {}

   public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
      const appointmentDate = startOfHour(date);
      const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw new AppErrors('This appointment is already booked');
      }

      const appointment = this.appointmentRepository.create({
         provider_id,
         date: appointmentDate,
      });

      return appointment;
   }
}

export default CreateAppointmentService;
