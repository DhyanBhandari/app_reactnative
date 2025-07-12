import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  ChevronLeft, 
  Palette, 
  Sun, 
  Moon, 
  Circle, 
  Smartphone, 
  Check,
  Bell,
  Mail,
  MessageCircle,
  Download,
  Trash2,
  Shield,
  Lock,
  CreditCard,
  UserX,
  ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { theme, currentTheme, setCurrentTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'ios-glass', label: 'iOS Glass', icon: Circle },
    { value: 'system', label: 'System Default', icon: Smartphone },
  ];

  const handleThemeChange = (themeValue: string) => {
    setCurrentTheme(themeValue);
  };

  const handleActionPress = (action: string) => {
    Alert.alert(
      action,
      `${action} functionality will be implemented here.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, theme.blur && styles.headerBlur]}>
        {theme.blur ? (
          <BlurView
            style={StyleSheet.absoluteFillObject}
            intensity={20}
            tint={currentTheme === 'dark' ? 'dark' : 'light'}
          />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
        )}
        
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: theme.colors.button }]}
        >
          <ChevronLeft size={24} color={theme.colors.buttonText} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Settings
        </Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Theme
            </Text>
          </View>
          
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleThemeChange(option.value)}
                  style={[
                    styles.themeOption,
                    currentTheme === option.value && { backgroundColor: theme.colors.primary + '20' }
                  ]}
                >
                  <IconComponent 
                    size={20} 
                    color={currentTheme === option.value ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.themeOptionText,
                    { color: currentTheme === option.value ? theme.colors.primary : theme.colors.text }
                  ]}>
                    {option.label}
                  </Text>
                  {currentTheme === option.value && (
                    <Check size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
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
              theme={theme}
            />
            <SettingRow
              icon={Mail}
              title="Email Updates"
              subtitle="Get updates about new features"
              hasSwitch
              theme={theme}
            />
            <SettingRow
              icon={MessageCircle}
              title="Marketing Emails"
              subtitle="Promotional content and offers"
              hasSwitch
              theme={theme}
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
              theme={theme}
            />
            <SettingRow
              icon={Trash2}
              title="Clear Chat History"
              subtitle="Delete all conversations"
              onPress={() => handleActionPress('Clear Chat History')}
              theme={theme}
            />
            <SettingRow
              icon={Shield}
              title="Privacy Policy"
              subtitle="View our privacy policy"
              onPress={() => handleActionPress('Privacy Policy')}
              theme={theme}
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
              theme={theme}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={CreditCard}
              title="Manage Subscription"
              subtitle="View and update your plan"
              onPress={() => handleActionPress('Manage Subscription')}
              theme={theme}
              textColor={theme.colors.primary}
            />
            <SettingRow
              icon={UserX}
              title="Delete Account"
              subtitle="Permanently delete your account"
              onPress={() => handleActionPress('Delete Account')}
              theme={theme}
              textColor="#ef4444"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingRowProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  theme: any;
  textColor?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  hasSwitch, 
  onPress, 
  theme, 
  textColor 
}) => {
  const [switchValue, setSwitchValue] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={hasSwitch}
    >
      <Icon size={20} color={textColor || theme.colors.textSecondary} />
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: textColor || theme.colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={setSwitchValue}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary + '40' }}
          thumbColor={switchValue ? theme.colors.primary : '#f4f3f4'}
        />
      ) : (
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
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
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  themeOptionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  settingsList: {
    gap: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
});