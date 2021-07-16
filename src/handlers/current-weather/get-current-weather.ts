import { Request } from 'itty-router'
import * as WeatherImplemantation from './implementation'
import { UnprocessableRequest } from '../../errors'
import { Coordinates } from '../../types'

export const getCurrentWeatherHandler = async (request: Request): Promise<Response | never> => {
  if (request.query) {
    const { lon: strLon, lat: strLat, source = 'WeatherAPI' } = request.query

    if (isNaN(parseFloat(strLon)) || isNaN(parseFloat(strLat))) {
      throw new UnprocessableRequest('Invalid coordinates, ensure lon and lat values are numbers')
    }

    const unifiedSource = Object.keys(WeatherImplemantation).find(
      definedImplementation => definedImplementation.toLowerCase() === source.toLowerCase()
    )

    if (!unifiedSource) {
      throw new UnprocessableRequest(
        `Invalid source, ensure it is among this values (${Object.keys(WeatherImplemantation).join(
          ', '
        )})`
      )
    }

    const lon = parseFloat(strLon)
    const lat = parseFloat(strLat)

    const location: Coordinates = {
      lon,
      lat
    }

    const response = await new WeatherImplemantation[source](location).getWeather()

    return new Response(JSON.stringify(response), { status: 404 })
  }
  throw new UnprocessableRequest(
    'Must pass a lattitude and a longitude as lon and lat in the query params'
  )
}
