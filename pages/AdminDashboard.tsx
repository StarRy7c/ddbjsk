import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePost, deletePost, getPosts } from '../services/storage';
import { Post, User } from '../types';
import { Plus, Trash2, LayoutDashboard, FileText, Image as ImageIcon, X } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [posts, setPosts] = useState<Post[]>(getPosts());
  
  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isTop, setIsTop] = useState(false);
  const [category, setCategory] = useState<Post['category']>('News');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
      setPosts(getPosts());
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newImages: string[] = [];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
             // Store base64
             // Note: In a real app we would upload to S3/Cloudinary. 
             // LocalStorage has limited size, so keep images small for demo.
             setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default image if none uploaded
    const finalImages = images.length > 0 
      ? images 
      : [`https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`];

    const newPost: Post = {
      id: generateId(),
      title,
      excerpt,
      content,
      images: finalImages,
      author: user.name,
      date: new Date().toISOString(),
      isTop,
      category
    };

    try {
        savePost(newPost);
        alert('Post published successfully!');
        setPosts(getPosts());
        setActiveTab('list');
        
        // Reset form
        setTitle('');
        setExcerpt('');
        setContent('');
        setImages([]);
        setIsTop(false);
    } catch (err) {
        alert('Error saving post. The images might be too large for local storage.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <button 
            onClick={() => setActiveTab(activeTab === 'list' ? 'create' : 'list')}
            className="flex items-center space-x-2 bg-cric-green text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
          >
            {activeTab === 'list' ? <><Plus size={20} /> <span>New Post</span></> : <><LayoutDashboard size={20} /> <span>View All Posts</span></>}
          </button>
        </header>

        {activeTab === 'list' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{post.title}</td>
                      <td className="p-4 text-gray-600">{post.category}</td>
                      <td className="p-4 text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="p-4">
                        {post.isTop ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Top Story
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">No posts found. Create one to get started!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create New Article</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                  <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cric-green focus:border-cric-green outline-none"
                    placeholder="e.g. India wins the World Cup"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cric-green outline-none bg-white"
                  >
                    <option value="News">News</option>
                    <option value="Match Report">Match Report</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Interview">Interview</option>
                    <option value="Stats">Stats</option>
                  </select>
                </div>

                 <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden" 
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="text-gray-400 mb-2" size={32} />
                      <span className="text-cric-green font-semibold">Click to upload images</span>
                      <span className="text-xs text-gray-500 mt-1">First image will be the Featured Thumbnail</span>
                    </label>
                  </div>
                  
                  {/* Image Preview & Tags List */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group bg-gray-100 rounded-lg p-2">
                          <img src={img} alt={`Uploaded ${index}`} className="w-full h-24 object-cover rounded" />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                          <div className="mt-2 text-center">
                            <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                              &lt;image{index + 1}&gt;
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Copy the tag (e.g., &lt;image1&gt;) and paste it into the Full Content below to insert that image between paragraphs.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                <textarea 
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cric-green focus:border-cric-green outline-none"
                  placeholder="Brief summary for the card view..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                <textarea 
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cric-green outline-none font-mono text-sm"
                  placeholder="Write your article here... use <image1>, <image2> tags to insert uploaded images."
                />
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                <input 
                  type="checkbox" 
                  id="isTop"
                  checked={isTop}
                  onChange={(e) => setIsTop(e.target.checked)}
                  className="w-5 h-5 text-cric-green rounded border-gray-300 focus:ring-cric-green"
                />
                <label htmlFor="isTop" className="text-sm font-medium text-gray-900 select-none cursor-pointer">
                  Feature as Top Story (Appears in Carousel & Top 5)
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('list')}
                  className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-cric-green text-white font-medium hover:bg-emerald-700 shadow-md transition-colors"
                >
                  Publish Article
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;