import { injectable, inject } from 'tsyringe'
import IManagersDto from '../dtos/IManagersDto'
import IManagersRepository from '../infra/mongodb/repositories/IManagersRepository'

@injectable()
export default class FindAllManagersService {
  constructor(
    @inject('ManagersRepository')
    private ManagersRepository: IManagersRepository
  ) {}

  public async execute(): Promise<Array<IManagersDto>> {
    const manager = await this.ManagersRepository.find()
    return manager
  }
}
