import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { dynamodbProvider } from '../config/dynamodb.config';
// import configuration from '../config/configuration';

@Module({
  providers: [dynamodbProvider],
  exports: ['DYNAMODB'],
})
export class DynamoDBModule {}
