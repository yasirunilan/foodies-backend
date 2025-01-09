import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';
import * as bcrypt from 'bcrypt';

const userSchema = new dynamoose.Schema(
  {
    email: {
      type: String,
      required: true,
      hashKey: true,
      set: (value: string) => {
        return value.toLowerCase();
      },
    },
    password: {
      type: String,
      required: true,
      set: async (value: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
      },
    },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String },
    refreshTokens: {
      type: Array,
      schema: [String],
      required: false,
    },
  },
  { timestamps: true },
);

export const createUserModel = (configService: ConfigService) => {
  const tablePrefix = configService.get<string>('aws.dynamodb.tablePrefixes');
  return dynamoose.model('User', userSchema, {
    prefix: tablePrefix,
  });
};
