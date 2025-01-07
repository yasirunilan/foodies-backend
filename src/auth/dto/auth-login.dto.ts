import { PartialType } from '@nestjs/mapped-types';
import { AuthRegisterDto } from './auth-register';

export class AuthLoginDto extends PartialType(AuthRegisterDto) {}
