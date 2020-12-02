import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAutheticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
   try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
         name,
         email,
         password,
      });

      const userWithoutPassword = {
         id: user.id,
         name: user.name,
         email: user.email,
         created_at: user.created_at,
         updated_at: user.updated_at,
      };

      return response.json(userWithoutPassword);
   } catch (err) {
      return response.status(400).json({ message: err.message });
   }
});

usersRouter.patch(
   '/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   async (request, response) => {
      try {
         const updateUserAvatar = new UpdateUserAvatarService();

         const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
         });

         return response.json(user);
      } catch (err) {
         return response.status(400).json({ error: err.message });
      }
   },
);

export default usersRouter;
