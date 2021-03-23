import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();
      fakeHashProvider = new FakeHashProvider();

      createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
      authenticateUser = new AuthenticateUserService(
         fakeUsersRepository,
         fakeHashProvider,
      );
   });

   it('Should be able to authenticate', async () => {
      await createUser.execute({
         name: 'Bruno Figueiredo',
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      const response = await authenticateUser.execute({
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      expect(response).toHaveProperty('token');
   });

   it('Should not be able to authenticate with non existing user', async () => {
      await expect(
         authenticateUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            password: '123456789',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to authenticate with wrong password', async () => {
      await createUser.execute({
         name: 'Bruno Figueiredo',
         email: 'bruno.figueiredo@oihandover.com',
         password: '123456789',
      });

      await expect(
         authenticateUser.execute({
            email: 'bruno.figueiredo@oihandover.com',
            password: '12345678',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
