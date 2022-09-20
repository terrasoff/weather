import { OperationStateStore, ValueBoxStore } from "@Infrastructure/Stores";
import { TemperatureUnitType } from "@App/Weather/Stores/Weather/Models/TemperatureUnitType";
import { WeatherStore } from "@App/Weather/Stores/Weather/WeatherStore";
import { computed, reaction } from "mobx";
import { LocationModel } from "@App/Weather/Stores/Weather/Models/LocationModel";
import { WeatherModel } from "@App/Weather/Stores/Weather/Models/WeatherModel";

export class WeatherPageStore {

  public readonly units = new ValueBoxStore<TemperatureUnitType>({
    defaultValue: "F",
  });

  public readonly location = new ValueBoxStore<LocationModel>({
    defaultValue: {
      lat: 39.7456,
      lon: -97.0892,
    }
  });

  constructor(
    private readonly _weatherStore: WeatherStore,
  ) {
    reaction(
      () => this.location.value,
      this._weatherStore.fetch.execute
    );
  }

  public fetch(): Promise<void> {
    return this._weatherStore.fetch.execute(this.location.value);
  }

  public get fetchState(): OperationStateStore {
    return this._weatherStore.fetch.state;
  }

  public get data(): WeatherModel | null {
    return this._weatherStore.data;
  }

  @computed
  public get currentTemperature(): number | null {
    const data = this._weatherStore.data;
    if (!data) {
      return null;
    }

    return this.getTemperatureInSelectedUnits(
        data.temperature,
        data.units
    );
  }

  private getTemperatureInSelectedUnits(
    temperature: number,
    units: TemperatureUnitType,
  ): number {
    if (this.units.value === units) {
      return temperature;
    }

    // TODO move to helpers and cover with tests
    if (this.units.value === "F") {
      return Math.round((temperature * 1.8) + 32);
    } else {
      return Math.round((temperature - 32) * 0.5556);
    }
  }
}