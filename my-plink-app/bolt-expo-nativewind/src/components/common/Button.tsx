import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/context';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  disabled = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: theme.colors.card };
      case 'danger':
        return { backgroundColor: '#ef4444' };
      default:
        return { backgroundColor: theme.colors.primary };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.text;
      default:
        return '#ffffff';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
