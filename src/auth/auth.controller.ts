import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  UsePipes,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { authRegisterSchema } from './validation/auth-register.schema';
import { authLoginSchema } from './validation/auth-login.schema';
import { AuthLoginDto } from './dto/auth-login.dto';
import { authRefreshTokenSchema } from './validation/auth-refresh-token.schema';
import { AuthRefreshTokenDto } from './dto/auth-refresh-token.dto';
import { UserResponseDto } from 'src/user/dto/userResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(authLoginSchema))
  async login(@Body() authLoginDto: AuthLoginDto) {
    const user = await this.authService.validateUser(
      authLoginDto.email,
      authLoginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<UserResponseDto | undefined> {
    const user = await this.userService.findOne(req.user.username);
    return this.userService.sanitizeUser(user);
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(authRegisterSchema))
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this.userService.createUser(authRegisterDto);
  }

  @Post('refresh-token')
  @UsePipes(new JoiValidationPipe(authRefreshTokenSchema))
  async refreshToken(@Body() authRefreshTokenDto: AuthRefreshTokenDto) {
    return await this.authService.refreshToken(
      authRefreshTokenDto.refreshToken,
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: any) {
    return await this.authService.logout(req.user.username);
  }
}
