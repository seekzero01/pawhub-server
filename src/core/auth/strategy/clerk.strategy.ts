import { User, verifyToken } from '@clerk/backend';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import {UsersService} from "../../../modules/users/users.service";
import {DbUser} from "../../../modules/users/types/users.types";

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    async validate(req: Request): Promise<DbUser> {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const raw = this.configService.getOrThrow<string>('clerk.authorizedParties');
        const authorizedParties = raw.split(',').map((p) => p.trim());

        try {
            const tokenPayload = await verifyToken(token, {
                secretKey: this.configService.get('clerk.secretKey'),
                authorizedParties
            });

            console.log(tokenPayload);

            return await this.usersService.getUser(tokenPayload.sub);
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException('Invalid token');
        }
    }
}