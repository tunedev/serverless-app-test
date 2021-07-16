import { Implementation } from './Implementation'
import { WeatherResponse } from '../../../types'
import { convertFromCelciusToFahrenheit, getISODateFromUnixAndTimezone } from '../../../utils'

declare const OPEN_WEATHER_MAP_API_KEY: KVNamespace

interface OpenWeatherMapBody {
  coord: {
    lat: number
    lon: number
  }
  dt: number
  timezone: number
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    pressure: number
    humidity: number
    feels_like: number
  }
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
}

export class OpenWeatherMap extends Implementation {
  getWeatherURL(): string {
    if (!OPEN_WEATHER_MAP_API_KEY) {
      throw new Error('OPEN_WEATHER_MAP_API_KEY needs to be set in the environment')
    }
    return `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.location.lat}&lon=${this.location.lon}&appid=${OPEN_WEATHER_MAP_API_KEY}`
  }

  formatResponse(body: OpenWeatherMapBody): WeatherResponse {
    if (!body) {
      throw new Error('OpenWeatherMap response is not valid')
    }

    const { coord, main, wind, name, clouds, sys, timezone, dt } = body as OpenWeatherMapBody
    return {
      location_name: name,
      location_lat: coord.lat,
      location_lon: coord.lon,
      location_country: sys.country,
      temperature_c: main.temp,
      temperature_f: convertFromCelciusToFahrenheit(main.temp),
      temperature_feelslike_c: main.feels_like,
      temperature_feelslike_f: convertFromCelciusToFahrenheit(main.feels_like),
      wind_kph: wind.speed,
      wind_degree: wind.deg,
      pressure: main.pressure,
      humidity: main.humidity,
      clouds: clouds.all,
      updated_at: getISODateFromUnixAndTimezone(dt, timezone)
    }
  }
}
