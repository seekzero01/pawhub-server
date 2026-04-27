import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ClerkToken = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | null => {
        const request = ctx.switchToHttp().getRequest<{ headers: Record<string, string> }>()
        const authHeader = request.headers['authorization']
        return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    },
)