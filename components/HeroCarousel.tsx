import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Post } from '../types';

interface HeroCarouselProps {
  posts: Post[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ensure we don't break if posts is empty
  const safePosts = posts.length > 0 ? posts : [];

  useEffect(() => {
    if (safePosts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safePosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [safePosts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % safePosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + safePosts.length) % safePosts.length);
  };

  if (safePosts.length === 0) return null;

  const currentPost = safePosts[currentIndex];
  const displayImage = currentPost.images && currentPost.images.length > 0 
    ? currentPost.images[0] 
    : 'https://via.placeholder.com/1600x900?text=No+Image';

  return (
    <div className="relative w-full h-[500px] overflow-hidden group bg-gray-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform hover:scale-105"
        style={{ backgroundImage: `url(${displayImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white max-w-4xl">
        <span className="inline-block px-3 py-1 bg-cric-green text-xs font-bold uppercase tracking-wider mb-3 rounded-sm">
          {currentPost.category}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-4 drop-shadow-lg">
          <Link to={`/post/${currentPost.id}`} className="hover:text-cric-accent transition-colors">
            {currentPost.title}
          </Link>
        </h2>
        <p className="text-gray-200 text-lg md:text-xl line-clamp-2 mb-4 max-w-2xl drop-shadow-md">
          {currentPost.excerpt}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <span className="font-medium text-cric-accent">{currentPost.author}</span>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(currentPost.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      {safePosts.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-cric-green p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-cric-green p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute top-6 right-6 flex space-x-2">
            {safePosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-cric-green w-6' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;