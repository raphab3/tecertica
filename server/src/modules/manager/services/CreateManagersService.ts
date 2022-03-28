import { injectable, inject } from 'tsyringe'
import IManagersDto from '../dtos/IManagersDto'
import ICreateManagersDto from '../dtos/ICreateManagersDto'
import IManagersRepository from '../infra/mongodb/repositories/IManagersRepository'

@injectable()
export default class CreateManagersService {
  constructor(
    @inject('ManagersRepository')
    private ManagersRepository: IManagersRepository
  ) {}

  public async execute(data: ICreateManagersDto): Promise<IManagersDto> {
    const Manager = data

    // const ManagerAlreadyExists = await this.ManagersRepository.findByQuery({
    //   Managername: data.Managername
    // })
    // if (ManagerAlreadyExists) {
    //   throw new AppError('Managername already exists!', 409)
    // }

    const ManagersProviders = await this.ManagersRepository.create(Manager)
    return ManagersProviders
  }
}
