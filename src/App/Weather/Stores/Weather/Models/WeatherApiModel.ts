export type WeatherApiModel = {
  properties: {
    forecast: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      }
    }
  }
}
