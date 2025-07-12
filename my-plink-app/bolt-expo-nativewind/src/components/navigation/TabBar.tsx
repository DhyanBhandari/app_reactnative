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
