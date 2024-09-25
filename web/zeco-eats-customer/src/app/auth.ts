
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak"

/**
 * 
 * @param token: the current token
 * this function uses the refectch token of the current token to get a new token
 * 
 */
function requestRefreshOfAccessToken(token: JWT) {

  return fetch(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },

    body: new URLSearchParams({
      client_id: process.env.AUTH_KEYCLOAK_ID!,
      client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),

    method: "POST",
    cache: "no-store"
  });
}




 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // auth js automatically picks the client id, secret, issuer from the env file if you dont pass them manually here
  providers: [
    Keycloak({
        clientId: process.env.AUTH_KEYCLOAK_ID,
        clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
        issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    })
  ],


  /**
   * default session strategy is jwt
  */
  session:{
    // Seconds - How long until an idle session expires and is no longer valid. i gave thesame value as on th authoriation server
    maxAge: 30 * 24 * 60 * 60, // 30 days- the default
  },




  callbacks:{
    

    /**
     * This jwt callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client e.g    * using useSession()). The returned value will be encrypted, and it is stored in a cookie.
     * 
     * The arguments account is only passed the first time this callback is called on a new session, after the user signs in.  In subsequent calls, only token will be available.
     */
    async jwt({ token, account }) {

      if (account) {

        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        

        return token;

      }

      //t allows the token to be considered valid if it has more than 60 seconds remaining before expiration.
      if (token.expiresAt && Date.now() < token.expiresAt * 1000 - 60 * 1000) {
        return token

      } else{
          try {

              
          const res = await requestRefreshOfAccessToken(token)
          const resData = await res.json()

          //according to https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokenResponse, a succesfull response to the authentication server needs to come back with an "access_token"
          if (!res.ok) throw resData


          const updatedToken: JWT = {
              ...token, // Keep the previous token properties and update this ones
              idToken: resData.id_token,
              accessToken: resData.access_token,
              expiresAt: Math.floor(Date.now() / 1000 + (resData.expires_in as number)),
              refreshToken: resData.refresh_token ?? token.refreshToken,
          }

          return updatedToken;

          } catch (error) {
              console.error("Error refreshing access token", error)
              // The error property can be used client-side to handle the refresh token error
              return { ...token, error: "RefreshAccessTokenError"  }
          }
      }

    },



    /**
     * The session callback is called whenever a session is checked and only after the jwt callback above has been called
     * The token passed to this method is the token returned from the jwt callback
     */

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.idToken = token.idToken! 
    

      //check the expiredTokenCheck.tsx component to see the use of this line
      if(token.error){
        session.error = token.error
      }
      
      return session
    }


  }



})

