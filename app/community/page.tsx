"use client"
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Heart, MessageCircle, Share2, Send, Heart as SolidHeart } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  avatarColor: string;
  time: string;
  text: string;
}

interface Post {
  id: number;
  user: string;
  avatarColor: string;
  time: string;
  tag: string;
  content: string;
  image?: string;
  video?: string;
  title?: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'Juan Dela Cruz',
      avatarColor: 'bg-purple-600',
      time: '2 days ago',
      tag: 'Assistive Technology',
      content: "I recently received a screen reader through your assistive technology program, and it has completely changed my life! I'm now able to work independently and pursue my career goals. Thank you so much for this amazing service!",
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop',
      likes: 24,
      isLiked: false,
      comments: [
        { id: 101, user: 'Sarah L.', avatarColor: 'bg-green-500', time: '1 day ago', text: 'That is wonderful news, Juan! Which model are you using?' },
        { id: 102, user: 'Mike T.', avatarColor: 'bg-blue-500', time: '1 day ago', text: 'Great to hear about your progress.' },
        { id: 103, user: 'Elena R.', avatarColor: 'bg-orange-500', time: '5 hours ago', text: 'Keep inspiring us!' }
      ]
    },
    {
      id: 2,
      user: 'Maria Reyes',
      avatarColor: 'bg-pink-600',
      time: '5 days ago',
      tag: 'Employment',
      content: "Does anyone have experience with remote work opportunities for persons with mobility impairments? I'm looking for recommendations on companies that offer flexible work arrangements and the necessary accommodations.",
      likes: 12,
      isLiked: false,
      comments: [
        { id: 201, user: 'JobHelp PH', avatarColor: 'bg-teal-500', time: '4 days ago', text: 'Hi Maria, check our latest pinned post for a list of partners!' },
        { id: 202, user: 'Alex D.', avatarColor: 'bg-indigo-500', time: '3 days ago', text: 'Try checking the new tech startups in BGC, they are very inclusive.' }
      ]
    },
    {
      id: 3,
      user: 'Antonio Santos',
      avatarColor: 'bg-blue-600',
      time: '1 week ago',
      tag: 'Advocacy',
      content: "I'm organizing a local accessibility awareness event in Cebu next month. If anyone is interested in participating or has suggestions for activities, please let me know. Let's work together to make our community more inclusive!",
      likes: 18,
      isLiked: false,
      comments: [
        { id: 301, user: 'Cebu Chapter', avatarColor: 'bg-red-500', time: '6 days ago', text: 'We are so excited for this!' }
      ]
    }
  ]);

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});

  const toggleComments = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleInputChange = (postId: number, value: string) => {
    setCommentInputs(prev => ({...prev, [postId]: value}));
  };

  const handleLike = (postId: number) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleShare = async (post: Post) => {
    // Check if window is defined (Next.js SSR)
    if (typeof window === 'undefined') return;

    const shareData = {
      title: 'Accessible Connections Community',
      text: `${post.user} posted in ${post.tag}: ${post.content.substring(0, 100)}...`,
      url: `${window.location.origin}/community/post/${post.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link: ", err);
      }
    }
  };

  const handleSubmitComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: 'You', 
              avatarColor: 'bg-purple-600',
              time: 'Just now',
              text: text
            }
          ]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({...prev, [postId]: ''}));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      {/* Header Section */}
      <div 
        className="text-white pt-32 pb-24 rounded-b-[3rem] shadow-xl mb-12 relative overflow-hidden"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal width="100%">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Community</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Connect, share, and grow with thousands of members across the Philippines.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          
          <Reveal width="100%">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Recent Community Posts</h2>
            </div>
          </Reveal>

          {posts.map((post, i) => (
            <Reveal key={post.id} width="100%" delay={i * 0.1}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 ${post.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg leading-tight">{post.user}</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      Posted {post.time} in <span className="font-bold text-purple-600">{post.tag}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                   <p className="text-gray-700 leading-relaxed text-lg">
                    {post.content}
                   </p>
                </div>

                {post.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-auto max-h-[500px] object-cover" 
                        loading="lazy"
                      />
                  </div>
                )}
                
                <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 font-bold transition-all group ${post.isLiked ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}
                  >
                    <motion.div
                      whileTap={{ scale: 1.4 }}
                      className="group-hover:scale-110 transition-transform"
                    >
                      {post.isLiked ? (
                        <SolidHeart className="w-5 h-5 fill-current" />
                      ) : (
                        <Heart className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span>{post.likes} Likes</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 font-bold transition-colors group ${expandedPosts.includes(post.id) ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                  <button 
                    onClick={() => handleShare(post)}
                    className="ml-auto flex items-center gap-2 font-bold text-gray-500 hover:text-purple-600 transition-all group"
                  >
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comment Section */}
                <AnimatePresence>
                  {expandedPosts.includes(post.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        {/* List of Comments */}
                        <div className="space-y-4 mb-6">
                          {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <div className={`w-8 h-8 ${comment.avatarColor} rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold`}>
                                  {comment.user.charAt(0)}
                                </div>
                                <div className="flex-grow">
                                  <div className="bg-gray-50 rounded-2xl px-4 py-3 rounded-tl-none">
                                    <div className="flex justify-between items-baseline mb-1">
                                      <span className="text-sm font-bold text-gray-900">{comment.user}</span>
                                      <span className="text-xs text-gray-400">{comment.time}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm text-center py-2 italic">No comments yet.</p>
                          )}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex gap-3 items-start">
                           <div className="w-8 h-8 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1">
                              U
                           </div>
                           <div className="flex-grow relative">
                              <textarea
                                value={commentInputs[post.id] || ''}
                                onChange={(e) => handleInputChange(post.id, e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full bg-gray-50 rounded-2xl pl-4 pr-12 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 resize-none h-[46px] overflow-hidden focus:h-20 transition-all"
                                onKeyDown={(e) => {
                                  if(e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmitComment(post.id);
                                  }
                                }}
                              ></textarea>
                              <button 
                                onClick={() => handleSubmitComment(post.id)}
                                disabled={!commentInputs[post.id]}
                                className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-600/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Community;