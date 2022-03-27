export default class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor (message: string, statusCode: any = 400) {
    this.message = message
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}
