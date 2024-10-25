import {API} from "./API";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        username: { label: "username", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        console.log("Credentials:", credentials);
        

        if (!credentials?.username || !credentials?.password) {
          console.log("Missing username or password");
          return null;
        }

        const { username, password } = credentials;

        const response = await fetch(`${API}/api/users/login`, {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 401) {
          console.log("Unauthorized:", response.statusText);
          return null;
        }

        const user = await response.json();

        if (!user || !user.data) {
          console.log("User not found or data is missing");
          return null;
        }
        return user.data;
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  
};
