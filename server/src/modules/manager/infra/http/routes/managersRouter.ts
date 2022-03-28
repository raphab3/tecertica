import { Router } from 'express'
import ManagersController from '../controllers/managersController'

const managersRouter = Router()
const managersController = new ManagersController()

managersRouter.get('/', managersController.index)
// ManagersRouter.get('/:id', managersController.show)
managersRouter.post('/', managersController.create)
// ManagersRouter.put('/:id', managersController.update)
// ManagersRouter.delete('/:id', managersController.delete)

export default managersRouter
