export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  images: string[]; // Changed from imageUrl to array of strings (Base64 or URLs)
  author: string;
  date: string;
  isTop: boolean;
  category: 'Match Report' | 'News' | 'Opinion' | 'Interview' | 'Stats';
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}