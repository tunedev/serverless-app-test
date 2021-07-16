export enum sourceEnum {
  OpenWeatherMap = 'openWeatherMap',
  WeatherAPI = 'weatherAPI'
}

export interface WeatherResponse {
  location_name: string
  location_lat: number
  location_lon: number
  location_country: string
  temperature_c: number
  temperature_f: number
  temperature_feelslike_c: number
  temperature_feelslike_f: number
  wind_kph: number
  wind_degree: number
  pressure: number
  humidity: number
  clouds: number
  updated_at: string
}

export interface Coordinates {
  lon: number
  lat: number
}
