import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();
      fakeUserTokenRepository = new FakeUserTokenRepository();
      fakeHashProvider = new FakeHashProvider();

      resetPassword = new ResetPasswordService(
         fakeUsersRepository,
         fakeUserTokenRepository,
         fakeHashProvider,
      );
   });

   it('Should be able to reset the password', async () => {
      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      const { token } = await fakeUserTokenRepository.generate(user.id);

      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

      await resetPassword.execute({
         password: '12315456131',
         token,
      });

      const updatedUser = await fakeUsersRepository.findById(user.id);

      expect(generateHash).toHaveBeenCalledWith('12315456131');
      expect(updatedUser?.password).toBe('12315456131');
   });

   it('Should not be able to reset the password when non-existing token', async () => {
      await expect(
         resetPassword.execute({
            password: '123456789',
            token: 'non-existing-token',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to reset the password when non-existing user', async () => {
      const { token } = await fakeUserTokenRepository.generate(
         'non-existing-user',
      );

      await expect(
         resetPassword.execute({
            password: '123456789',
            token,
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should not be able to reset the password when non-existing user', async () => {
      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      const { token } = await fakeUserTokenRepository.generate(user.id);

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         const customDate = new Date();

         return customDate.setHours(customDate.getHours() + 3);
      });

      await expect(
         resetPassword.execute({
            password: '123456789',
            token,
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
