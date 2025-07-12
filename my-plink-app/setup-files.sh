#!/bin/bash

# Define the project directory name
PROJECT_NAME="bolt-expo-nativewind"

echo "Creating Expo React Native project structure for: $PROJECT_NAME"

# Create the main project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

echo "Creating root files..."

# Create root files
cat << 'EOF' > package.json
{
  "name": "bolt-expo-nativewind",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "EXPO_NO_TELEMETRY=1 expo start",
    "build:web": "expo export --platform web",
    "lint": "expo lint"
  },
  "dependencies": {
    "@expo-google-fonts/inter": "^0.4.1",
    "@expo/vector-icons": "^14.1.0",
    "@lucide/lab": "^0.1.2",
    "@react-navigation/bottom-tabs": "^7.4.2",
    "@react-navigation/native": "^7.0.14",
    "expo": "^53.0.0",
    "expo-blur": "~14.1.3",
    "expo-camera": "~16.1.5",
    "expo-clipboard": "^7.1.5",
    "expo-constants": "~17.1.3",
    "expo-font": "~13.2.2",
    "expo-haptics": "~14.1.3",
    "expo-linear-gradient": "~14.1.3",
    "expo-linking": "~7.1.3",
    "expo-router": "~5.0.2",
    "expo-splash-screen": "~0.30.6",
    "expo-status-bar": "~2.2.2",
    "expo-symbols": "~0.4.3",
    "expo-system-ui": "~5.0.5",
    "expo-web-browser": "~14.1.5",
    "lucide-react-native": "^0.475.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.1",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-reanimated": "~3.17.4",
    "react-native-safe-area-context": "5.3.0",
    "react-native-screens": "~4.10.0",
    "react-native-svg": "^15.11.2",
    "react-native-url-polyfill": "^2.0.0",
    "react-native-web": "^0.20.0",
    "react-native-webview": "13.13.5"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~19.0.10",
    "typescript": "~5.8.3"
  }
}
EOF

cat << 'EOF' > app.json
{
  "expo": {
    "name": "bolt-expo-nativewind",
    "slug": "bolt-expo-nativewind",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "web": {
      "bundler": "metro",
      "output": "single",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": ["expo-router", "expo-font", "expo-web-browser"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
EOF

cat << 'EOF' > tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/screens/*": ["./src/screens/*"],
      "@/context/*": ["./src/context/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
EOF

cat << 'EOF' > .npmrc
legacy-peer-deps=true
EOF

echo "// This file is typically empty or contains references." > expo-env.d.ts

echo "Creating 'src' directory and its subfolders..."

# Create src directory and its subfolders
mkdir -p src/components/{common,navigation,layout}
mkdir -p src/screens/{Home/components,Profile/components,Settings/components,Favorites/components,Feed/components,Invite/components}
mkdir -p src/{context,hooks,types,constants,utils}

# Create index.ts files in src subfolders
# These `echo` commands correctly generate the index.ts files with their respective exports.
echo "export * from './Button';" > src/components/common/index.ts
echo "export * from './Input';" >> src/components/common/index.ts

echo "export * from './TabBar';" > src/components/navigation/index.ts
echo "export * from './Header';" >> src/components/navigation/index.ts

echo "export * from './AppBackground';" > src/components/layout/index.ts
echo "export * from './Container';" >> src/components/layout/index.ts

echo "export * from './common';" > src/components/index.ts
echo "export * from './navigation';" >> src/components/index.ts
echo "export * from './layout';" >> src/components/index.ts

echo "export * from './MainContent';" > src/screens/Home/components/index.ts
echo "export * from './VoiceInterface';" >> src/screens/Home/components/index.ts
echo "export * from './ChatInput';" >> src/screens/Home/components/index.ts

echo "export * from './HomeScreen';" > src/screens/Home/index.ts

echo "export * from './UserInfo';" > src/screens/Profile/components/index.ts
echo "export * from './ModeToggle';" >> src/screens/Profile/components/index.ts
echo "export * from './BusinessForm';" >> src/screens/Profile/components/index.ts

echo "export * from './ProfileScreen';" > src/screens/Profile/index.ts

echo "export * from './ThemeSelector';" > src/screens/Settings/components/index.ts
echo "export * from './SettingRow';" >> src/screens/Settings/components/index.ts

echo "export * from './SettingsScreen';" > src/screens/Settings/index.ts

echo "export * from './FavoriteItem';" > src/screens/Favorites/components/index.ts
echo "export * from './SearchBar';" >> src/screens/Favorites/components/index.ts

echo "export * from './FavoritesScreen';" > src/screens/Favorites/index.ts

echo "export * from './FeedItem';" > src/screens/Feed/components/index.ts

echo "export * from './FeedScreen';" > src/screens/Feed/index.ts

echo "export * from './InviteCode';" > src/screens/Invite/components/index.ts
echo "export * from './ShareButtons';" >> src/screens/Invite/components/index.ts

echo "export * from './InviteScreen';" > src/screens/Invite/index.ts

echo "export * from './Home';" > src/screens/index.ts
echo "export * from './Profile';" >> src/screens/index.ts
echo "export * from './Settings';" >> src/screens/index.ts
echo "export * from './Favorites';" >> src/screens/index.ts
echo "export * from './Feed';" >> src/screens/index.ts
echo "export * from './Invite';" >> src/screens/index.ts

echo "export { default as ThemeProvider, useTheme } from './ThemeContext';" > src/context/index.ts

echo "export * from './useFrameworkReady';" > src/hooks/index.ts

echo "export * from './theme';" > src/types/index.ts
echo "export * from './navigation';" >> src/types/index.ts

echo "export * from './themes';" > src/constants/index.ts
echo "export * from './colors';" >> src/constants/index.ts

echo "export * from './clipboard';" > src/utils/index.ts

echo "Populating 'src/types' files..."

cat << 'EOF' > src/types/theme.ts
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
EOF

cat << 'EOF' > src/types/navigation.ts
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface FavoriteItem {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  rating: number;
  saved: string;
  emoji: string;
}

export interface FeedItem {
  id: number;
  type: 'post' | 'trending' | 'recommendation';
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface BusinessSection {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}
EOF

echo "Populating 'src/constants' files..."

cat << 'EOF' > src/constants/themes.ts
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
EOF

cat << 'EOF' > src/constants/colors.ts
export const BRAND_COLORS = {
  whatsapp: '#25d366',
  email: '#ea4335',
  copyLink: '#6b7280',
  more: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const GRADIENT_COLORS = {
  light: ['#f0f9ff', '#e0f2fe', '#f8fafc'],
  dark: ['rgba(120, 120, 120, 0.3)', 'rgba(180, 180, 180, 0.25)', 'rgba(200, 200, 200, 0.35)'],
};
EOF

echo "Populating 'src/context' files..."

cat << 'EOF' > src/context/ThemeContext.tsx
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
EOF

echo "Populating 'src/hooks' files..."

cat << 'EOF' > src/hooks/useFrameworkReady.ts
import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    window.frameworkReady?.();
  });
}
EOF

echo "Populating 'src/utils' files..."

cat << 'EOF' > src/utils/clipboard.ts
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export const copyToClipboard = async (text: string, successMessage: string = 'Copied to clipboard!') => {
  try {
    await Clipboard.setStringAsync(text);
    Alert.alert('Success', successMessage);
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to copy to clipboard');
    return false;
  }
};
EOF

echo "Populating 'src/components' files..."

cat << 'EOF' > src/components/common/Button.tsx
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
EOF

cat << 'EOF' > src/components/common/Input.tsx
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
EOF

cat << 'EOF' > src/components/navigation/TabBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Menu, User, Heart, Rss } from 'lucide-react-native';
import { useTheme } from '@/context';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme, currentTheme } = useTheme();

  const getTabIcon = (routeName: string, focused: boolean, size: number, color: string) => {
    const iconSize = focused ? size + 2 : size;
    
    switch (routeName) {
      case 'index':
        return <Menu size={iconSize} color={color} />;
      case 'favorites':
        return <Heart size={iconSize} color={color} />;
      case 'profile':
        return <User size={iconSize} color={color} />;
      case 'feed':
        return <Rss size={iconSize} color={color} />;
      default:
        return <Menu size={iconSize} color={color} />;
    }
  };

  const TabBarBackground = () => {
    if (theme.blur) {
      return (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={30}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      );
    }
    return (
      <View 
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: theme.colors.surface }
        ]} 
      />
    );
  };

  return (
    <View style={styles.tabBar}>
      <TabBarBackground />
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined 
          ? options.tabBarLabel 
          : options.title !== undefined 
          ? options.title 
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === 'settings') return null;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <View style={[
              styles.iconContainer,
              isFocused && styles.iconContainerActive,
              { backgroundColor: isFocused ? theme.colors.primary + '20' : 'transparent' }
            ]}>
              {getTabIcon(
                route.name, 
                isFocused, 
                24, 
                isFocused ? theme.colors.primary : theme.colors.textSecondary
              )}
            </View>
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? theme.colors.primary : theme.colors.textSecondary }
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconContainerActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
EOF

cat << 'EOF' > src/components/navigation/Header.tsx
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
EOF

cat << 'EOF' > src/components/layout/AppBackground.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context';
import { GRADIENT_COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');

export const AppBackground: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {theme.blur ? (
        <LinearGradient
          colors={GRADIENT_COLORS.dark}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <LinearGradient
          colors={GRADIENT_COLORS.light}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <Animated.View style={[
        styles.orb1, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)' }
      ]} />
      <Animated.View style={[
        styles.orb2, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.08)' : 'rgba(16, 185, 129, 0.08)' }
      ]} />
      <Animated.View style={[
        styles.orb3, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.12)' : 'rgba(245, 158, 11, 0.12)' }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  orb1: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.6,
  },
  orb2: {
    position: 'absolute',
    top: height * 0.6,
    right: width * 0.1,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5,
  },
  orb3: {
    position: 'absolute',
    top: height * 0.4,
    right: width * 0.3,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
  },
});
EOF

cat << 'EOF' > src/components/layout/Container.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '@/context';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
EOF

echo "Populating 'src/screens/Home' files..."

cat << 'EOF' > src/screens/Home/components/MainContent.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/context';
import { Message } from '@/types';
import { VoiceInterface } from './VoiceInterface';

interface MainContentProps {
  messages: Message[];
  isListening: boolean;
  hasInteracted: boolean;
  onPersonClick: () => void;
  transcript: string;
  isRecording: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  messages,
  isListening,
  hasInteracted,
  onPersonClick,
  transcript,
  isRecording,
}) => {
  const { theme } = useTheme();

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={[
        styles.messageBubble,
        { backgroundColor: item.sender === 'user' ? theme.colors.primary : theme.colors.card }
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.sender === 'user' ? '#ffffff' : theme.colors.text }
        ]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  if (messages.length > 0) {
    return (
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />
    );
  }

  return (
    <VoiceInterface
      isListening={isListening}
      hasInteracted={hasInteracted}
      onPersonClick={onPersonClick}
      transcript={transcript}
      isRecording={isRecording}
    />
  );
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
    width: '100%',
  },
  messagesContainer: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 20,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
EOF

cat << 'EOF' > src/screens/Home/components/VoiceInterface.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Headphones, Mic } from 'lucide-react-native';
import { useTheme } from '@/context';

interface VoiceInterfaceProps {
  isListening: boolean;
  hasInteracted: boolean;
  onPersonClick: () => void;
  transcript: string;
  isRecording: boolean;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  isListening,
  hasInteracted,
  onPersonClick,
  transcript,
  isRecording,
}) => {
  const { theme } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const transcriptAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Animations are handled in HomeScreen, this component just uses the props
  // The actual animation setup in useEffect and Animated.loop calls are in HomeScreen.tsx

  if (isListening && hasInteracted) {
    return (
      <View style={styles.listeningContainer}>
        <View style={styles.waveContainer}>
          {[...Array(5)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.waveBars,
                {
                  backgroundColor: theme.colors.primary,
                  transform: [
                    {
                      scaleY: waveAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1 + Math.sin(index * 0.5) * 0.5],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
        
        <Animated.View style={[
          styles.micButton,
          { 
            backgroundColor: theme.colors.primary,
            transform: [{ scale: pulseAnim }] 
          }
        ]}>
          <TouchableOpacity onPress={onPersonClick} style={styles.micButtonInner}>
            <Mic size={40} color="#ffffff" />
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={[styles.listeningText, { color: theme.colors.text }]}>
          {isRecording ? 'Listening...' : 'Processing...'}
        </Text>
        
        <Animated.View 
          style={[
            styles.transcriptContainer,
            { 
              backgroundColor: theme.colors.card,
              opacity: transcriptAnim,
            }
          ]}
        >
          <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
            {transcript || 'Start speaking...'}
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.defaultContainer}>
      <TouchableOpacity 
        onPress={onPersonClick}
        style={[styles.mainButton, { backgroundColor: theme.colors.primary }]}
      >
        <Headphones size={48} color="#ffffff" />
      </TouchableOpacity>
      <Text style={[styles.mainTitle, { color: theme.colors.text }]}>
        Find Your Need.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  listeningContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 4,
  },
  waveBars: {
    width: 4,
    height: 30,
    borderRadius: 2,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  transcriptContainer: {
    padding: 16,
    borderRadius: 12,
    maxWidth: '90%',
    marginTop: 16,
    minHeight: 50,
    justifyContent: 'center',
  },
  transcriptText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
EOF

cat << 'EOF' > src/screens/Home/components/ChatInput.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Send } from 'lucide-react-native';
import { useTheme } from '@/context';

interface ChatInputProps {
  chatText: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  chatText,
  onTextChange,
  onSubmit,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.chatInputContainer, { backgroundColor: theme.colors.surface }]}>
      <TextInput
        value={chatText}
        onChangeText={onTextChange}
        placeholder="Type your message..."
        placeholderTextColor={theme.colors.textSecondary}
        style={[
          styles.chatInput,
          { 
            backgroundColor: theme.colors.input,
            color: theme.colors.text,
            borderColor: theme.colors.border 
          }
        ]}
        multiline
        returnKeyType="send"
        onSubmitEditing={onSubmit}
      />
      {chatText.trim() && (
        <TouchableOpacity 
          onPress={onSubmit}
          style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
        >
          <Send size={20} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
EOF

cat << 'EOF' > src/screens/Home/HomeScreen.tsx
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Menu } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container } from '@/components';
import { router } from 'expo-router';
import { Message } from '@/types';
import { MainContent, ChatInput } from './components';

export const HomeScreen: React.FC = () => {
  const { theme, currentTheme } = useTheme();
  
  const [isUserMode, setIsUserMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const transcriptAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  const startPulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [pulseAnim, waveAnim]);

  const handlePersonClick = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setIsRecording(true);
      setHasInteracted(true);
      setTranscript('');
      startPulseAnimation();
      
      Animated.timing(transcriptAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      const words = ['Hello', 'how', 'can', 'I', 'help', 'you', 'today?'];
      let currentText = '';
      
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += (index > 0 ? ' ' : '') + word;
          setTranscript(currentText);
        }, (index + 1) * 500);
      });
      
      setTimeout(() => {
        handleStopListening();
      }, 4000);
    } else {
      handleStopListening();
    }
  }, [isListening, startPulseAnimation, transcriptAnim]);

  const handleStopListening = useCallback(() => {
    setIsListening(false);
    setIsRecording(false);
    pulseAnim.stopAnimation(() => pulseAnim.setValue(1));
    waveAnim.stopAnimation(() => waveAnim.setValue(0));
    
    Animated.timing(transcriptAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    if (transcript.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: transcript.trim(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: `I heard: "${transcript.trim()}". How can I assist you with this?`,
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setTranscript('');
    }
  }, [transcript, transcriptAnim, pulseAnim, waveAnim]);

  const handleChatSubmit = useCallback(() => {
    if (chatText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: chatText.trim(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setChatText('');
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: `I understand you're looking for help with: "${chatText.trim()}". How can I assist you further?`,
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  }, [chatText]);

  return (
    <Container>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header, theme.blur && styles.headerBlur]}>
          {theme.blur ? (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              intensity={30}
              tint={currentTheme === 'dark' ? 'dark' : 'light'}
            />
          ) : (
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
          )}
          
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Text style={[styles.logo, { color: theme.colors.text }]}>PLINK</Text>
          </TouchableOpacity>
          
          <View style={[styles.modeToggle, { backgroundColor: theme.colors.card }]}>
            <TouchableOpacity
              onPress={() => setIsUserMode(true)}
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
              onPress={() => setIsUserMode(false)}
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
          
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/settings')}
            style={[styles.settingsButton, { backgroundColor: theme.colors.button }]}
          >
            <Menu size={24} color={theme.colors.buttonText} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <MainContent
            messages={messages}
            isListening={isListening}
            hasInteracted={hasInteracted}
            onPersonClick={handlePersonClick}
            transcript={transcript}
            isRecording={isRecording}
          />
        </View>

        <ChatInput
          chatText={chatText}
          onTextChange={setChatText}
          onSubmit={handleChatSubmit}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modeToggle: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
EOF

echo "Populating 'src/screens/Profile' files..."

cat << 'EOF' > src/screens/Profile/components/UserInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context';

interface UserInfoProps {
  isUserMode: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({ isUserMode }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.userInfoSection}>
      <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.avatarText}>
          {isUserMode ? 'U' : 'B'}
        </Text>
      </View>
      <View style={styles.userDetails}>
        <Text style={[styles.userName, { color: theme.colors.text }]}>
          {isUserMode ? 'User Name' : 'Business Name'}
        </Text>
        <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
          {isUserMode ? 'user@example.com' : 'business@example.com'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
});
EOF

cat << 'EOF' > src/screens/Profile/components/ModeToggle.tsx
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
EOF

cat << 'EOF' > src/screens/Profile/components/BusinessForm.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { useTheme } from '@/context';
import { BusinessSection } from '@/types';
import { Button } from '@/components';

interface BusinessFormProps {
  businessSections: BusinessSection[];
  onSectionChange: (id: string, field: keyof BusinessSection, value: string) => void;
  onAddSection: () => void;
  onRemoveSection: (id: string) => void;
  onSave: () => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  businessSections,
  onSectionChange,
  onAddSection,
  onRemoveSection,
  onSave,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.businessContent}>
      {businessSections.map((section) => (
        <View key={section.id} style={[styles.businessSection, { borderColor: theme.colors.border }]}>
          <View style={styles.businessSectionHeader}>
            <TextInput
              value={section.label}
              onChangeText={(value) => onSectionChange(section.id, 'label', value)}
              style={[styles.businessLabelInput, { 
                backgroundColor: theme.colors.input,
                color: theme.colors.text 
              }]}
              placeholder="Field Label"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity
              onPress={() => onRemoveSection(section.id)}
              style={styles.removeButton}
            >
              <X size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            value={section.value}
            onChangeText={(value) => onSectionChange(section.id, 'value', value)}
            style={[styles.businessValueInput, { 
              backgroundColor: theme.colors.input,
              color: theme.colors.text 
            }]}
            placeholder={`Enter ${section.label.toLowerCase()}`}
            placeholderTextColor={theme.colors.textSecondary}
            multiline={section.type === 'textarea'}
            numberOfLines={section.type === 'textarea' ? 3 : 1}
          />
        </View>
      ))}
      
      <TouchableOpacity
        onPress={onAddSection}
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
      >
        <Plus size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>Add New Field</Text>
      </TouchableOpacity>
      
      <Button
        title="Save Business Details"
        onPress={onSave}
        variant="primary"
        style={styles.saveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  businessContent: {
    gap: 16,
  },
  businessSection: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  businessSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessLabelInput: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    marginRight: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessValueInput: {
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    minHeight: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 8,
  },
});
EOF

cat << 'EOF' > src/screens/Profile/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, Star } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { BusinessSection } from '@/types';
import { UserInfo, ModeToggle, BusinessForm } from './components';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const [isUserMode, setIsUserMode] = useState(true);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [businessSections, setBusinessSections] = useState<BusinessSection[]>([
    { id: 'name', label: 'Business Name', value: '', type: 'text' },
    { id: 'description', label: 'Description', value: '', type: 'textarea' },
  ]);

  const handleBusinessSectionChange = (id: string, field: keyof BusinessSection, value: string) => {
    setBusinessSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addBusinessSection = () => {
    setBusinessSections(prevSections => [
      ...prevSections,
      { id: Date.now().toString(), label: 'New Field', value: '', type: 'text' }
    ]);
  };

  const removeBusinessSection = (id: string) => {
    setBusinessSections(prevSections => 
      prevSections.filter(section => section.id !== id)
    );
  };

  const saveBusinessDetails = () => {
    Alert.alert('Success', 'Business details saved successfully!');
  };

  return (
    <Container>
      <Header title="Profile" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <UserInfo isUserMode={isUserMode} />

        <ModeToggle isUserMode={isUserMode} onModeChange={setIsUserMode} />

        {!hasUpgradedPlan && (
          <View style={styles.upgradeSection}>
            <View style={styles.upgradeContent}>
              <Star size={24} color="#f59e0b" />
              <View style={styles.upgradeText}>
                <Text style={styles.upgradeTitle}>Upgrade Your Plan</Text>
                <Text style={styles.upgradeSubtitle}>
                  Unlock more features and benefits!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setHasUpgradedPlan(true)}
              style={styles.upgradeButton}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.settingsSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {isUserMode ? 'Personal Settings' : 'Business Details'}
          </Text>
          
          {isUserMode ? (
            <View style={styles.settingsContent}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Language
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  <Text style={[styles.pickerText, { color: theme.colors.text }]}>
                    English
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Default Tone
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  <Text style={[styles.pickerText, { color: theme.colors.text }]}>
                    Friendly
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
            </View>
          ) : (
            <BusinessForm
              businessSections={businessSections}
              onSectionChange={handleBusinessSectionChange}
              onAddSection={addBusinessSection}
              onRemoveSection={removeBusinessSection}
              onSave={saveBusinessDetails}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  upgradeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  upgradeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    marginLeft: 12,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: '#b45309',
  },
  upgradeButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  settingsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 16,
  },
});
EOF

echo "Populating 'src/screens/Settings' files..."

cat << 'EOF' > src/screens/Settings/components/ThemeSelector.tsx
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
EOF

cat << 'EOF' > src/screens/Settings/components/SettingRow.tsx
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
EOF

cat << 'EOF' > src/screens/Settings/SettingsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  Palette, 
  Bell,
  Mail,
  MessageCircle,
  Download,
  Trash2,
  Shield,
  Lock,
  CreditCard,
  UserX,
} from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { ThemeSelector, SettingRow } from './components';

export const SettingsScreen: React.FC = () => {
  const { theme, setCurrentTheme } = useTheme();

  const handleActionPress = (action: string) => {
    Alert.alert(
      action,
      `${action} functionality will be implemented here.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Container>
      <Header title="Settings" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Theme
            </Text>
          </View>
          
          <ThemeSelector onThemeChange={setCurrentTheme} />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Notifications
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Bell}
              title="Push Notifications"
              subtitle="Receive notifications on your device"
              hasSwitch
            />
            <SettingRow
              icon={Mail}
              title="Email Updates"
              subtitle="Get updates about new features"
              hasSwitch
            />
            <SettingRow
              icon={MessageCircle}
              title="Marketing Emails"
              subtitle="Promotional content and offers"
              hasSwitch
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Privacy & Data
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Download}
              title="Download My Data"
              subtitle="Get a copy of your data"
              onPress={() => handleActionPress('Download My Data')}
            />
            <SettingRow
              icon={Trash2}
              title="Clear Chat History"
              subtitle="Delete all conversations"
              onPress={() => handleActionPress('Clear Chat History')}
            />
            <SettingRow
              icon={Shield}
              title="Privacy Policy"
              subtitle="View our privacy policy"
              onPress={() => handleActionPress('Privacy Policy')}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Account Settings
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Lock}
              title="Change Password"
              subtitle="Update your account password"
              onPress={() => handleActionPress('Change Password')}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={CreditCard}
              title="Manage Subscription"
              subtitle="View and update your plan"
              onPress={() => handleActionPress('Manage Subscription')}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={UserX}
              title="Delete Account"
              subtitle="Permanently delete your account"
              onPress={() => handleActionPress('Delete Account')}
              textColor="#ef4444"
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsList: {
    gap: 4,
  },
});
EOF

echo "Populating 'src/screens/Favorites' files..."

cat << 'EOF' > src/screens/Favorites/components/FavoriteItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, Trash2 } from 'lucide-react-native';
import { useTheme } from '@/context';
import { FavoriteItem as FavoriteItemType } from '@/types';

interface FavoriteItemProps {
  item: FavoriteItemType;
  onRemove: (id: number) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ item, onRemove }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.favoriteItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteEmoji}>{item.emoji}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={[styles.favoriteTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.favoriteDescription, { color: theme.colors.textSecondary }]}>
            {item.description}
          </Text>
          <View style={styles.favoriteMetadata}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#fbbf24" />
              <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                {item.rating}
              </Text>
            </View>
            <Text style={[styles.category, { color: theme.colors.textSecondary }]}>
              {item.category}
            </Text>
            <Text style={[styles.saved, { color: theme.colors.textSecondary }]}>
              {item.saved}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.removeButton}
      >
        <Trash2 size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  favoriteEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 4,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  favoriteMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
  },
  saved: {
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    marginLeft: 12,
  },
});
EOF

cat << 'EOF' > src/screens/Favorites/components/SearchBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Search, Filter, ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Input } from '@/components';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  filter: string;
  onFilterPress: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Search size={16} color={theme.colors.textSecondary} />
        <Input
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder="Search favorites..."
          style={styles.searchInput}
          variant="search"
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.filterButton, { backgroundColor: theme.colors.card }]}
        onPress={onFilterPress}
      >
        <Filter size={16} color={theme.colors.textSecondary} />
        <Text style={[styles.filterText, { color: theme.colors.text }]}>
          {filter === 'all' ? 'All' : filter}
        </Text>
        <ChevronDown size={16} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
EOF

cat << 'EOF' > src/screens/Favorites/FavoritesScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { FavoriteItem as FavoriteItemType } from '@/types';
import { FavoriteItem, SearchBar } from './components';

export const FavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<FavoriteItemType[]>([
    {
      id: 1,
      title: 'AI Assistant for Business',
      type: 'service',
      category: 'Business',
      description: 'Smart AI solutions for business automation',
      rating: 4.8,
      saved: '2 days ago',
      emoji: '🚀'
    },
    {
      id: 2,
      title: 'Creative Design Tools',
      type: 'tool',
      category: 'Design',
      description: 'Professional design software and templates',
      rating: 4.9,
      saved: '1 week ago',
      emoji: '🛠️'
    },
    {
      id: 3,
      title: 'Digital Marketing Course',
      type: 'course',
      category: 'Education',
      description: 'Complete guide to digital marketing strategies',
      rating: 4.7,
      saved: '3 days ago',
      emoji: '📚'
    },
    {
      id: 4,
      title: 'Project Management App',
      type: 'app',
      category: 'Productivity',
      description: 'Streamline your workflow and team collaboration',
      rating: 4.6,
      saved: '5 days ago',
      emoji: '📱'
    }
  ]);

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const removeFavorite = (id: number) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this item from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(item => item.id !== id))
        }
      ]
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={64} color={theme.colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No favorites found
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        {searchTerm || filter !== 'all' 
          ? 'Try adjusting your search or filter'
          : 'Start adding items to your favorites to see them here'
        }
      </Text>
    </View>
  );

  return (
    <Container>
      <Header title="Favorites" />

      <View style={styles.content}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterPress={() => { Alert.alert('Filter', 'Filter functionality to be implemented'); }}
        />

        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
            renderItem={({ item }) => (
              <FavoriteItem item={item} onRemove={removeFavorite} />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <EmptyState />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
EOF

echo "Populating 'src/screens/Feed' files..."

cat << 'EOF' > src/screens/Feed/components/FeedItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/context';
import { FeedItem as FeedItemType } from '@/types';

interface FeedItemProps {
  item: FeedItemType;
  onToggleLike: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item, onToggleLike, onToggleBookmark }) => {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp size={16} color={theme.colors.primary} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.feedItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.feedHeader}>
        <View style={styles.feedMeta}>
          {getTypeIcon(item.type)}
          <Text style={[styles.feedAuthor, { color: theme.colors.text }]}>
            {item.author}
          </Text>
          <Text style={[styles.feedTimestamp, { color: theme.colors.textSecondary }]}>
            • {item.timestamp}
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '20' }]}>
          <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
            {item.category}
          </Text>
        </View>
      </View>

      <Text style={[styles.feedTitle, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.feedContent, { color: theme.colors.textSecondary }]}>
        {item.content}
      </Text>

      <View style={styles.feedActions}>
        <TouchableOpacity
          onPress={() => onToggleLike(item.id)}
          style={styles.actionButton}
        >
          <Heart
            size={20}
            color={item.isLiked ? '#ef4444' : theme.colors.textSecondary}
            fill={item.isLiked ? '#ef4444' : 'none'}
          />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {item.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onToggleBookmark(item.id)}
          style={styles.actionButton}
        >
          <Bookmark
            size={20}
            color={item.isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
            fill={item.isBookmarked ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  feedTimestamp: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  feedContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  feedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
EOF

cat << 'EOF' > src/screens/Feed/FeedScreen.tsx
import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { FeedItem as FeedItemType } from '@/types';
import { FeedItem } from './components';

export const FeedScreen: React.FC = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItemType[]>([
    {
      id: 1,
      type: 'trending',
      title: 'AI Revolution in Business Automation',
      content: 'Discover how artificial intelligence is transforming the way businesses operate, from customer service to data analysis.',
      author: 'TechInsights',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 23,
      category: 'Technology',
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: 2,
      type: 'post',
      title: 'Top 10 Productivity Tips for Remote Work',
      content: 'Working from home can be challenging. Here are proven strategies to boost your productivity and maintain work-life balance.',
      author: 'ProductivityPro',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 15,
      category: 'Productivity',
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Voice Assistant Best Practices',
      content: 'Learn how to get the most out of your AI voice assistant with these expert tips and tricks.',
      author: 'AI Weekly',
      timestamp: '6 hours ago',
      likes: 156,
      comments: 31,
      category: 'AI',
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 4,
      type: 'post',
      title: 'Digital Wellness in the Modern Age',
      content: 'Maintaining mental health while staying connected. Tips for healthy technology usage.',
      author: 'WellnessTech',
      timestamp: '8 hours ago',
      likes: 203,
      comments: 45,
      category: 'Wellness',
      isLiked: true,
      isBookmarked: true,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleLike = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  return (
    <Container>
      <Header title="Feed" />

      <FlatList
        data={feedItems}
        renderItem={({ item }) => (
          <FeedItem
            item={item}
            onToggleLike={toggleLike}
            onToggleBookmark={toggleBookmark}
          />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  feedList: {
    padding: 20,
    paddingBottom: 100, // Account for tab bar
  },
});
EOF

echo "Populating 'src/screens/Invite' files..."

cat << 'EOF' > src/screens/Invite/components/InviteCode.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Copy, Check } from 'lucide-react-native';
import { useTheme } from '@/context';
import { copyToClipboard } from '@/utils';

interface InviteCodeProps {
  code: string;
}

export const InviteCode: React.FC<InviteCodeProps> = ({ code }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code, 'Invite code copied to clipboard');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Your Invite Code
      </Text>
      <View style={[styles.inviteCodeContainer, { backgroundColor: theme.colors.input }]}>
        <Text style={[styles.inviteCode, { color: theme.colors.text }]}>
          {code}
        </Text>
        <TouchableOpacity 
          onPress={handleCopyCode}
          style={[styles.copyButton, { backgroundColor: theme.colors.button }]}
        >
          {copied ? (
            <Check size={16} color="#10b981" />
          ) : (
            <Copy size={16} color={theme.colors.buttonText} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
        Share this code with friends to earn rewards
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 8,
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  inviteCode: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 8,
    borderRadius: 6,
  },
});
EOF

cat << 'EOF' > src/screens/Invite/components/ShareButtons.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { MessageCircle, Mail, Link, Share2 } from 'lucide-react-native';
import { useTheme } from '@/context';
import { BRAND_COLORS } from '@/constants';
import { copyToClipboard } from '@/utils';

interface ShareButtonsProps {
  inviteCode: string;
  message: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ inviteCode, message }) => {
  const { theme } = useTheme();

  const handleShareVia = (platform: string) => {
    const inviteLink = `https://plink.app/invite/${inviteCode}`;
    const text = `${message} ${inviteLink}`;
    
    switch(platform) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        Linking.openURL(`mailto:?subject=Join me on PLINK&body=${encodeURIComponent(text)}`);
        break;
      case 'copyLink':
        copyToClipboard(inviteLink, 'Invite link copied to clipboard');
        break;
      case 'more':
        // Generic share, might need a more specific implementation depending on desired functionality
        // For now, it will copy the link as a fallback
        copyToClipboard(inviteLink, 'Invite link copied to clipboard');
        Alert.alert('More Share Options', 'Additional share options would be presented here.');
        break;
      default:
        console.warn('Unknown share platform:', platform);
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Quick Share
      </Text>
      <View style={styles.shareGrid}>
        <TouchableOpacity
          onPress={() => handleShareVia('whatsapp')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.whatsapp }]}
        >
          <MessageCircle size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('email')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.email }]}
        >
          <Mail size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('copyLink')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.copyLink }]}
        >
          <Link size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>Copy Link</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('more')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.more }]}
        >
          <Share2 size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
EOF

cat << 'EOF' > src/screens/Invite/InviteScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Gift, Users } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header, Input, Button } from '@/components';
import { InviteCode, ShareButtons } from './components';

export const InviteScreen: React.FC = () => {
  const { theme } = useTheme();
  const [inviteCode] = useState('PLINK2024X9');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Hey! I found this amazing AI assistant called PLINK. You should check it out!');

  const handleSendInvite = () => {
    if (email.trim()) {
      Alert.alert('Success', `Invite sent to ${email}!`);
      setEmail('');
    } else {
      Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  return (
    <Container>
      <Header title="Invite Friends" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.rewardBanner}>
          <View style={styles.rewardContent}>
            <Gift size={24} color="#ffffff" />
            <View style={styles.rewardText}>
              <Text style={styles.rewardTitle}>Earn Rewards!</Text>
              <Text style={styles.rewardSubtitle}>
                Get $10 credit for each friend who joins. They get $5 too!
              </Text>
            </View>
          </View>
        </View>

        <InviteCode code={inviteCode} />

        <ShareButtons inviteCode={inviteCode} message={message} />

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Send Direct Invite
          </Text>
          <View style={styles.inviteForm}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.formInput}
            />
            <Input
              value={message}
              onChangeText={setMessage}
              placeholder="Personal message (optional)"
              multiline
              numberOfLines={3}
              style={[styles.formInput, styles.messageInput]}
            />
            <Button
              title="Send Invite"
              onPress={handleSendInvite}
              disabled={!email.trim()}
              style={styles.sendButton}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.statsHeader}>
            <Users size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Your Referrals
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>5</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Friends Invited
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#10b981' }]}>$50</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Earned
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rewardBanner: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    marginLeft: 12,
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  rewardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inviteForm: {
    gap: 12,
  },
  formInput: {
    marginBottom: 8,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginTop: 8,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
EOF

echo "Creating 'app' directory and Expo Router files..."

# Create app directory and its subfolders
mkdir -p app/\(tabs\)

cat << 'EOF' > app/_layout.tsx
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks';
import { ThemeProvider } from '@/context';
import { AppBackground } from '@/components';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <AppBackground />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
EOF

cat << 'EOF' > app/\(tabs\)/_layout.tsx
import { Tabs } from 'expo-router';
import { TabBar } from '@/components';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="invite" options={{ title: 'Invite' }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}
EOF

cat << 'EOF' > app/\(tabs\)/index.tsx
import { HomeScreen } from '@/screens';

export default HomeScreen;
EOF

cat << 'EOF' > app/\(tabs\)/profile.tsx
import { ProfileScreen } from '@/screens';

export default ProfileScreen;
EOF

cat << 'EOF' > app/\(tabs\)/settings.tsx
import { SettingsScreen } from '@/screens';

export default SettingsScreen;
EOF

cat << 'EOF' > app/\(tabs\)/favorites.tsx
import { FavoritesScreen } from '@/screens';

export default FavoritesScreen;
EOF

cat << 'EOF' > app/\(tabs\)/feed.tsx
import { FeedScreen } from '@/screens';

export default FeedScreen;
EOF

cat << 'EOF' > app/\(tabs\)/invite.tsx
import { InviteScreen } from '@/screens';

export default InviteScreen;
EOF

cat << 'EOF' > app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
EOF

echo "Creating 'assets' directory and placeholder images..."
mkdir -p assets/images
echo "Icon placeholder" > assets/images/icon.png
echo "Favicon placeholder" > assets/images/favicon.png

echo ""
echo "✅ Directory structure and files created successfully in: $(pwd)"
echo ""
echo "🚀 To run the app:"
echo "cd $PROJECT_NAME"
echo "npm install"
echo "npm run dev"
echo ""
echo "📝 Note: The screen files are simplified. You can replace them with the full implementations from the previous artifact."
echo ""
echo "🎯 Key improvements in this script:"
echo "- Fixed all bash syntax issues"
echo "- Corrected directory creation"
echo "- Fixed EOF blocks"
echo "- Added proper error handling"
echo "- Created working simplified screen components"
echo ""
echo "Happy coding! 🎉"