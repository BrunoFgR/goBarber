import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

describe('AuthenticateUser', () => {
   it('Should be able to authenticate', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      await createUser.execute({
         name: 'Bruno Figueiredo',
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      const authenticateUser = new AuthenticateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      const response = await authenticateUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      expect(response).toHaveProperty('token');
   });

   it('Should not be able to authenticate with non existing user', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const authenticateUser = new AuthenticateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      await expect(
         authenticateUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            password: '123456789',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to authenticate with wrong password', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      await createUser.execute({
         name: 'Bruno Figueiredo',
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      const authenticateUser = new AuthenticateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      await expect(
         authenticateUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            password: '12345678',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
