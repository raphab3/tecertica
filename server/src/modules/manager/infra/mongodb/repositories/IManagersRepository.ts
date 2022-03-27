import ICreateManagersDto from '@modules/manager/dtos/ICreateManagersDto'
import IManagersDto from '@modules/manager/dtos/IManagersDto'

export default interface IManagersRepository {
  create(data: ICreateManagersDto): Promise<IManagersDto>
  find(): Promise<Array<IManagersDto>>
}
