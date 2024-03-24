import { type GetVerificationKey, expressjwt } from 'express-jwt';

import * as jwksRsa from 'jwks-rsa';

// Create middleware for checking the JWT
export const checkJwt = expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://kinet-dev1024.us.auth0.com/.well-known/jwks.json',
    }) as GetVerificationKey,

    // Validate the audience and the issuer
    audience: 'https://kinet-dev1024.us.auth0.com/api/v2/', // replace with your API's audience, available at Dashboard > APIs
    issuer: 'https://kinet-dev1024.us.auth0.com/',
    algorithms: ['RS256'],
});
