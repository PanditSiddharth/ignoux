/* eslint-disable */
import NextAuth, { Session } from "next-auth";
import auth_config from "./auth_config";
import { createUser, getSessionUser, checkExistingUser } from "@/server-functions/user";
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
  session:{
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) {
        return false;
      }
      const existingUser = await checkExistingUser(user.email);
      if (!existingUser && user.name) {
        const newUser = await createUser({
          email: user.email,
          name: user.name,
          image: user.image || "",
        });
        if (typeof newUser != "boolean")
        user = {...user, ...userFilter(newUser)};

      } else if (existingUser) {
        user = {...user, ...userFilter(existingUser)};
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        const sessionUser = await getSessionUser()
        if (!sessionUser) 
          return token;
        
        const existingUser = await checkExistingUser(sessionUser.email);
        if (existingUser) 
          return userFilter(existingUser);
      }

      if (user) 
        return userFilter(user);
      return token;
    },
    // Disable type checking issues here
    async session({ session, token }) {
      if (session?.user) {
        session.user = {...session.user, ...userFilter(token)}
      }
      return session as Session; // Ensure we always return session
    }
  },
  ...auth_config,
});
/* eslint-enable */