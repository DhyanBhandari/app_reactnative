export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  border: string;
  input: string;
  button: string;
  buttonText: string;
}

export interface Theme {
  colors: ThemeColors;
  blur: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  systemTheme: string;
}

export type ThemeOption = {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
};
