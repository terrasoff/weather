import { WeatherForecastPeriodApiModel } from "./WeatherForecastPeriodApiModel";

export type WeatherForecastApiModel = {
  properties: {
    periods: Array<WeatherForecastPeriodApiModel>
  }
}
