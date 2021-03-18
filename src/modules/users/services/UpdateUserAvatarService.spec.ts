import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import FakeStorageRepository from '@shared/container/providers/storageProvider/fakes/FakeDiskStorageRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
   it('Should be able to update a new avatar', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeStorageRepository = new FakeStorageRepository();

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageRepository,
      );

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
      const fakeUsersRepository = new FakeUserRepository();
      const fakeStorageRepository = new FakeStorageRepository();

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageRepository,
      );

      expect(
         updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
         }),
      ).rejects.toBeInstanceOf(AppErrors);
   });

   it('Should delete old avatar when updating new one', async () => {
      const fakeUsersRepository = new FakeUserRepository();
      const fakeStorageRepository = new FakeStorageRepository();

      const deleteFile = jest.spyOn(fakeStorageRepository, 'deleteFile');

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageRepository,
      );

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
