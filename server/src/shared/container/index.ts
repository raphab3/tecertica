import { container } from 'tsyringe'

import IManagersRepository from '@modules/manager/infra/mongodb/repositories/IManagersRepository'
import ManagersRepository from '@modules/manager/infra/mongodb/repositories/ManagerRepository'

// ManagersRepository
container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  ManagersRepository
)
