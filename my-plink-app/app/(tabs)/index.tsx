import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Headphones, Mic, Send, Menu } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function HomeScreen() {
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
  }, [pulseAnim]);

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
  }, [isListening, startPulseAnimation]);

  const handleStopListening = useCallback(() => {
    setIsListening(false);
    setIsRecording(false);
    pulseAnim.setValue(1);
    waveAnim.setValue(0);
    
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

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      {theme.blur ? (
        <BlurView
          style={[
            styles.messageBlur,
            item.sender === 'user' ? styles.userMessageBlur : styles.aiMessageBlur
          ]}
          intensity={10}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        >
          <Text style={[styles.messageText, { color: theme.colors.text }]}>
            {item.text}
          </Text>
        </BlurView>
      ) : (
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
      )}
    </View>
  );

  const MainContent = () => {
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
            <TouchableOpacity onPress={handlePersonClick} style={styles.micButtonInner}>
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
                transform: [
                  {
                    translateY: transcriptAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
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
          onPress={handlePersonClick}
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
          <MainContent />
        </View>

        <View style={[styles.chatInputContainer, { backgroundColor: theme.colors.surface }]}>
          <TextInput
            value={chatText}
            onChangeText={setChatText}
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
            onSubmitEditing={handleChatSubmit}
          />
          {chatText.trim() && (
            <TouchableOpacity 
              onPress={handleChatSubmit}
              style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
            >
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  defaultContainer: {
    alignItems: 'center',
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
    alignItems: 'center',
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
    marginBottom: 16,
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
  messageBlur: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
  },
  userMessageBlur: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
  },
  aiMessageBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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