import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
      idToken:string
      accessToken?: string;
      error?: string
  
    } 
  }


  declare module "next-auth/jwt" {
    interface JWT {
      idToken: string | undefined
      accessToken: string | undefined
      expiresAt: number | undefined
      refreshToken: string | undefined
      error?: string
    }
  }