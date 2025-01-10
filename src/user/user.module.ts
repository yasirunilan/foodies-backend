import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DBModule } from 'src/db/db.module';
import { S3Service } from 'src/common/utils/s3.service';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, S3Service],
  exports: [UserService],
})
export class UserModule {}
