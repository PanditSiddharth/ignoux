import NextAuth, { Session } from "next-auth";
import auth_config from "./auth_config";
import { createUser, checkExistingUser } from "@/server-functions/user";
import { IUser } from "@/modals/user.model";
import { userFilter } from "./helpers";

declare module 'next-auth' {
  interface Session {
    user: IUser,
    token: IUser
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) {
        return false;
      }
      const existingUser = await checkExistingUser(user.email);

      if (!existingUser && user.name) {
        await createUser({
          email: user.email,
          name: user.name,
          image: user.image || "",
        });
      }

      return true;
    },

    async jwt({ token, trigger, session, user }) {
      if (trigger === "signIn") {
        const existingUser = await checkExistingUser(user.email!);
        if (typeof existingUser === "object")
          return { ...token, ...existingUser }
      }
      if (trigger === 'update' && session?.user)
        return { ...token, ...userFilter(session.user) };

      return token;
    },
    // Disable type checking issues here
    async session({ session, token }) {
      if (session?.user) 
        session.user = { ...session.user, ...userFilter(token) }
      return session as Session; // Ensure we always return session
    }
  },  
  ...auth_config,
});