import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';

export const dynamodbProvider = {
  provide: 'DYNAMODB',
  useFactory: async (configService: ConfigService) => {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: configService.get<string>('aws.accessKeyId'),
        secretAccessKey: configService.get<string>('aws.secretAccessKey'),
      },
      region: configService.get<string>('aws.region'),
      ...(configService.get('aws.endpoint') && {
        endpoint: configService.get<string>('aws.endpoint'),
      }),
    });

    dynamoose.aws.ddb.set(ddb);
    return dynamoose;
  },
  inject: [ConfigService],
};
