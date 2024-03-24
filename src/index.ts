import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { checkJwt } from './middleware/auth'

const env = process.env.NODE_ENV ?? 'development'
dotenv.config({ path: `.env.${env}` })
dotenv.config({ path: '.env' })

const app: Express = express()
// Enable CORS
app.use(cors())

// Enable the use of request body parsing middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// create timesheets API endpoint - code omitted
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/protected', checkJwt, function (req, res) {
  // Save the timesheet to the database...

  // send the response
  res.status(201).send('hello')
})

app.get('/', (req: Request, res: Response) => {
  res.send('Running')
})

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
