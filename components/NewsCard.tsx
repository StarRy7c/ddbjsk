import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Post } from '../types';

interface NewsCardProps {
  post: Post;
  variant?: 'compact' | 'standard';
}

const NewsCard: React.FC<NewsCardProps> = ({ post, variant = 'standard' }) => {
  const displayImage = post.images && post.images.length > 0 
    ? post.images[0] 
    : 'https://via.placeholder.com/800x600?text=No+Image';

  if (variant === 'compact') {
    return (
      <Link to={`/post/${post.id}`} className="group flex space-x-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md relative">
          <img 
            src={displayImage} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-cric-green uppercase">{post.category}</span>
          <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-cric-green transition-colors mt-1 mb-2 line-clamp-2">
            {post.title}
          </h4>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={displayImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-800 rounded-sm">
          {post.category}
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
          <span className="text-cric-green font-medium">{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 group-hover:text-cric-green transition-colors leading-tight line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        <Link 
          to={`/post/${post.id}`}
          className="inline-flex items-center text-sm font-semibold text-cric-green group-hover:text-emerald-700 transition-colors"
        >
          Read Full Story <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;