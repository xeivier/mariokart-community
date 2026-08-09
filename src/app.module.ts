import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { PrismaModule } from './prisma/prisma-db-client.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],

      validate: (config) => {
        const result = envSchema.safeParse(config);

        if (!result.success) {
          console.error('Invalid environment variables:');
          console.error(result.error.format());

          throw new Error('Environment validation failed');
        }

        return result.data;
      },
    }),

    PrismaModule,

    UsersModule,

    AuthModule,
  ],

  controllers: [
    AppController
  ],
})
export class AppModule {}