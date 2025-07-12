import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sun, Moon, Circle, Smartphone, Check } from 'lucide-react-native';
import { useTheme } from '@/context';
import { ThemeOption } from '@/types';

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'ios-glass', label: 'iOS Glass', icon: Circle },
  { value: 'system', label: 'System Default', icon: Smartphone },
];

interface ThemeSelectorProps {
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const { theme, currentTheme } = useTheme();

  return (
    <View style={styles.themeOptions}>
      {themeOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onThemeChange(option.value)}
            style={[
              styles.themeOption,
              currentTheme === option.value && { backgroundColor: theme.colors.primary + '20' }
            ]}
          >
            <IconComponent 
              size={20} 
              color={currentTheme === option.value ? theme.colors.primary : theme.colors.textSecondary} 
            />
            <Text style={[
              styles.themeOptionText,
              { color: currentTheme === option.value ? theme.colors.primary : theme.colors.text }
            ]}>
              {option.label}
            </Text>
            {currentTheme === option.value && (
              <Check size={20} color={theme.colors.primary} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  themeOptionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
});
