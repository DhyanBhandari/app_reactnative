import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { FeedItem as FeedItemType } from '@/types';
import { FeedItem } from './components';

export const FeedScreen: React.FC = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItemType[]>([
    {
      id: 1,
      type: 'trending',
      title: 'AI Revolution in Business Automation',
      content: 'Discover how artificial intelligence is transforming the way businesses operate, from customer service to data analysis.',
      author: 'TechInsights',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 23,
      category: 'Technology',
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: 2,
      type: 'post',
      title: 'Top 10 Productivity Tips for Remote Work',
      content: 'Working from home can be challenging. Here are proven strategies to boost your productivity and maintain work-life balance.',
      author: 'ProductivityPro',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 15,
      category: 'Productivity',
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Voice Assistant Best Practices',
      content: 'Learn how to get the most out of your AI voice assistant with these expert tips and tricks.',
      author: 'AI Weekly',
      timestamp: '6 hours ago',
      likes: 156,
      comments: 31,
      category: 'AI',
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 4,
      type: 'post',
      title: 'Digital Wellness in the Modern Age',
      content: 'Maintaining mental health while staying connected. Tips for healthy technology usage.',
      author: 'WellnessTech',
      timestamp: '8 hours ago',
      likes: 203,
      comments: 45,
      category: 'Wellness',
      isLiked: true,
      isBookmarked: true,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleLike = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  return (
    <Container>
      <Header title="Feed" />

      <FlatList
        data={feedItems}
        renderItem={({ item }) => (
          <FeedItem
            item={item}
            onToggleLike={toggleLike}
            onToggleBookmark={toggleBookmark}
          />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  feedList: {
    padding: 20,
    paddingBottom: 100, // Account for tab bar
  },
});
