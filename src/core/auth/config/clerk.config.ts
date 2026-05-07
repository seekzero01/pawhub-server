import { registerAs } from "@nestjs/config";

export default registerAs("clerk", () => ({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    authorizedParties: process.env.CLERK_AUTHORIZED_PARTIES,
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
}));