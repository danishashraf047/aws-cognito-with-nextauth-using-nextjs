import NextAuth from 'next-auth'
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as any,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as any,
      issuer: process.env.COGNITO_ISSUER
    })
  ],
  pages: {
    // signIn: "/sign-in"
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      session.token = token;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("ACCOUNT", account);
      // console.log("PROFILE", profile);
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        return false
      }
    }
  },
  debug: process.env.NODE_ENV === 'development' ? true : false
})

// console.log({
//   clientId: process.env.COGNITO_CLIENT_ID as any,
//   clientSecret: process.env.COGNITO_CLIENT_SECRET as any,
//   issuer: process.env.COGNITO_ISSUER
// })