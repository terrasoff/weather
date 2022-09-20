import { Theme } from "@material-ui/core";

export interface IThemeStore {

  readonly current: Theme;

  change(theme: Theme): void;

}
