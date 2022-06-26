import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

// it is configuring the NextAuth
export default NextAuth({
  providers: [
    // we are using the CredentialsProvider from NextAuth to make custom authentication
    CredentialsProvider({
      name: 'aws-cognito-with-nextauth-using-nextjs',
      credentials: {
        username: {
          label: 'username',
          type: 'username',
          placeholder: ''
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: ''
        }
      },
      // when the user click on sign-in button from sign-in page then this function will be invoked and it will return the response like the user is authenticated successfully or not
      async authorize(credentials, req) {
        const payload: any = {
          username: credentials?.username,
          password: credentials?.password,
        };
        const response = await fetch(`http://localhost:${process.env.BACKEND_PORT}/api/auth/sign-in`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if (response.status == 200) {
          return data;
        } else {
          throw new Error(data);
        }
      },
    })
  ],
  // this custom page will be used to show to the user for signing with their credentials
  pages: {
    signIn: '/sign-in',
  },
  jwt: {
    // this secret key will be used to encrypt/ decrypt token
    secret: process.env.JWT_SECRET
  },
  // this will be invoked after getting successfull response from the authorize function and this will be used to return the custom session and token objects
  callbacks: {
    async session({ session, token }: any) {
      session.token = token;
      delete session.user;
      return session;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.user = {
          username: user.userData.Username,
          attributes: user.userData.UserAttributes
        };
        token.accessToken = user.auth.AccessToken;
        token.refreshToken = user.auth.RefreshToken;
      }
      return token;
    }
  },
  debug: false
});