import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Copy, Check } from 'lucide-react-native';
import { useTheme } from '@/context';
import { copyToClipboard } from '@/utils';

interface InviteCodeProps {
  code: string;
}

export const InviteCode: React.FC<InviteCodeProps> = ({ code }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code, 'Invite code copied to clipboard');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Your Invite Code
      </Text>
      <View style={[styles.inviteCodeContainer, { backgroundColor: theme.colors.input }]}>
        <Text style={[styles.inviteCode, { color: theme.colors.text }]}>
          {code}
        </Text>
        <TouchableOpacity 
          onPress={handleCopyCode}
          style={[styles.copyButton, { backgroundColor: theme.colors.button }]}
        >
          {copied ? (
            <Check size={16} color="#10b981" />
          ) : (
            <Copy size={16} color={theme.colors.buttonText} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
        Share this code with friends to earn rewards
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 8,
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  inviteCode: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 8,
    borderRadius: 6,
  },
});
