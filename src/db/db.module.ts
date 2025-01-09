import { Module } from '@nestjs/common';
import { dynamoDBProvider } from './dynamodb.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [dynamoDBProvider],
  exports: [dynamoDBProvider],
})
export class DBModule {}
