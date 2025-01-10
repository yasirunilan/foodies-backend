import {
  Controller,
  Patch,
  UseGuards,
  Request,
  Body,
  Get,
  UsePipes,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserUpdateRequest } from './dto/userUpdateRequest.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { FileUploadSignedUrlResponseDto } from 'src/common/dto/fileUploadSignedUrlResponse';
import { FileUploadSignedUrlRequestDto } from 'src/common/dto/fileUploadSignedUrlRequest';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { fileUploadSignedUrlRequestSchema } from './validation/fileUploadSignedUrlRequest.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @Request() req: any,
    @Body() updatePayload: UserUpdateRequest,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(req.user.username, updatePayload);
  }

  @Post('/me/profile-picture')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(fileUploadSignedUrlRequestSchema))
  async getProfilePictureUploadUrl(
    @Body() payload: FileUploadSignedUrlRequestDto,
  ): Promise<FileUploadSignedUrlResponseDto> {
    return await this.userService.getProfilePictureUploadUrl(payload);
  }
}
