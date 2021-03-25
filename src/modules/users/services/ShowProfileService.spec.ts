import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import ShowProfileService from './ShowProfileService';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();

      showProfileService = new ShowProfileService(fakeUsersRepository);
   });

   it('Should be able to show the profile', async () => {
      const user = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      const showProfile = await showProfileService.execute({
         user_id: user.id,
      });

      expect(showProfile.name).toBe('John Doe');
      expect(showProfile.email).toBe('johndoe@example.com');
   });

   it('Should not be able to show profile that not exist', async () => {
      await expect(
         showProfileService.execute({
            user_id: 'user-does-not-exist',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });
});
