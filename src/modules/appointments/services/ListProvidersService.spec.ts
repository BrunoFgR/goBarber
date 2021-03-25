import 'reflect-metadata';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProviderService';

let fakeUsersRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUserRepository();

      listProvidersService = new ListProvidersService(fakeUsersRepository);
   });

   it('Should be able to list the providers', async () => {
      const user1 = await fakeUsersRepository.create({
         email: 'johndoe@example.com',
         name: 'John Doe',
         password: '12345',
      });

      const user2 = await fakeUsersRepository.create({
         email: 'johntre@example.com',
         name: 'John Tre',
         password: '12345',
      });

      const loggedUser = await fakeUsersRepository.create({
         email: 'johnqua@example.com',
         name: 'John Qua',
         password: '12345',
      });

      const showProfile = await listProvidersService.execute({
         user_id: loggedUser.id,
      });

      expect(showProfile).toEqual([user1, user2]);
   });
});
