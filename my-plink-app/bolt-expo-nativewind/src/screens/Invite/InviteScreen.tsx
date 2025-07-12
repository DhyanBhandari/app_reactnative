import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Gift, Users } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header, Input, Button } from '@/components';
import { InviteCode, ShareButtons } from './components';

export const InviteScreen: React.FC = () => {
  const { theme } = useTheme();
  const [inviteCode] = useState('PLINK2024X9');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Hey! I found this amazing AI assistant called PLINK. You should check it out!');

  const handleSendInvite = () => {
    if (email.trim()) {
      Alert.alert('Success', `Invite sent to ${email}!`);
      setEmail('');
    } else {
      Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  return (
    <Container>
      <Header title="Invite Friends" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.rewardBanner}>
          <View style={styles.rewardContent}>
            <Gift size={24} color="#ffffff" />
            <View style={styles.rewardText}>
              <Text style={styles.rewardTitle}>Earn Rewards!</Text>
              <Text style={styles.rewardSubtitle}>
                Get $10 credit for each friend who joins. They get $5 too!
              </Text>
            </View>
          </View>
        </View>

        <InviteCode code={inviteCode} />

        <ShareButtons inviteCode={inviteCode} message={message} />

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Send Direct Invite
          </Text>
          <View style={styles.inviteForm}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.formInput}
            />
            <Input
              value={message}
              onChangeText={setMessage}
              placeholder="Personal message (optional)"
              multiline
              numberOfLines={3}
              style={[styles.formInput, styles.messageInput]}
            />
            <Button
              title="Send Invite"
              onPress={handleSendInvite}
              disabled={!email.trim()}
              style={styles.sendButton}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.statsHeader}>
            <Users size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Your Referrals
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>5</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Friends Invited
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#10b981' }]}>$50</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Earned
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rewardBanner: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    marginLeft: 12,
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  rewardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
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
  inviteForm: {
    gap: 12,
  },
  formInput: {
    marginBottom: 8,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginTop: 8,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
