import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import "dotenv/config.js"
import {emailOTP, haveIBeenPwned} from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: ["http://localhost:3000","http://localhost:3001"],
    advanced: { disableOriginCheck: true },
    emailAndPassword: { enabled: true, minPasswordLength: 12, autoSignIn: true, requireEmailVerification: false },
    emailVerification: {
        sendOnSignUp: false,
    },
    plugins: [
        haveIBeenPwned()
    ]
});