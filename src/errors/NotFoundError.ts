import { CustomError } from './CustomError'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(private reason?: string) {
    super('Resource not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason || 'Not Found' }]
  }
}
