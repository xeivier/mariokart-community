import {
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { AuthService } from './auth.service';

import {
  loginSchema,
} from './dto/login.schema';

import type {
  LoginInput,
} from './dto/login.schema';

import {
  registerSchema,
} from './dto/register.schema';

import type {
  RegisterInput,
} from './dto/register.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() body: RegisterInput) {
    return this.authService.register(body);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: LoginInput) {
    return this.authService.login(body);
  }
}