import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import '@modules/users/providers';
import './providers';

container.registerSingleton<IAppointmentRepository>(
   'AppointmentRepository',
   AppointmentRepository,
);

container.registerSingleton<IUserTokenRepository>(
   'UserTokenRepository',
   UserTokenRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
