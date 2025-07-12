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
