import { CustomError } from '../errors'

export const errorHandler = (err: Error) => {
  if (err instanceof CustomError) {
    return new Response(JSON.stringify({ errors: err.serializeErrors() }), {
      status: err.statusCode
    })
  }

  console.log('Error occured', err.message)
  return new Response(JSON.stringify({ errors: [{ message: 'something broke' }] }), {
    status: 500
  })
}
