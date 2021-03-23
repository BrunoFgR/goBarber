import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import FakeStorageRepository from '@shared/container/providers/storageProvider/fakes/FakeDiskStorageRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageRepository;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();
      fakeStorageProvider = new FakeStorageRepository();

      updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageProvider,
      );
   });

   it('Should be able to update a new avatar', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'jhondoe@example.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      });

      expect(user.avatar).toBe('avatar.jpg');
   });

   it('Should  not be able to update avatar from non existing user', async () => {
      await expect(
         updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should delete old avatar when updating new one', async () => {
      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar2.jpg',
      });

      expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
      expect(user.avatar).toBe('avatar2.jpg');
   });
});
