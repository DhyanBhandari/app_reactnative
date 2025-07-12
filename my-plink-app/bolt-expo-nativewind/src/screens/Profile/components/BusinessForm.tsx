import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { useTheme } from '@/context';
import { BusinessSection } from '@/types';
import { Button } from '@/components';

interface BusinessFormProps {
  businessSections: BusinessSection[];
  onSectionChange: (id: string, field: keyof BusinessSection, value: string) => void;
  onAddSection: () => void;
  onRemoveSection: (id: string) => void;
  onSave: () => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  businessSections,
  onSectionChange,
  onAddSection,
  onRemoveSection,
  onSave,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.businessContent}>
      {businessSections.map((section) => (
        <View key={section.id} style={[styles.businessSection, { borderColor: theme.colors.border }]}>
          <View style={styles.businessSectionHeader}>
            <TextInput
              value={section.label}
              onChangeText={(value) => onSectionChange(section.id, 'label', value)}
              style={[styles.businessLabelInput, { 
                backgroundColor: theme.colors.input,
                color: theme.colors.text 
              }]}
              placeholder="Field Label"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity
              onPress={() => onRemoveSection(section.id)}
              style={styles.removeButton}
            >
              <X size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            value={section.value}
            onChangeText={(value) => onSectionChange(section.id, 'value', value)}
            style={[styles.businessValueInput, { 
              backgroundColor: theme.colors.input,
              color: theme.colors.text 
            }]}
            placeholder={`Enter ${section.label.toLowerCase()}`}
            placeholderTextColor={theme.colors.textSecondary}
            multiline={section.type === 'textarea'}
            numberOfLines={section.type === 'textarea' ? 3 : 1}
          />
        </View>
      ))}
      
      <TouchableOpacity
        onPress={onAddSection}
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
      >
        <Plus size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>Add New Field</Text>
      </TouchableOpacity>
      
      <Button
        title="Save Business Details"
        onPress={onSave}
        variant="primary"
        style={styles.saveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  businessContent: {
    gap: 16,
  },
  businessSection: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  businessSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessLabelInput: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    marginRight: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessValueInput: {
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    minHeight: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 8,
  },
});
