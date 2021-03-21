import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IEmailProvider from './mailProvider/models/IEmailProvider';
import EmailProvider from './mailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
   'StorageProvider',
   DiskStorageProvider,
);

container.registerInstance<IEmailProvider>('MailProvider', new EmailProvider());
