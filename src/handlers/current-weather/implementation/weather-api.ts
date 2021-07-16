import { Implementation } from './Implementation'
import { WeatherResponse } from '../../../types'

declare const WEATHER_API_KEY: KVNamespace

interface WeatherAPICurrent {
  temp_c: number
  temp_f: number
  feelslike_c: number
  feelslike_f: number
  wind_kph: number
  wind_degree: number
  pressure_mb: number
  humidity: number
  cloud: number
  last_updated: string
}

interface WeatherAPILocation {
  name: string
  lat: number
  lon: number
  country: string
}

interface WeatherAPIBody {
  location: WeatherAPILocation
  current: WeatherAPICurrent
}

export class WeatherAPI extends Implementation {
  getWeatherURL(): string {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY needs to be set in the environment')
    }
    return `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${this.location.lat},${this.location.lon}`
  }

  formatResponse(body: WeatherAPIBody): WeatherResponse {
    console.log(JSON.stringify(body))
    if (!body) {
      throw new Error('WeatherAPI response is not valid')
    }

    const { location, current } = body
    if (!location || !current) {
      throw new Error('WeatherAPI response is not valid')
    }
    return {
      location_name: location.name,
      location_lat: location.lat,
      location_lon: location.lon,
      location_country: location.country,
      temperature_c: current.temp_c,
      temperature_f: current.temp_f,
      temperature_feelslike_c: current.feelslike_c,
      temperature_feelslike_f: current.feelslike_f,
      wind_kph: current.wind_kph,
      wind_degree: current.wind_degree,
      pressure: current.pressure_mb,
      humidity: current.humidity,
      clouds: current.cloud,
      updated_at: current.last_updated
    }
  }
}
