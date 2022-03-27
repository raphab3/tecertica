import IManagersRepository from './IManagersRepository'
import ManagerEntity from '../entities/managerEntity'
import AppError from '@shared/errors/appErrors'
import { validate } from 'class-validator'
import IManagersDto from '@modules/manager/dtos/IManagersDto'
import ICreateManagersDto from '@modules/manager/dtos/ICreateManagersDto'

export default class ManagersRepository implements IManagersRepository {
  ormMongoose

  constructor() {
    this.ormMongoose = ManagerEntity
  }

  public async create(ManagerData: ICreateManagersDto): Promise<IManagersDto> {
    const Manager: any = await this.ormMongoose.create(ManagerData)

    const erros = await validate(Manager)
    if (erros.length > 0) {
      throw new AppError(`${erros}`, 400)
    }
    return Manager
  }

  public async find(): Promise<Array<IManagersDto>> {
    const data = await this.ormMongoose.find()
    return data
  }
}
