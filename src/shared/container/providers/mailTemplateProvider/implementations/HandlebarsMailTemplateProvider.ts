import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
   public async parseTemplate({
      templates,
      variables,
   }: IParseMailTemplateDTO): Promise<string> {
      const parseTemplate = handlebars.compile(templates);

      return parseTemplate(variables);
   }
}

export default HandlebarsMailTemplateProvider;
