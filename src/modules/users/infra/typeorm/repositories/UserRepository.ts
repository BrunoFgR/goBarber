import { getRepository, Repository, Not } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

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

   public async findAllProviders({
      except_user_id,
   }: IFindAllProvidersDTO): Promise<User[]> {
      let users: User[];

      if (except_user_id) {
         users = await this.ormRepository.find({
            where: { id: Not(except_user_id) },
         });
      } else {
         users = await this.ormRepository.find();
      }

      return users;
   }
}

export default UserRepository;
