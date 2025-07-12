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
