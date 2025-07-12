export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface FavoriteItem {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  rating: number;
  saved: string;
  emoji: string;
}

export interface FeedItem {
  id: number;
  type: 'post' | 'trending' | 'recommendation';
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface BusinessSection {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}
