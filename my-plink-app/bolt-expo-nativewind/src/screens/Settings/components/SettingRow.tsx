import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context';

interface SettingRowProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  textColor?: string;
}

export const SettingRow: React.FC<SettingRowProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  hasSwitch, 
  onPress, 
  textColor 
}) => {
  const { theme } = useTheme();
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={hasSwitch}
    >
      <Icon size={20} color={textColor || theme.colors.textSecondary} />
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: textColor || theme.colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={setSwitchValue}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary + '40' }}
          thumbColor={switchValue ? theme.colors.primary : '#f4f3f4'}
        />
      ) : (
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
});
