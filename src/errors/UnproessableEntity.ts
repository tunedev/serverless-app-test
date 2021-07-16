import { CustomError } from './CustomError'

export class UnprocessableRequest extends CustomError {
  statusCode = 422
  constructor(private reason: string) {
    super(reason)

    Object.setPrototypeOf(this, UnprocessableRequest.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
