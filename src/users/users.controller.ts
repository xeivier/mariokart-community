import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createUserSchema } from './dto/create-user.schema';
import type { CreateUserInput } from './dto/create-user.schema';
import { updateUserSchema } from './dto/update-user.schema';
import type { UpdateUserInput } from './dto/update-user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() body: CreateUserInput) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserInput,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}