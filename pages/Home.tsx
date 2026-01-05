import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/storage';
import { Post } from '../types';
import HeroCarousel from '../components/HeroCarousel';
import NewsCard from '../components/NewsCard';
import { Zap, TrendingUp, Calendar, Trophy } from 'lucide-react';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Load posts from "database"
    const loadedPosts = getPosts();
    // Sort by date descending
    const sorted = [...loadedPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(sorted);
  }, []);

  // Filter Data
  const carouselPosts = posts.filter(p => p.isTop).slice(0, 5);
  const topStories = posts.filter(p => p.isTop).slice(0, 5); // Used for "Top 5" section below carousel
  const latestNews = posts.filter(p => !p.isTop).slice(0, 6);
  const editorPicks = posts.slice(2, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Hero Auto Carousel */}
      <section className="mb-8">
        <HeroCarousel posts={carouselPosts.length > 0 ? carouselPosts : posts.slice(0, 3)} />
      </section>

      {/* Live Ticker Mock */}
      <div className="bg-cric-dark text-white py-2 overflow-hidden whitespace-nowrap mb-8 border-y-4 border-cric-green">
        <div className="inline-block animate-marquee pl-10">
          <span className="mx-4 font-mono font-bold text-cric-accent">LIVE:</span> IND vs AUS, 4th Test - Lunch Break, Day 3
          <span className="mx-4 text-gray-500">|</span>
          <span className="mx-4 font-mono font-bold text-cric-accent">RESULT:</span> ENG beat SA by 3 wickets
          <span className="mx-4 text-gray-500">|</span>
          <span className="mx-4 font-mono font-bold text-cric-accent">UPDATE:</span> Bumrah rests for T20 Series
          <span className="mx-4 text-gray-500">|</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. Top 5 Latest Posts Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Trophy className="text-cric-green" size={28} />
            <h2 className="text-3xl font-bold font-serif text-gray-900">Top Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured (First of Top 5) */}
            {topStories[0] && (
              <div className="lg:col-span-8">
                <NewsCard post={topStories[0]} />
              </div>
            )}
            
            {/* Side List (Rest of Top 5) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              {topStories.slice(1).map(post => (
                <NewsCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Latest News Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Zap className="text-cric-green" size={28} />
              <h2 className="text-3xl font-bold font-serif text-gray-900">Just In</h2>
            </div>
            <button className="text-cric-green font-semibold hover:text-emerald-700">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map(post => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* 4. Newsletter / Feature Section */}
        <section className="bg-cric-dark rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cric-green rounded-full opacity-20 blur-3xl"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Never Miss a Delivery</h3>
              <p className="text-gray-300 mb-6">Subscribe to our newsletter for daily match reports, stats analysis, and exclusive interviews delivered straight to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cric-green flex-1"
                />
                <button className="bg-cric-green hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Abstract Visual */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 h-32 rounded-lg animate-pulse"></div>
                <div className="bg-gray-800 h-32 rounded-lg animate-pulse delay-75"></div>
                <div className="bg-gray-800 h-32 rounded-lg animate-pulse delay-150"></div>
                <div className="bg-gray-800 h-32 rounded-lg animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Editor's Picks (More Sections) */}
        <section className="mb-16">
           <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="text-cric-green" size={28} />
            <h2 className="text-3xl font-bold font-serif text-gray-900">Editor's Picks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editorPicks.map((post, index) => {
              const displayImage = post.images && post.images.length > 0 ? post.images[0] : 'https://via.placeholder.com/150';
              return (
                <div key={post.id} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-6`}>
                   <div className="flex-1">
                     <span className="text-cric-green text-xs font-bold uppercase mb-2 block">{post.category}</span>
                     <h3 className="text-xl font-bold mb-3 hover:text-cric-green transition-colors cursor-pointer">{post.title}</h3>
                     <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                   </div>
                   <div className="w-1/3 flex-shrink-0 h-32">
                      <img src={displayImage} className="w-full h-full object-cover rounded-lg" alt="" />
                   </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;