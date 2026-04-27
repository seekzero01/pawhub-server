import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { passportJwtSecret } from 'jwks-rsa'

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 10,
                jwksUri: `${process.env.CLERK_DOMAIN}/.well-known/jwks.json`,
            }),
            algorithms: ['RS256'],
        })
    }

    // Whatever you return here is attached to req.user
    async validate(payload: { sub: string; [key: string]: unknown }) {
        return { userId: payload.sub, ...payload }
    }
}