import 'reflect-metadata'
import 'dotenv/config'
// import '../../container'

import express, { Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '@config/swagger/swagger_output.json'
import routes from './routes'
import AppError from '@shared/errors/appErrors'
import timeout from 'connect-timeout'

const app = express()
// CORS Middleware
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
// End CORS

const error404 = path.resolve(__dirname, '..', '..', '..', '..', 'www', '404')

const pageTest = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'coverage',
  'lcov-report'
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(timeout('20s'))
app.use('/404', express.static(error404))
app.use('/tests', express.static(pageTest))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// LOGs Middleware
app.use(morgan(':method :url :response-time'))

// Routes

app.use('/api/v1', routes)
app.get('*', (req, res) => res.redirect('/404'))

// Erros
app.use((error: AppError, req: Request, res: Response, next: any) => {
  if (!req.timedout) {
    next()
  } else {
    res.status(error?.statusCode ? error?.statusCode : 500).json({
      error: 'Time-out, servidor sem resposta',
      status: error?.statusCode
    })
  }
  res.locals.error = error
  res
    .status(error?.statusCode ? error?.statusCode : 500)
    .json({ error: error.message, status: error?.statusCode })
})

export default app
