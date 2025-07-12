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
