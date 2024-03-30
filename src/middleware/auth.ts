import { type GetVerificationKey, expressjwt } from 'express-jwt';

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
