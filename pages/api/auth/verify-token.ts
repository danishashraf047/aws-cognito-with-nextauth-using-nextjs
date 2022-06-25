import type { NextApiRequest, NextApiResponse } from 'next'
import { CognitoJwtVerifier } from "aws-jwt-verify";

// it's not using now
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const token = req.body.token;
    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.USER_POOL_ID,
        tokenUse: "access",
        clientId: process.env.COGNITO_CLIENT_ID,
    } as any);
    try {
        const payload: any = await verifier.verify(token, { clientId: process.env.COGNITO_CLIENT_ID } as any);
        res.status(200).json(payload);
    } catch {
        console.log("Token not valid!");
        res.status(401).json("Token not valid!" as any);
    }
}
