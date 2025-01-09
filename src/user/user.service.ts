import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from 'src/auth/dto/auth-register';
import { Model } from 'dynamoose/dist/Model';
import { User } from './interfaces/user.interface';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

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

  async updateUser(email: string, updateData: Partial<User>): Promise<User> {
    return await this.userModel.update({ email }, updateData);
  }

  sanitizeUser(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshTokens, ...result } = user;
    return result;
  }

  sanitizeUsers(users: User[]): UserResponseDto[] {
    return users.map((user) => this.sanitizeUser(user));
  }
}
