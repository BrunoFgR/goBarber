import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
   it('Should be able to create a new user', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      const user = await createUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         name: 'Bruno Figueiredo',
         password: '123456789',
      });

      expect(user).toHaveProperty('id');
   });

   it('Should not be able to create a new user with the same email', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );

      await createUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         name: 'Bruno Figueiredo',
         password: '123456789',
      });

      expect(
         createUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            name: 'Bruno Figueiredo',
            password: '123456789',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
