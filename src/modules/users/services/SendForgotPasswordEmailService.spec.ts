import 'reflect-metadata';

// import AppErrors from '@shared/errors/AppErrors';

import FakeEmailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
   it('Should be able to recover the password using the email', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeEmailProvider = new FakeEmailProvider();

      const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

      const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUsersRepository,
      );

      await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'bruno.figueiredo@oihandover.com',
      });

      expect(sendEmail).toHaveBeenCalled();
   });
});
