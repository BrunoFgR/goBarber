import { inject, injectable } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
   user_id: string;
   avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,

      @inject('StorageProvider')
      private storageProvider: IStorageProvider,
   ) {}

   public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
         throw new AppErrors(
            'Only authenticated users can change avatar.',
            401,
         );
      }

      if (user.avatar) {
         // Deletar avatar anterior
         await this.storageProvider.deleteFile(user.avatar);
      }

      const filename = await this.storageProvider.saveFile(avatarFilename);

      user.avatar = filename;

      await this.usersRepository.save(user);

      return user;
   }
}

export default UpdateUserAvatarService;
