import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
// var jwt = require('jsonwebtoken');

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
          placeholder: '',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      // when the user click on sign-in button from sign-in page then this function will be invoked
      // it will return the response like the user is authenticated successfully or not
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
          // return data.auth.AccessToken;
          return data;
        } else {
          throw new Error(data);
        }
      },
    }),
    // ...add more providers here
  ],
  // this custom page will be used to show to the user for signing with their credentials
  pages: {
    signIn: '/sign-in',
  },
  jwt: {
    // this secret key will be used to encrypt/ decrypt token
    secret: process.env.JWT_SECRET,
    // async encode({ token, secret, maxAge }: any) {
    //   // console.log("encode");
    //   // console.log("token", token);
    //   // console.log("secret", secret);
    //   // return token;
    //   const jwtClaims = {
    //     sub: token.username,
    //     name: token.username,
    //     iat: Date.now() / 1000,
    //     exp: Math.floor(Date.now() / 1000) + 3600,
    //     user: {
    //       // token: token.user.auth,
    //       data: token.user.userData
    //     },
    //   }
    //   const encodedToken = jwt.sign(jwtClaims, secret, {
    //     algorithm: 'HS512',
    //   })
    //   // console.log(`Encoded Token: ${JSON.stringify(encodedToken)}`);
    //   return encodedToken;
    // },
    // async decode({ token, secret }) {
    //   // console.log("decode");
    //   // return {};
    //   const decodedToken = jwt.verify(token, secret, {
    //     algorithms: ['HS512'],
    //   })
    //   // console.log(`Decoded Token: ${JSON.stringify(decodedToken)}`)
    //   return decodedToken;
    // },
  },
  // this will be invoked after getting successfull response from the authorize function and this will be used to return the custom session and token objects
  callbacks: {
    async session({ session, token }: any) {
      // console.log("session");
      // console.log("session", session);
      // console.log("token", token);
      session.token = token;
      delete session.user;
      // console.log("session", session);
      return session;
    },
    async jwt({ token, user, account }: any) {
      // console.log("jwt");
      if (user) {
        token.user = {
          username: user.userData.Username,
          attributes: user.userData.UserAttributes
        };
        token.accessToken = user.auth.AccessToken;
        token.refreshToken = user.auth.RefreshToken;
        // token.user = user;
        // token.account = account;
      }
      // console.log("token", token);
      // console.log("user", user);
      // console.log("account", account);
      return token;
    }
  },
  // it will use if we don't use the custom sign-in page
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // debug: process.env.NODE_ENV === 'development',
  debug: false
});