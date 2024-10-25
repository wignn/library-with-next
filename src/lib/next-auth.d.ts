import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    username: string;
    token: string;
    user: {
      name: string;
      email: string;
      image: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      username: string;
      image: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
