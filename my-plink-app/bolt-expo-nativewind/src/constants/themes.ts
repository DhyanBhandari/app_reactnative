import { Theme } from '@/types';

export const lightTheme: Theme = {
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

export const darkTheme: Theme = {
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

export const iosGlassTheme: Theme = {
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
