import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

const postSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      index: {
        type: 'global',
        name: 'AuthorIndex',
      },
    },
    pictureKeys: {
      type: Array,
      schema: [String],
      required: false,
    },
    location: {
      type: Object,
      schema: {
        name: {
          type: String,
          required: true,
        },
        latitude: {
          type: Number,
          required: false,
        },
        longitude: {
          type: Number,
          required: false,
        },
      },
      required: false,
    },
  },
  { timestamps: true },
);

export const createPostModel = (configService: ConfigService) => {
  const tablePrefix = configService.get<string>('aws.dynamodb.tablePrefixes');
  return dynamoose.model('Post', postSchema, {
    prefix: tablePrefix,
  });
};
