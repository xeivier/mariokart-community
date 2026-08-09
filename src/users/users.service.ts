import { Injectable } from '@nestjs/common';

import { PrismaDbClient } from './../prisma/prisma-db-client.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaDbClient) {}

  async findAll() {
    return this.db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async create(dto: CreateUserDto) {
    return this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.db.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.db.user.delete({
      where: { id },
    });
  }
}