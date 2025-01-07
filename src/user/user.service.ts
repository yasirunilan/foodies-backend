import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from './models/user.model';
import { AuthRegisterDto } from 'src/auth/dto/auth-register';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  async createUser(authRegisterDto: AuthRegisterDto) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    const user = new UserModel(authRegisterDto);
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    console.log(user)
    return await user.save();
  }

  // async findUserById(id: string) {
  //   return await UserModel.get(id);
  // }

  // async findUserByEmail(email: string) {
  //   const results = await UserModel.scan('email').eq(email).exec();
  //   return results[0];
  // }

  private readonly users = [
    {
      userId: 1,
      email: 'john@test1.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@test1.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
