import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";

const jwksRsa = require("jwks-rsa");

dotenv.config();

const app: Express = express();
// Enable CORS
app.use(cors());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://kinet-dev1024.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "https://kinet-dev1024.us.auth0.com/api/v2/", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://kinet-dev1024.us.auth0.com/",
  algorithms: ["RS256"],
});


// create timesheets API endpoint - code omitted
app.get('/protected', checkJwt, function(req, res){

  // Save the timesheet to the database...

  //send the response
  res.status(201).send("hello");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Running");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
