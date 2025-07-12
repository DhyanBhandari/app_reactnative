import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  Palette, 
  Bell,
  Mail,
  MessageCircle,
  Download,
  Trash2,
  Shield,
  Lock,
  CreditCard,
  UserX,
} from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { ThemeSelector, SettingRow } from './components';

export const SettingsScreen: React.FC = () => {
  const { theme, setCurrentTheme } = useTheme();

  const handleActionPress = (action: string) => {
    Alert.alert(
      action,
      `${action} functionality will be implemented here.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Container>
      <Header title="Settings" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Theme
            </Text>
          </View>
          
          <ThemeSelector onThemeChange={setCurrentTheme} />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Notifications
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Bell}
              title="Push Notifications"
              subtitle="Receive notifications on your device"
              hasSwitch
            />
            <SettingRow
              icon={Mail}
              title="Email Updates"
              subtitle="Get updates about new features"
              hasSwitch
            />
            <SettingRow
              icon={MessageCircle}
              title="Marketing Emails"
              subtitle="Promotional content and offers"
              hasSwitch
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Privacy & Data
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Download}
              title="Download My Data"
              subtitle="Get a copy of your data"
              onPress={() => handleActionPress('Download My Data')}
            />
            <SettingRow
              icon={Trash2}
              title="Clear Chat History"
              subtitle="Delete all conversations"
              onPress={() => handleActionPress('Clear Chat History')}
            />
            <SettingRow
              icon={Shield}
              title="Privacy Policy"
              subtitle="View our privacy policy"
              onPress={() => handleActionPress('Privacy Policy')}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Account Settings
          </Text>
          
          <View style={styles.settingsList}>
            <SettingRow
              icon={Lock}
              title="Change Password"
              subtitle="Update your account password"
              onPress={() => handleActionPress('Change Password')}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={CreditCard}
              title="Manage Subscription"
              subtitle="View and update your plan"
              onPress={() => handleActionPress('Manage Subscription')}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={UserX}
              title="Delete Account"
              subtitle="Permanently delete your account"
              onPress={() => handleActionPress('Delete Account')}
              textColor="#ef4444"
            />
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
  section: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsList: {
    gap: 4,
  },
});
