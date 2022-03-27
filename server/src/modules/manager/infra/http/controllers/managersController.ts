import { container } from 'tsyringe'
import { Request, Response } from 'express'
import ICreateManagersDto from '@modules/manager/dtos/ICreateManagersDto'
import CreateManagersService from '@modules/manager/services/CreateManagersService'
import FindAllManagersService from './../../../services/FindAllManagersService'

export default class ManagersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data: ICreateManagersDto = request.body
    const createManagersService = container.resolve(CreateManagersService)
    const Manager = await createManagersService.execute(data)
    return response.status(201).json({ data: Manager })
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const findAllManagersService = container.resolve(FindAllManagersService)
    const ManagersPagination: any = await findAllManagersService.execute()
    return response.status(200).set('Method', 'POST').json({
      data: ManagersPagination
    })
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const id: string = request.params.id
  //   const findByIdManagersService = container.resolve(FindByIdManagersService)
  //   const ManagersProvider = await findByIdManagersService.execute(id)
  //   return response.status(200).json({ data: ManagersProvider })
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const data: IUpdateManagersDto = request.body
  //   const id: string = request.params.id
  //   data.ManagerUpdated = `${request.headers.Manager_id}`
  //   const updateManagerService = container.resolve(UpdateManagersService)
  //   const Managers = await updateManagerService.execute(id, data)
  //   return response.status(200).set('Method', 'PUT').json({ data: Managers })
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const id: string = request.params.id
  //   const ManagerId = `${request.headers.Manager_id}`
  //   const deleteManagerservice = container.resolve(DeleteManagersService)
  //   await deleteManagerservice.execute(id, ManagerId)
  //   return response.status(200).json({ data: 'OK' })
  // }
}
