import { IThemeStore, ThemeStore } from "@Infrastructure/Stores";
import { createTheme } from "@material-ui/core";
import { ContainerServiceProvider, ServiceIdentifier } from "@Container";

export class ThemeServiceProviders extends ContainerServiceProvider {

  public build(): void {
    const theme = createTheme({
      typography: {
        fontFamily: "Montserrat",
        fontSize: 12,
      },
      palette: {
        primary: {
          main: "#000D74",
        },
      },
      components: {
        MuiButton: {
          // TODO update to 5.0.1 when released and check the property works properly
          defaultProps: {
            size: "small",
          }
        },
        MuiTypography: {
          styleOverrides: {
            h1: {
              fontWeight: 700,
              fontSize: "1.2rem"
            }
          }
        }
      },
    });

    const themeStore = new ThemeStore(theme);

    this._container.bind<IThemeStore>(ServiceIdentifier.ThemeStore).toConstantValue(themeStore);
  }

}
