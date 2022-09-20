import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { MainLayout } from "@Components/Layout/Main";
import { Spinner } from "@Components/Spinner";
import { WeatherStore } from "@App/Weather/Stores/Weather/WeatherStore";
import { computed } from "mobx";
import { WeatherPageStore } from "./WeatherPageStore";
import { TemperatureUnitType } from "@App/Weather/Stores/Weather/Models/TemperatureUnitType";

@observer
export class WeatherPage extends PureComponent {

  private readonly _store = new WeatherPageStore(new WeatherStore());

  public componentDidMount(): Promise<void> {
    return this._store.fetch();
  }

  // TODO create generic component to display data with preloading
  @computed
  private get content(): ReactNode {
    const fetchState = this._store.fetchState;
    const { isRunning } = fetchState;
    if (isRunning) {
      return (
        <Spinner>
          Fetching weather
        </Spinner>
      );
    }

    const { hasFailed } = fetchState;
    if (hasFailed) {
      return (
        <div>
          Could not fetch data from API. Try again later.
        </div>
      );
    }

    const { hasSucceed } = fetchState;
    if (hasSucceed) {
      return (
        <div>
          <div>
            <b>Current temperature</b>:
            {
              " " + this._store.currentTemperature
            }
            {
              this._store.units.value
            }
          </div>
          <div>
            <b>Data from server</b>:
            <pre>
              {
                JSON.stringify(this._store.data, null, 4)
              }
            </pre>
          </div>
        </div>
      );
    }

    // TODO process another scenarios
    return null;
  }

  // TODO to optimize re-renders need to create additional components with own stores
  public render(): ReactNode {
    const { units, location } = this._store;

    return (
      <MainLayout title="Location weather">
        <p>This page is accessible for authenticated user only. The page does not contain fancy mark up. I just demonstrate data model workflow here.</p>
        <h2>Settings</h2>
        <div>
          <div>
            Latitude:
            <input
              value={location.value.lat}
              onChange={e => location.set({ ...location.value, lat: +e.target.value })}
            />
          </div>
          <div>
            Longitude:
            <input
              value={location.value.lon}
              onChange={e => location.set({ ...location.value, lon: +e.target.value })}
            />
          </div>
        </div>
        <div>
          <select onChange={e => units.set(e.target.value as TemperatureUnitType)}>
            <option value="F">Fahrenheit</option>
            <option value="C">Celsius.</option>
          </select>
        </div>
        <h2>Data</h2>
        {
          this.content
        }
      </MainLayout>
    );
  }
}
