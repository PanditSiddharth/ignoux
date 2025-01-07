import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { NextAuthConfig } from "next-auth";

export default { 
    cookies:
    {
        sessionToken: {
            name: "authjs.session-token-86768",
            options: {
                sameSite: "lax",
                path: "/",
                secure: true,
                domain:  process.env.NODE_ENV === "production" ? ".ignoux.in" : undefined,
            }
        }
    },
    providers: [Google,Github]} satisfies NextAuthConfig

