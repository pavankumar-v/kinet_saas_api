import { type GetVerificationKey, expressjwt } from 'express-jwt';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import crypto from 'crypto';
import * as jwksRsa from 'jwks-rsa';

// Create middleware for checking the JWT
export const checkJwt = expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }) as GetVerificationKey,

    // Validate the audience and the issuer
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`, // replace with your API's audience, available at Dashboard > APIs
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
});

// verify webhook
export const verifyWebhookEvent = (secret: string): RequestHandler => {
    const sigHeaderName = 'x-signature';
    const sigHashAlg = 'sha256';

    return (req: Request, res: Response, next: NextFunction) => {
        const signature = crypto
            .createHmac(sigHashAlg, secret)
            .update(JSON.stringify(req.body))
            .digest('base64');

        if (!(req.headers[sigHeaderName] === signature)) {
            res.status(401).send('Unauthorized');
        }

        next();
    };
};
