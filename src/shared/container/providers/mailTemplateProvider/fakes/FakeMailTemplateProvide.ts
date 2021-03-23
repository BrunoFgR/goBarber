import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
   public async parseTemplate({
      templates,
   }: IParseMailTemplateDTO): Promise<string> {
      return templates;
   }
}

export default FakeMailTemplateProvider;
