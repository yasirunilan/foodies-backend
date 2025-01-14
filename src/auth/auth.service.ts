import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    if (await bcrypt.compare(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
    });
    await this.usersService.updateUser(user.email, {
      refreshTokens: user.refreshTokens
        ? [...user.refreshTokens, refreshToken]
        : [refreshToken],
    });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const { username: email } = this.jwtService.verify(refreshToken);
    const user = await this.usersService.findOne(email);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const payload = { username: user.email };
    const newAccessToken = await this.jwtService.signAsync(payload);
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
    });

    const updatedTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken,
    );
    await this.usersService.updateUser(user.email, {
      refreshTokens: user.refreshTokens
        ? [...updatedTokens, newRefreshToken]
        : [refreshToken],
    });
    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async logout(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return await this.usersService.updateUser(user.email, {
      refreshTokens: [],
    });
  }
}
