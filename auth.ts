/* eslint-disable */
import NextAuth, { Session, User } from "next-auth";
import auth_config from "./auth_config";
import { createUser, getSessionUser, isExistingUser } from "@/server-functions/user";
import { IUser } from "@/modals/user.model";

declare module 'next-auth' {
  interface Session {
    user: IUser & { emailVerified?: Date },
    token: IUser
  }

  interface User extends IUser {
    emailVerified?: Date;
  }

  interface JWT extends IUser {
    emailVerified?: Date;

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
      const existingUser = await isExistingUser(user.email);
      if (!existingUser && user.email && user.name) {

        const newUser = await createUser({
          email: user.email,
          name: user.name,
          image: user.image || "",
        });
        user.image = newUser.image;
        user._id = newUser._id;
        user.username = newUser.username;
        user.role = newUser.role;
        user.userId = newUser.userId;
        
      } else if (existingUser) {
        user._id = existingUser._id;
        user.username = existingUser.username;
        user.role = existingUser.role;
        user.userId = existingUser.userId;
        user.image = existingUser.image;
        user.about = existingUser.about;
        user.phone = existingUser.phone;
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        const sessionUser = await getSessionUser()
        if (!sessionUser) {
          return token;
        }
        const existingUser = await isExistingUser(sessionUser.email);

        if (existingUser) {
          token._id = existingUser._id;
          token.userId = existingUser.userId;
          token.username = existingUser.username;
          token.email = existingUser.email;
          token.role = existingUser.role;
          token.image = existingUser.image;
          token.about = existingUser.about;
          token.phone = existingUser.phone;
        }
      }

      if (user) {
        token._id = user._id || "";
        token.userId = user.userId || "";
        token.username = user.username || "";
        token.email = user.email || "";
        token.role = user.role || "student";
        token.image = user.image || "";
        token.about = user.about || "";
        token.phone = user.phone || "";
      }

      return token;
    },
    // Disable type checking issues here
    async session({ session, token }) {
      if (session?.user) {
        (session.user as Partial<User>) = {
          _id: token._id,
          name: token.name,
          userId: token.userId,
          username: token.username,
          email: token.email,
          role: token.role as "student",
          image: token.image,
          about: token.about,
          phone: token.phone,
          emailVerified: new Date(), // Assuming emailVerified is always set
        } as Partial<User>;
      }

      return session as Session; // Ensure we always return session
    }

  },

  ...auth_config,
});
/* eslint-enable */