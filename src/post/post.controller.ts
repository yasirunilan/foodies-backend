import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
} from './dto/createPost.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { createPostRequestSchema } from './validation/createPostRequest.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createPostRequestSchema))
  async getProfilePictureUploadUrl(
    @Body() payload: CreatePostRequestDto,
    @Request() req: any,
  ): Promise<CreatePostResponseDto> {
    return await this.postService.createPost(req.user.username, payload);
  }
}
