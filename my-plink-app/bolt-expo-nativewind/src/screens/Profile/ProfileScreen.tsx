import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, Star } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { BusinessSection } from '@/types';
import { UserInfo, ModeToggle, BusinessForm } from './components';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const [isUserMode, setIsUserMode] = useState(true);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [businessSections, setBusinessSections] = useState<BusinessSection[]>([
    { id: 'name', label: 'Business Name', value: '', type: 'text' },
    { id: 'description', label: 'Description', value: '', type: 'textarea' },
  ]);

  const handleBusinessSectionChange = (id: string, field: keyof BusinessSection, value: string) => {
    setBusinessSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addBusinessSection = () => {
    setBusinessSections(prevSections => [
      ...prevSections,
      { id: Date.now().toString(), label: 'New Field', value: '', type: 'text' }
    ]);
  };

  const removeBusinessSection = (id: string) => {
    setBusinessSections(prevSections => 
      prevSections.filter(section => section.id !== id)
    );
  };

  const saveBusinessDetails = () => {
    Alert.alert('Success', 'Business details saved successfully!');
  };

  return (
    <Container>
      <Header title="Profile" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <UserInfo isUserMode={isUserMode} />

        <ModeToggle isUserMode={isUserMode} onModeChange={setIsUserMode} />

        {!hasUpgradedPlan && (
          <View style={styles.upgradeSection}>
            <View style={styles.upgradeContent}>
              <Star size={24} color="#f59e0b" />
              <View style={styles.upgradeText}>
                <Text style={styles.upgradeTitle}>Upgrade Your Plan</Text>
                <Text style={styles.upgradeSubtitle}>
                  Unlock more features and benefits!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setHasUpgradedPlan(true)}
              style={styles.upgradeButton}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.settingsSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {isUserMode ? 'Personal Settings' : 'Business Details'}
          </Text>
          
          {isUserMode ? (
            <View style={styles.settingsContent}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Language
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  <Text style={[styles.pickerText, { color: theme.colors.text }]}>
                    English
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  Default Tone
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  <Text style={[styles.pickerText, { color: theme.colors.text }]}>
                    Friendly
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
            </View>
          ) : (
            <BusinessForm
              businessSections={businessSections}
              onSectionChange={handleBusinessSectionChange}
              onAddSection={addBusinessSection}
              onRemoveSection={removeBusinessSection}
              onSave={saveBusinessDetails}
            />
          )}
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
  upgradeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  upgradeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    marginLeft: 12,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: '#b45309',
  },
  upgradeButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  settingsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 16,
  },
});
