import { IThemeStore } from "./IThemeStore";
import { injectable } from "inversify";
import { computed } from "mobx";
import { Theme } from "@material-ui/core";
import { ValueBoxStore } from "@Infrastructure/Stores";

@injectable()
export class ThemeStore implements IThemeStore {

  private readonly _theme: ValueBoxStore<Theme>

  constructor(theme: Theme) {
    this._theme = new ValueBoxStore<Theme>({ value: theme});
  }

  public change(theme: Theme): void {
    this._theme.set(theme);
  }

  @computed
  public get current(): Theme {
    return this._theme.value;
  }

}
