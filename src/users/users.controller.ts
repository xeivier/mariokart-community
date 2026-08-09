import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
    CurrentUser,
} from '../common/decorators/current-user.decorator';
import type {
    AuthenticatedUser,
} from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { createUserSchema } from './dto/create-user.schema';
import type { CreateUserInput } from './dto/create-user.schema';
import { updateUserSchema } from './dto/update-user.schema';
import type { UpdateUserInput } from './dto/update-user.schema';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get('me')
    getMe(@CurrentUser() user: AuthenticatedUser) {
        return user;
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }

    @Patch('me')
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    updateMe(
        @CurrentUser() user: AuthenticatedUser,
        @Body() body: UpdateUserInput,
    ) {
        return this.usersService.update(user.id, body);
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