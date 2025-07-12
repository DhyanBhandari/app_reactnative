import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, iosGlassTheme } from '@/constants';
import { Theme, ThemeContextType } from '@/types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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
