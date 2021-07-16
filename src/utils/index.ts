export const convertFromCelciusToFahrenheit = (temperature: number): number =>
  (temperature * 9) / 5 + 32

export const getISODateFromUnixAndTimezone = (unix: number, timezone: number): string => {
  const date = new Date(unix * 1000)
  date.setMinutes(date.getMinutes() + timezone)
  return date.toISOString()
}
