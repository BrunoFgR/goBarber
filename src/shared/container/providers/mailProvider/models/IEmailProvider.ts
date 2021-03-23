import ISendMailDTO from '../dtos/ISendEmailDTO';

export default interface IEmailProvider {
   sendEmail(data: ISendMailDTO): Promise<void>;
}
