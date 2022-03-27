import 'reflect-metadata'
import 'dotenv/config'
import '../../container'
import 'express-async-errors'
import '@shared/infra/mongodb'
import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '@config/swagger/swagger_output.json'
import routes from './routes'
import AppError from '@shared/errors/appErrors'
import timeout from 'connect-timeout'

class App {
  server
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
    this.error()
  }

  middlewares() {
    const error404 = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'www',
      'index.html'
    )

    const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    }

    this.server.use(cors(corsOptions))
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: false }))
    this.server.use(timeout('20s'))
    this.server.use(morgan(':method :url :response-time'))
    this.server.use('/404', express.static(error404))
  }

  routes() {
    const pageTest = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'coverage',
      'lcov-report'
    )
    this.server.use('/tests', express.static(pageTest))
    this.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    this.server.use('/api/v1', routes)
    this.server.use('*', (req, res) => res.redirect('/404'))
  }

  error() {
    this.server.use(
      (error: AppError, req: Request, res: Response, next: any) => {
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
      }
    )
  }
}

export default new App().server
