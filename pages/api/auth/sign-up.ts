import type { NextApiRequest, NextApiResponse } from 'next'
import { cognitoClient } from '../core/cognito-client';

// this api will be used to create users like admin,teacher and students
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const userCredetials = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      role: req.body.role
    };
    const params: any = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userCredetials.username,
      UserAttributes: [{
        Name: 'custom:firstname',
        Value: userCredetials.firstname
      }, {
        Name: 'custom:lastname',
        Value: userCredetials.lastname
      }, {
        Name: 'custom:phone',
        Value: userCredetials.phone
      }, {
        Name: 'custom:role',
        Value: userCredetials.role
      }],
      MessageAction: 'SUPPRESS'
    };
    console.log(params);
    const response = await cognitoClient.adminCreateUser(params).promise();
    if (response.User) {
      const paramsForSetPass: any = {
        Password: userCredetials.password,
        UserPoolId: process.env.USER_POOL_ID,
        Username: userCredetials.username,
        Permanent: true
      };
      await cognitoClient.adminSetUserPassword(paramsForSetPass).promise();
    }
    return res.status(200).json('User registration successful');
  }
  catch (error: any) {
    const message = error.message ? error.message : 'Internal server error';
    res.status(500).json(message);
  }
}
