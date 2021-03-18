import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import '@modules/users/providers';
import './providers';

container.registerSingleton<IAppointmentRepository>(
   'AppointmentRepository',
   AppointmentRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
