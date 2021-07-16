import { WeatherResponse, Coordinates } from '../../../types'

export abstract class Implementation {
  protected location: Coordinates
  abstract getWeatherURL(): string
  abstract formatResponse(response: unknown): WeatherResponse

  constructor(location: Coordinates) {
    this.location = location
  }

  async getWeather(): Promise<WeatherResponse> {
    const resp = await fetch(this.getWeatherURL())
    const body = await resp.json()
    return this.formatResponse(body)
  }
}
