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
