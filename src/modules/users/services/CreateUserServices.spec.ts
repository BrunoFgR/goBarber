import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();
      fakeHashProvider = new FakeHashProvider();

      createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
   });

   it('Should be able to create a new user', async () => {
      const user = await createUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         name: 'Bruno Figueiredo',
         password: '123456789',
      });

      expect(user).toHaveProperty('id');
   });

   it('Should not be able to create a new user with the same email', async () => {
      await createUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         name: 'Bruno Figueiredo',
         password: '123456789',
      });

      await expect(
         createUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            name: 'Bruno Figueiredo',
            password: '123456789',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
