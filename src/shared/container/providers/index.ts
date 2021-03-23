import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IEmailProvider from './mailProvider/models/IEmailProvider';
import EmailProvider from './mailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
   'StorageProvider',
   DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
   'MailTemplateProvider',
   HandlebarsMailTemplateProvider,
);

container.registerInstance<IEmailProvider>(
   'MailProvider',
   container.resolve(EmailProvider),
);
