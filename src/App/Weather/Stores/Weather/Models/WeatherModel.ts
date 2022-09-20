import { TemperatureUnitType } from "./TemperatureUnitType";

export type WeatherModel = {
  city: string;
  state: string;
  temperature: number;
  units: TemperatureUnitType
}