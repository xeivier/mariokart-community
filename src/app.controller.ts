import { Controller, Get } from '@nestjs/common';

import { PrismaDbClient } from './prisma/prisma-db-client.service'

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaDbClient) {}

  @Get()
  async getStatus() {
    const userCount = await this.prisma.user.count();

    return {
      status: 'ok',
      database: 'connected',
      users: userCount,
    };
  }
}