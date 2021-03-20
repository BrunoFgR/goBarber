import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import FakeEmailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeEmailProvider: FakeEmailProvider;
let fakeUsersRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
   beforeEach(() => {
      fakeUserTokenRepository = new FakeUserTokenRepository();
      fakeUsersRepository = new FakeUserRepository();
      fakeEmailProvider = new FakeEmailProvider();

      sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUsersRepository,
         fakeEmailProvider,
         fakeUserTokenRepository,
      );
   });

   it('Should be able to recover the password using the email', async () => {
      const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

      await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'johndoe@example.com',
      });

      expect(sendEmail).toHaveBeenCalled();
   });

   it('Should not be able to recover a non-existing user password', async () => {
      await expect(
         sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should generate a forgot password token', async () => {
      const sendToken = jest.spyOn(fakeUserTokenRepository, 'generate');

      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'johndoe@example.com',
      });

      expect(sendToken).toHaveBeenCalledWith(user.id);
   });
});
