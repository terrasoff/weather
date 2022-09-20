import { AsyncOperationWorkflowStore, ValueBoxStore } from "@Infrastructure/Stores";
import { WeatherModel } from "./Models/WeatherModel";
import { WeatherApiModel } from "./Models/WeatherApiModel";
import { WeatherForecastApiModel } from "./Models/WeatherForecastApiModel";
import { computed } from "mobx";
import { LocationModel } from "./Models/LocationModel";

export class WeatherStore {

  private readonly _data = new ValueBoxStore<WeatherModel>();

  public readonly fetch = new AsyncOperationWorkflowStore<LocationModel>(
    async (location): Promise<void> => {
      const weatherResponse = await fetch(`https://api.weather.gov/points/${location.lat},${location.lon}`);
      if (weatherResponse.status !== 200) {
        return;
      }
      const weather: WeatherApiModel = await weatherResponse.json();

      const forecastResponse = await fetch(weather.properties.forecast);
      if (forecastResponse.status !== 200) {
        return;
      }
      const forecast: WeatherForecastApiModel = await forecastResponse.json();

      const {
        city,
        state,
      } = weather.properties.relativeLocation.properties;
      const period = forecast.properties.periods[0];

      this._data.set({
        city,
        state,
        units: period.temperatureUnit,
        temperature: period.temperature,
      });
    }
  );

  @computed
  public get data(): WeatherModel | null {
    return this._data.value;
  }

}
