import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
    url: process.env.BETTER_AUTH_URL!,
    secret: process.env.BETTER_AUTH_SECRET!,
}));
