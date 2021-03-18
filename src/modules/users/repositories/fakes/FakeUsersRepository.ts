import { uuid } from 'uuidv4';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UserRepository implements IUserRepository {
   private users: User[] = [];

   public async findById(id: string): Promise<User | undefined> {
      const findId = this.users.find(user => user.id === id);

      return findId;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      const findEmail = this.users.find(user => user.email === email);

      return findEmail;
   }

   public async create({
      email,
      name,
      password,
   }: ICreateUserDTO): Promise<User> {
      const users = new User();

      Object.assign(users, { id: uuid(), email, name, password });

      this.users.push(users);

      return users;
   }

   public async save(user: User): Promise<void> {
      const findIndex = this.users.findIndex(
         findUser => findUser.id === user.id,
      );

      this.users[findIndex] = user;
   }
}

export default UserRepository;
