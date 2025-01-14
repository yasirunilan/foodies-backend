import { ConfigService } from '@nestjs/config';
import { createPostModel } from './models/post.model';

export const postProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (configService: ConfigService) => {
      return createPostModel(configService);
    },
    inject: [ConfigService, 'DB_CONNECTION'],
  },
];
