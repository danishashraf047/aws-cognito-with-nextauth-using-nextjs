import { CognitoIdentityServiceProvider, config } from "aws-sdk";

// it configures the aws-sdk with given values below
config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
} as any);

// it makes the instance of CognitoIdentityServiceProvider and the instance can be used on everywhere
const cognitoClient = new CognitoIdentityServiceProvider();

export { cognitoClient };