export enum ButtonTypes {
  main = "main",
}

export type ButtonsThemeValues = {
  [key in ButtonTypes]: string;
};

export interface ThemeValues {
  body: string;
  text: string;
  toggleBorder: string;
  background: string;
  button: ButtonsThemeValues;
}

export enum ThemeTypes {
  lightTheme = "lightTheme",
  darkTheme = "darkTheme",
}

export type ThemeTypesKeys = keyof typeof ThemeTypes;

export type Themes = {
  [key in ThemeTypesKeys]?: ThemeValues;
};

export interface ThemeProps {
  theme: ThemeValues;
}
