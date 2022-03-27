import { Router } from 'express'
import managersRouter from '@modules/manager/infra/http/routes/managersRouter'

const routes = Router()

routes.use('/managers', managersRouter)

export default routes
