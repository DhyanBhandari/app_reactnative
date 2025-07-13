/**
 * @file components/ChatInput.tsx
 * @description Animated chat input component with send functionality
 * @features - Keyboard aware, smooth animation, absolute positioning
 */

import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface ChatInputProps {
  chatText: string;
  setChatText: (text: string) => void;
  isChatFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: () => void;
  chatInputHeight: Animated.Value;
  keyboardOffset: Animated.Value;
}

export default function ChatInput({
  chatText,
  setChatText,
  isChatFocused,
  onFocus,
  onBlur,
  onSubmit,
  chatInputHeight,
  keyboardOffset,
}: ChatInputProps) {
  const { theme } = useTheme();

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
          transform: [
            {
              translateY: Animated.multiply(keyboardOffset, -1),
            },
          ],
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={styles.keyboardAvoider}
      >
        <Animated.View style={[styles.inputContainer, { height: chatInputHeight }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
              isChatFocused && {
                borderColor: theme.colors.primary,
                shadowColor: theme.colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              },
            ]}
            placeholder="Type your message..."
            placeholderTextColor={theme.colors.textSecondary}
            value={chatText}
            onChangeText={setChatText}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline
            returnKeyType="send"
            onSubmitEditing={onSubmit}
          />
          {chatText.trim() !== '' && (
            <TouchableOpacity
              onPress={onSubmit}
              style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    width: '100%',
    backgroundColor: 'transparent',
  },
  keyboardAvoider: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
