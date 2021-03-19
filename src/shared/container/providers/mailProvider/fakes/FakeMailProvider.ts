import IEmailProvider from '../models/IEmailProvider';

interface IMessages {
   to: string;
   body: string;
}

export default class FakeEmailProvider implements IEmailProvider {
   private messages: IMessages[] = [];

   public async sendEmail(to: string, body: string): Promise<void> {
      this.messages.push({
         to,
         body,
      });
   }
}
