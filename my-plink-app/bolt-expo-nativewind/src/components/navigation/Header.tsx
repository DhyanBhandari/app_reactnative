import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@/context';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  rightComponent,
  onBackPress,
}) => {
  const { theme, currentTheme } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, theme.blur && styles.headerBlur]}>
      {theme.blur ? (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={20}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      ) : (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
      )}
      
      {showBackButton ? (
        <TouchableOpacity 
          onPress={handleBackPress}
          style={[styles.backButton, { backgroundColor: theme.colors.button }]}
        >
          <ChevronLeft size={24} color={theme.colors.buttonText} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}
      
      <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      
      {rightComponent || <View style={styles.headerSpacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
});
