import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UserRepository implements IUserRepository {
   private ormRepository: Repository<User>;

   constructor() {
      this.ormRepository = getRepository(User);
   }

   public async findById(id: string): Promise<User | undefined> {
      const findId = await this.ormRepository.findOne(id);

      return findId;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      const findEmail = await this.ormRepository.findOne({
         where: { email },
      });

      return findEmail;
   }

   public async create({
      email,
      name,
      password,
   }: ICreateUserDTO): Promise<User> {
      const user = this.ormRepository.create({
         email,
         name,
         password,
      });

      await this.ormRepository.save(user);

      return user;
   }

   public async save(user: User): Promise<void> {
      await this.ormRepository.save(user);
   }
}

export default UserRepository;
