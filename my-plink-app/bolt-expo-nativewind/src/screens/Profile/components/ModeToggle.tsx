import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context';

interface ModeToggleProps {
  isUserMode: boolean;
  onModeChange: (isUser: boolean) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ isUserMode, onModeChange }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.modeToggle, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity
        onPress={() => onModeChange(true)}
        style={[
          styles.modeButton,
          isUserMode && { backgroundColor: theme.colors.primary }
        ]}
      >
        <Text style={[
          styles.modeButtonText,
          { color: isUserMode ? '#ffffff' : theme.colors.textSecondary }
        ]}>
          Personal
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onModeChange(false)}
        style={[
          styles.modeButton,
          !isUserMode && { backgroundColor: theme.colors.primary }
        ]}
      >
        <Text style={[
          styles.modeButtonText,
          { color: !isUserMode ? '#ffffff' : theme.colors.textSecondary }
        ]}>
          Business
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modeToggle: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
