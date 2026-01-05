import { Post } from '../types';
import { MOCK_POSTS } from '../constants';

const POSTS_KEY = 'cricpulse_posts';

export const getPosts = (): Post[] => {
  const stored = localStorage.getItem(POSTS_KEY);
  if (!stored) {
    // Seed initial data
    localStorage.setItem(POSTS_KEY, JSON.stringify(MOCK_POSTS));
    return MOCK_POSTS;
  }
  return JSON.parse(stored);
};

export const savePost = (post: Post): void => {
  const posts = getPosts();
  const newPosts = [post, ...posts];
  localStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
};

export const deletePost = (id: string): void => {
  const posts = getPosts();
  const newPosts = posts.filter(p => p.id !== id);
  localStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
};
