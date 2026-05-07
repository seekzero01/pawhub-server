import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import {ClerkStrategy} from "./strategy/clerk.strategy";
import {ClerkAuthGuard} from "./guard/clerk-auth.guard";
import {UsersModule} from "../../modules/users/users.module";

@Module({
    imports: [PassportModule.register({ defaultStrategy: "clerk" }), UsersModule],
    providers: [ClerkStrategy, ClerkAuthGuard],
    exports: [ClerkAuthGuard],
})
export class AuthModule {}