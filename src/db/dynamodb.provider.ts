import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';

export const dynamoDBProvider = {
  provide: 'DB_CONNECTION',
  useFactory: async (configService: ConfigService) => {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: configService.get<string>('aws.accessKeyId'),
        secretAccessKey: configService.get<string>('aws.secretAccessKey'),
      },
      region: configService.get<string>('aws.region'),
    });

    dynamoose.aws.ddb.set(ddb);
    return dynamoose;
  },
  inject: [ConfigService],
};
