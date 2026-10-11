import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Share2, Send } from "lucide-react";
import { GlassCard } from "../../components/common/GlassCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
interface Post {
  id: number;
  user: string;
  content: string;
  emotion: string;
  created_at: string;
  likes: number;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/community/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/community/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: "CurrentUser", // Mocked user
          content: newPost,
          emotion: "Inspired"
        }),
      });
      if (res.ok) {
        setNewPost("");
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
    setLoading(false);
  };

  const handleLike = async (id: number) => {
    try {
      await fetch(`${API_BASE}/api/community/posts/${id}/like`, { method: "POST" });
      fetchPosts();
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  return (
    <div className="home-dashboard px-4 min-h-screen pb-24 pt-6 overflow-y-auto">
      <div className="pb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Community
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Share your climate conservation stories.
        </p>
      </div>

            <GlassCard className="mb-6 p-4">
        <textarea
          className="w-full bg-white/50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          rows={3}
          placeholder="Share your thoughts, expressions, or stories on climate conservation..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="flex items-center justify-end mt-3">
          <button 
            onClick={handlePost}
            disabled={loading || !newPost.trim()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Post"} <Send size={14} />
          </button>
        </div>
      </GlassCard>

            <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 border border-slate-200 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                  {post.user.charAt(0)}
                </div>
                <div>
                  <h4 className="text-slate-900 text-sm font-medium">{post.user}</h4>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-slate-600 text-sm my-3 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center gap-4 border-t border-slate-200 pt-3 mt-3">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 text-slate-500 hover:text-pink-500 transition-colors text-xs"
              >
                <Heart size={14} /> {post.likes}
              </button>
              <button className="flex items-center gap-1 text-slate-500 hover:text-cyan-500 transition-colors text-xs">
                <MessageSquare size={14} /> Reply
              </button>
              <button className="flex items-center gap-1 text-slate-500 hover:text-emerald-500 transition-colors text-xs ml-auto">
                <Share2 size={14} /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
