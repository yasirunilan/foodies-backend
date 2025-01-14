import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'dynamoose/dist/Model';
import { Post } from './interfaces/post.interface';
import { CreatePostRequestDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(@Inject('POST_MODEL') private postModel: Model<Post>) {}

  async createPost(
    loggedInUser: string,
    payload: CreatePostRequestDto,
  ): Promise<Post | undefined> {
    return await this.postModel.create({
      ...payload,
      ...{ author: loggedInUser },
    });
  }
}
