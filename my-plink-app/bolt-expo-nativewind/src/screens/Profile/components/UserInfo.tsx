import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context';

interface UserInfoProps {
  isUserMode: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({ isUserMode }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.userInfoSection}>
      <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.avatarText}>
          {isUserMode ? 'U' : 'B'}
        </Text>
      </View>
      <View style={styles.userDetails}>
        <Text style={[styles.userName, { color: theme.colors.text }]}>
          {isUserMode ? 'User Name' : 'Business Name'}
        </Text>
        <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
          {isUserMode ? 'user@example.com' : 'business@example.com'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
});
