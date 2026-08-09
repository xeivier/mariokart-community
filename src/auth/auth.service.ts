import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { PrismaDbClient } from '../prisma/prisma-db-client.service';

import type { LoginInput } from './dto/login.schema';
import type { RegisterInput } from './dto/register.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: PrismaDbClient,
        private readonly jwt: JwtService,
    ) { }

    async register(input: RegisterInput) {
        const existingUser = await this.db.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (existingUser) {
            throw new ConflictException('Email is already registered');
        }

        const passwordHash = await argon2.hash(input.password);

        const user = await this.db.user.create({
            data: {
                email: input.email,
                name: input.name,
                passwordHash,
            },
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }

    async login(input: LoginInput) {
        const user = await this.db.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (!user || !user.passwordHash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await argon2.verify(
            user.passwordHash,
            input.password,
        );

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
        });

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}