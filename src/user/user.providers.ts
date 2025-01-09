import { ConfigService } from '@nestjs/config';
import { createUserModel } from './models/user.model';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (configService: ConfigService) => {
      return createUserModel(configService);
    },
    inject: [ConfigService, 'DB_CONNECTION'],
  },
];
