import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, Trash2 } from 'lucide-react-native';
import { useTheme } from '@/context';
import { FavoriteItem as FavoriteItemType } from '@/types';

interface FavoriteItemProps {
  item: FavoriteItemType;
  onRemove: (id: number) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ item, onRemove }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.favoriteItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteEmoji}>{item.emoji}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={[styles.favoriteTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.favoriteDescription, { color: theme.colors.textSecondary }]}>
            {item.description}
          </Text>
          <View style={styles.favoriteMetadata}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#fbbf24" />
              <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                {item.rating}
              </Text>
            </View>
            <Text style={[styles.category, { color: theme.colors.textSecondary }]}>
              {item.category}
            </Text>
            <Text style={[styles.saved, { color: theme.colors.textSecondary }]}>
              {item.saved}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.removeButton}
      >
        <Trash2 size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  favoriteEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 4,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  favoriteMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
  },
  saved: {
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    marginLeft: 12,
  },
});
