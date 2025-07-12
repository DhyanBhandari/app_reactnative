import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/context';
import { FeedItem as FeedItemType } from '@/types';

interface FeedItemProps {
  item: FeedItemType;
  onToggleLike: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item, onToggleLike, onToggleBookmark }) => {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp size={16} color={theme.colors.primary} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.feedItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.feedHeader}>
        <View style={styles.feedMeta}>
          {getTypeIcon(item.type)}
          <Text style={[styles.feedAuthor, { color: theme.colors.text }]}>
            {item.author}
          </Text>
          <Text style={[styles.feedTimestamp, { color: theme.colors.textSecondary }]}>
            • {item.timestamp}
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '20' }]}>
          <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
            {item.category}
          </Text>
        </View>
      </View>

      <Text style={[styles.feedTitle, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.feedContent, { color: theme.colors.textSecondary }]}>
        {item.content}
      </Text>

      <View style={styles.feedActions}>
        <TouchableOpacity
          onPress={() => onToggleLike(item.id)}
          style={styles.actionButton}
        >
          <Heart
            size={20}
            color={item.isLiked ? '#ef4444' : theme.colors.textSecondary}
            fill={item.isLiked ? '#ef4444' : 'none'}
          />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {item.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onToggleBookmark(item.id)}
          style={styles.actionButton}
        >
          <Bookmark
            size={20}
            color={item.isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
            fill={item.isBookmarked ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  feedTimestamp: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  feedContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  feedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
