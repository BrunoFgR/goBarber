import IParseEmailTemplateDTO from '../../mailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContent {
   name: string;
   email: string;
}

export default interface ISendEmailDTO {
   to: IMailContent;
   from?: IMailContent;
   subject: string;
   templateData: IParseEmailTemplateDTO;
}
