import { registerAs } from "@nestjs/config";

export default registerAs("clerk", () => ({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    domain: process.env.CLERK_DOMAIN_DEV,
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
}));