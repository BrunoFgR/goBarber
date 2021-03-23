import IEmailProvider from '../models/IEmailProvider';
import ISendMailDTO from '../dtos/ISendEmailDTO';

export default class FakeEmailProvider implements IEmailProvider {
   private messages: ISendMailDTO[] = [];

   public async sendEmail(message: ISendMailDTO): Promise<void> {
      this.messages.push(message);
   }
}
