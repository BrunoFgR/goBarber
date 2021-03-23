import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import ISendMailDTO from '../dtos/ISendEmailDTO';
import IEmailProvider from '../models/IEmailProvider';

import IMailTemplateProvider from '../../mailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealEmailProvider implements IEmailProvider {
   private client: Transporter;

   constructor(
      @inject('MailTemplateProvider')
      private mailTemplateProvider: IMailTemplateProvider,
   ) {
      nodemailer.createTestAccount().then(account => {
         const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
               user: account.user,
               pass: account.pass,
            },
         });

         this.client = transporter;
      });
   }

   public async sendEmail({
      to,
      subject,
      from,
      templateData,
   }: ISendMailDTO): Promise<void> {
      const message = await this.client.sendMail({
         from: {
            name: from?.name || 'Equipe GoBarber',
            address: from?.email || 'equipe@gobarber.com.br',
         },
         to: {
            name: to.name,
            address: to.email,
         },
         subject,
         html: await this.mailTemplateProvider.parseTemplate(templateData),
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
   }
}
