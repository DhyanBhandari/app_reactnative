import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Search, Filter, ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Input } from '@/components';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  filter: string;
  onFilterPress: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Search size={16} color={theme.colors.textSecondary} />
        <Input
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder="Search favorites..."
          style={styles.searchInput}
          variant="search"
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.filterButton, { backgroundColor: theme.colors.card }]}
        onPress={onFilterPress}
      >
        <Filter size={16} color={theme.colors.textSecondary} />
        <Text style={[styles.filterText, { color: theme.colors.text }]}>
          {filter === 'all' ? 'All' : filter}
        </Text>
        <ChevronDown size={16} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
