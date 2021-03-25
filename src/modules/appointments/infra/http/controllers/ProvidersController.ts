import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProviderService';

export default class AppointmentController {
   public async index(request: Request, response: Response): Promise<Response> {
      const user_id = request.user.id;

      const createAppointment = container.resolve(ListProvidersService);

      const providers = await createAppointment.execute({
         user_id,
      });

      return response.json(providers);
   }
}
