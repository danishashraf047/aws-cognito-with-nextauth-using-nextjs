import type { NextApiRequest, NextApiResponse } from 'next'
import { cognitoClient } from '../core/cognito-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const userCredentials = {
      username: req.body.username,
      password: req.body.password
    };
    const params: any = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: userCredentials.username,
        PASSWORD: userCredentials.password
      }
    };
    const authResult = await cognitoClient.adminInitiateAuth(params).promise();
    const userDataResult = await cognitoClient.adminGetUser({ Username: userCredentials.username, UserPoolId: process.env.USER_POOL_ID } as any).promise();
    const result = { auth: authResult.AuthenticationResult, userData: userDataResult };
    res.status(200).json(result as any);
  }
  catch (error: any) {
    const message = error.message ? error.message : 'Internal server error';
    res.status(500).json(message);
  }
}
