import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import {DbUser} from "../modules/users/types/users.types";

export const CurrentUser = createParamDecorator(
    (property: keyof DbUser | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<Request & { user: DbUser }>();
        const user = request.user;
        return property ? user?.[property] : user;
    },
);