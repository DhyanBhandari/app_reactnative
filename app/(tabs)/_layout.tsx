import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Menu, User, Heart, Rss } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { theme, currentTheme } = useTheme();

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 25,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarActiveTintColor: theme.colors.primary,
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive,
              { backgroundColor: focused ? theme.colors.primary + '20' : 'transparent' }
            ]}>
              <Menu 
                size={focused ? size + 2 : size} 
                color={color} 
                style={[
                  styles.icon,
                  focused && styles.iconActive
                ]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive,
              { backgroundColor: focused ? theme.colors.primary + '20' : 'transparent' }
            ]}>
              <Heart 
                size={focused ? size + 2 : size} 
                color={color}
                style={[
                  styles.icon,
                  focused && styles.iconActive
                ]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive,
              { backgroundColor: focused ? theme.colors.primary + '20' : 'transparent' }
            ]}>
              <User 
                size={focused ? size + 2 : size} 
                color={color}
                style={[
                  styles.icon,
                  focused && styles.iconActive
                ]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive,
              { backgroundColor: focused ? theme.colors.primary + '20' : 'transparent' }
            ]}>
              <Rss 
                size={focused ? size + 2 : size} 
                color={color}
                style={[
                  styles.icon,
                  focused && styles.iconActive
                ]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  iconContainerActive: {
    transform: [{ scale: 1.1 }],
  },
  icon: {
    transition: 'all 0.2s ease',
  },
  iconActive: {
    transform: [{ scale: 1.05 }],
  },
});