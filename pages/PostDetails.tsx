import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/storage';
import { Post } from '../types';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Link as LinkIcon, Smartphone } from 'lucide-react';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = getPosts();
    const found = posts.find(p => p.id === id);
    setPost(found || null);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy') => {
    const url = window.location.href;
    const text = post ? `Check out this article on CricPulse: ${post.title}` : 'Check out this cricket news!';

    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
        case 'copy':
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
            break;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <Link to="/" className="text-cric-green hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const displayImage = post.images && post.images.length > 0 ? post.images[0] : 'https://via.placeholder.com/1600x900';

  // Function to parse content and replace <imageX> tags with actual images
  const renderContent = (content: string, images: string[]) => {
    // Split by the custom tag pattern <imageX>
    const parts = content.split(/(<image\d+>)/g);

    return parts.map((part, index) => {
        // Check if part matches <imageX>
        const match = part.match(/<image(\d+)>/);
        
        if (match) {
            const imgIndex = parseInt(match[1]) - 1; // 1-based index to 0-based
            if (images && images[imgIndex]) {
                return (
                    <figure key={index} className="my-8">
                        <img 
                            src={images[imgIndex]} 
                            alt={`Illustration ${imgIndex + 1}`} 
                            className="w-full h-auto rounded-lg shadow-md" 
                        />
                    </figure>
                );
            }
            return null; // Tag exists but image doesn't
        }

        // Render text paragraphs (handling new lines)
        if (part.trim() === '') return null;

        return (
            <div key={index} className="mb-6 text-gray-800 leading-relaxed whitespace-pre-line">
                {part}
            </div>
        );
    });
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full h-[60vh] relative">
        <img src={displayImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto p-6 md:p-8 text-white">
          <span className="inline-block bg-cric-green px-3 py-1 rounded-sm text-sm font-bold uppercase mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span className="font-medium text-white">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span>{new Date(post.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar / Share Actions */}
          <div className="md:w-16 flex-shrink-0 flex md:flex-col gap-4 items-center md:sticky md:top-24 h-fit">
            <button onClick={() => handleShare('facebook')} className="p-3 bg-gray-100 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors" title="Share on Facebook">
              <Facebook size={20} />
            </button>
            <button onClick={() => handleShare('twitter')} className="p-3 bg-gray-100 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors" title="Share on Twitter">
              <Twitter size={20} />
            </button>
            <button onClick={() => handleShare('whatsapp')} className="p-3 bg-gray-100 rounded-full hover:bg-[#25D366] hover:text-white transition-colors" title="Share on WhatsApp">
              <Smartphone size={20} />
            </button>
            <button onClick={() => handleShare('copy')} className="p-3 bg-gray-100 rounded-full hover:bg-cric-green hover:text-white transition-colors" title="Copy Link">
              <LinkIcon size={20} />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <p className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed mb-8 border-l-4 border-cric-green pl-6 italic">
              {post.excerpt}
            </p>
            
            <div className="prose prose-lg max-w-none prose-emerald prose-headings:font-serif">
              {renderContent(post.content, post.images || [])}
            </div>

            <hr className="my-12 border-gray-200" />

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">About the Author</h3>
              <p className="text-gray-600 text-sm">
                {post.author} is a senior cricket correspondent for CricPulse, covering international tours and major tournaments with a focus on data analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetails;