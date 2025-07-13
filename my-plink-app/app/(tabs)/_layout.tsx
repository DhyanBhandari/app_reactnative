/**
 * @file app/(tabs)/_layout.tsx
 * @description FINAL CLEAN VERSION - Only 4 tabs, no extras
 * @features - Absolutely only Home, Favorites, Profile, Feed
 */

import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { User, Heart, Rss } from 'lucide-react-native';
import { View, StyleSheet, Image } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { theme, currentTheme } = useTheme();

  const TabBarBackground = () => {
    if (theme.blur) {
      return (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={theme.blurIntensity}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      );
    }
    return (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: theme.colors.background }
        ]}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {/* TAB 1: HOME (with custom PNG icon) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png',
              }}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#14b8a6' : color,
              }}
              resizeMode="contain"
            />
          ),
          tabBarActiveTintColor: '#14b8a6',
        }}
      />

      {/* TAB 2: FAVORITES */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
          tabBarActiveTintColor: '#ef4444',
        }}
      />

      {/* TAB 3: PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
          tabBarActiveTintColor: '#8b5cf6',
        }}
      />

      {/* TAB 4: FEED */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ size, color }) => (
            <Rss size={size} color={color} />
          ),
          tabBarActiveTintColor: '#60a5fa',
        }}
      />

      {/* 
        NO MORE TABS! 
        NO settings.tsx
        NO invite.tsx
        NO SettingsScreen.tsx
        NO InviteScreen.tsx
        NOTHING ELSE IN THIS FOLDER!
      */}
    </Tabs>
  );
}
