import { Global, Module } from '@nestjs/common';

import { PrismaDbClient } from './prisma-db-client.service';

@Global()
@Module({
  providers: [PrismaDbClient],
  exports: [PrismaDbClient],
})
export class PrismaModule {}