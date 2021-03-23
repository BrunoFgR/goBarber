import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
   public async parseTemplate(): Promise<string> {
      return 'Meu template';
   }
}

export default FakeMailTemplateProvider;
