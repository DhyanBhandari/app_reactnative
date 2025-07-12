import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/context';
import { Container, Header } from '@/components';
import { FavoriteItem as FavoriteItemType } from '@/types';
import { FavoriteItem, SearchBar } from './components';

export const FavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<FavoriteItemType[]>([
    {
      id: 1,
      title: 'AI Assistant for Business',
      type: 'service',
      category: 'Business',
      description: 'Smart AI solutions for business automation',
      rating: 4.8,
      saved: '2 days ago',
      emoji: '🚀'
    },
    {
      id: 2,
      title: 'Creative Design Tools',
      type: 'tool',
      category: 'Design',
      description: 'Professional design software and templates',
      rating: 4.9,
      saved: '1 week ago',
      emoji: '🛠️'
    },
    {
      id: 3,
      title: 'Digital Marketing Course',
      type: 'course',
      category: 'Education',
      description: 'Complete guide to digital marketing strategies',
      rating: 4.7,
      saved: '3 days ago',
      emoji: '📚'
    },
    {
      id: 4,
      title: 'Project Management App',
      type: 'app',
      category: 'Productivity',
      description: 'Streamline your workflow and team collaboration',
      rating: 4.6,
      saved: '5 days ago',
      emoji: '📱'
    }
  ]);

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const removeFavorite = (id: number) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this item from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(item => item.id !== id))
        }
      ]
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={64} color={theme.colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No favorites found
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        {searchTerm || filter !== 'all' 
          ? 'Try adjusting your search or filter'
          : 'Start adding items to your favorites to see them here'
        }
      </Text>
    </View>
  );

  return (
    <Container>
      <Header title="Favorites" />

      <View style={styles.content}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterPress={() => { Alert.alert('Filter', 'Filter functionality to be implemented'); }}
        />

        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
            renderItem={({ item }) => (
              <FavoriteItem item={item} onRemove={removeFavorite} />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <EmptyState />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
