import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from 'src/auth/dto/auth-register';
import { Model } from 'dynamoose/dist/Model';
import { User } from './interfaces/user.interface';
import { UserResponseDto } from './dto/userResponse.dto';
import { S3Service } from 'src/common/utils/s3.service';
import { FileUploadSignedUrlResponseDto } from 'src/common/dto/fileUploadSignedUrlResponse';
import { ConfigService } from '@nestjs/config';
import { FileUploadSignedUrlRequestDto } from 'src/common/dto/fileUploadSignedUrlRequest';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private readonly s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.get(email);
  }

  async createUser(
    authRegisterDto: AuthRegisterDto,
  ): Promise<User | undefined> {
    const existingUser = await this.findOne(authRegisterDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.userModel.create(authRegisterDto);
  }

  async updateUser(
    email: string,
    updateData: Partial<User>,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.userModel.update({ email }, updateData);
    return this.sanitizeUser(updatedUser);
  }

  sanitizeUser(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshTokens, ...result } = user;
    return result;
  }

  sanitizeUsers(users: User[]): UserResponseDto[] {
    return users.map((user) => this.sanitizeUser(user));
  }

  async getProfilePictureUploadUrl(
    payload: FileUploadSignedUrlRequestDto,
  ): Promise<FileUploadSignedUrlResponseDto> {
    const key = `${payload.key}-${uuidv4()}.${payload.fileType}`;

    return await this.s3Service.getFileSignedUrl(
      this.configService.get<string>('aws.s3.profilePictureBucket'),
      key,
    );
  }
}
