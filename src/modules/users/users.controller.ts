import {Controller, Get, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard, Session, type UserSession} from "@thallesp/nestjs-better-auth";

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@Session() session: UserSession) {
    return { user: session.user };
  }
}
