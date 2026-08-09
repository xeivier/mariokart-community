import { Injectable } from '@nestjs/common';

import { PrismaDbClient } from '../prisma/prisma-db-client.service';
import { CreateUserInput } from './dto/create-user.schema';
import { UpdateUserInput } from './dto/update-user.schema';

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

  async create(data: CreateUserInput) {
    return this.db.user.create({
      data,
    });
  }

  async update(id: number, data: UpdateUserInput) {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.db.user.delete({
      where: { id },
    });
  }
}