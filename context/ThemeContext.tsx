import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

interface ThemeColors {
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

interface Theme {
  colors: ThemeColors;
  blur: boolean;
}

interface ThemeContextType {
  theme: Theme;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  systemTheme: string; // ✅ changed from string | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Themes...

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [systemTheme, setSystemTheme] = useState<string>(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme || 'light');
    });
    return () => subscription?.remove();
  }, []);

  const getTheme = (): Theme => {
    switch (currentTheme) {
      case 'dark':
        return darkTheme;
      case 'ios-glass':
        return iosGlassTheme;
      case 'system':
        return systemTheme === 'dark' ? darkTheme : lightTheme;
      default:
        return lightTheme;
    }
  };
  const lightTheme: Theme = {
    colors: {
      background: '#ffffff',
      surface: '#f2f2f2',
      card: '#ffffff',
      text: '#000000',
      textSecondary: '#666666',
      primary: '#6200ee',
      primaryLight: '#9d46ff',
      border: '#e0e0e0',
      input: '#f5f5f5',
      button: '#6200ee',
      buttonText: '#ffffff',
    },
    blur: false,
  };

  const darkTheme: Theme = {
    colors: {
      background: '#121212',
      surface: '#1e1e1e',
      card: '#1f1f1f',
      text: '#ffffff',
      textSecondary: '#aaaaaa',
      primary: '#bb86fc',
      primaryLight: '#efb7ff',
      border: '#333333',
      input: '#2c2c2c',
      button: '#bb86fc',
      buttonText: '#000000',
    },
    blur: false,
  };

  const iosGlassTheme: Theme = {
    colors: {
      background: 'rgba(255, 255, 255, 0.3)',
      surface: 'rgba(255, 255, 255, 0.25)',
      card: 'rgba(255, 255, 255, 0.1)',
      text: '#000000',
      textSecondary: '#555555',
      primary: '#007aff',
      primaryLight: '#5ac8fa',
      border: 'rgba(0, 0, 0, 0.2)',
      input: 'rgba(255, 255, 255, 0.2)',
      button: '#007aff',
      buttonText: '#ffffff',
    },
    blur: true,
  };


  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        currentTheme,
        setCurrentTheme,
        systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
