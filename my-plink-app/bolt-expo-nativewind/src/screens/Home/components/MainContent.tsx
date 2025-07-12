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
