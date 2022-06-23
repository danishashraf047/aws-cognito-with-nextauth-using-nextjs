import { CognitoIdentityServiceProvider, config } from "aws-sdk";

config.update({ region: process.env.REGION });
const cognitoClient = new CognitoIdentityServiceProvider();

export { cognitoClient };