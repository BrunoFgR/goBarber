import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();
      fakeHashProvider = new FakeHashProvider();

      updateProfile = new UpdateProfileService(
         fakeUsersRepository,
         fakeHashProvider,
      );
   });

   it('Should be able to update the profile', async () => {
      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         email: 'johntre@example.com',
         name: 'John Tre',
      });

      expect(updatedUser.name).toBe('John Tre');
      expect(updatedUser.email).toBe('johntre@example.com');
   });

   it('Should not be able to update a profile that non exist', async () => {
      await expect(
         updateProfile.execute({
            user_id: 'user-non-exist',
            email: 'test@example.com',
            name: 'Test 2',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to change to another user email', async () => {
      await fakeUsersRepository.create({
         email: 'test@example.com',
         name: 'Test',
         password: '12345',
      });

      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            email: 'test@example.com',
            name: 'Test 2',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should be able to update the password', async () => {
      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         email: 'johntre@example.com',
         name: 'John Tre',
         password: '123123',
         old_password: '12345',
      });

      expect(updatedUser.password).toBe('123123');
   });

   it('Should not be able to update the password without to receive old_password', async () => {
      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123123',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to update the password to receive wrong old password', async () => {
      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123123',
            old_password: 'wrong-old-password',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
