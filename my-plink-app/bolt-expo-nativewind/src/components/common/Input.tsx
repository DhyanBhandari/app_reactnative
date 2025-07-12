import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/context';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'search';
}

export const Input: React.FC<InputProps> = ({ variant = 'default', style, ...props }) => {
  const { theme } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: theme.colors.input,
          color: theme.colors.text,
          borderColor: theme.colors.border,
        },
        variant === 'search' && styles.searchInput,
        style,
      ]}
      placeholderTextColor={theme.colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  searchInput: {
    borderRadius: 20,
  },
});
