import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, MapPin, Send, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { store, CommunityPost } from "@/lib/store";
import { Link } from "react-router-dom";

import { Navbar } from "@/components/Navbar";

export default function Community() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New Post State
    const [newContent, setNewContent] = useState("");
    const [newDestination, setNewDestination] = useState("");
    const [newImage, setNewImage] = useState("");

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await store.getCommunityPosts();
        setPosts(data);
        setLoading(false);
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newContent.trim() || !newDestination.trim()) return;

        const post = await store.createCommunityPost({
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}`,
            destinationTag: newDestination,
            content: newContent,
            image: newImage || undefined,
        });

        setPosts([post, ...posts]);
        setNewContent("");
        setNewDestination("");
        setNewImage("");
        setIsCreating(false);
    };

    const handleLike = async (postId: string) => {
        if (!user) return; // Ideally show login prompt
        const updatedPosts = await store.togglePostLike(postId, user.id);
        setPosts(updatedPosts);
    };

    // Helper to check if current user liked
    const hasLiked = (post: CommunityPost) => user && post.likes.includes(user.id);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter(post =>
        post.destinationTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
        e.preventDefault();
        if (!user || !commentText.trim()) return;

        const updatedPosts = await store.addComment(postId, {
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            text: commentText
        });
        setPosts(updatedPosts);
        setCommentText("");
    };

    const handleShare = async (post: CommunityPost) => {
        const shareData = {
            title: `Check out ${post.userName}'s trip to ${post.destinationTag}`,
            text: post.content,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback
            navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <Navbar />
            <div className="max-w-xl mx-auto pt-24 pb-20 px-4 relative">

                {/* Header & Search */}
                <div className="flex flex-col gap-6 mb-8 relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold font-display text-slate-900 tracking-tight">Community</h1>
                            <p className="text-slate-500">Explore stories from around the world.</p>
                        </div>
                        {user && (
                            <Button onClick={() => setIsCreating(!isCreating)} size="sm" className="gap-2 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                <Plus className="w-4 h-4" /> Create
                            </Button>
                        )}
                    </div>

                    {/* Featured Travelers (Stories) */}
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide -mx-4 px-4">
                        {[
                            { name: "You", img: user?.avatar || "https://ui-avatars.com/api/?name=You", isUser: true },
                            { name: "Sarah M.", img: "https://i.pravatar.cc/150?u=sarah" },
                            { name: "Mike T.", img: "https://i.pravatar.cc/150?u=mike" },
                            { name: "Anjali", img: "https://i.pravatar.cc/150?u=anjali" },
                            { name: "David", img: "https://i.pravatar.cc/150?u=david" },
                            { name: "Amara", img: "https://i.pravatar.cc/150?u=amara" },
                        ].map((person, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                                <div className={`w-16 h-16 rounded-full p-[2px] ${person.isUser ? 'border-2 border-slate-200 border-dashed' : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600'}`}>
                                    <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                                        <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    </div>
                                    {person.isUser && (
                                        <div className="absolute bottom-6 right-0 bg-primary text-white rounded-full p-0.5 border-2 border-white">
                                            <Plus className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-slate-700">{person.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search places, people, or stories..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute left-3 top-3.5 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Post Form */}
                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-8 z-10 relative"
                        >
                            <form onSubmit={handleCreatePost} className="p-4 space-y-4">
                                <div className="flex items-start gap-4">
                                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-10 h-10 rounded-full object-cover" alt="User" />
                                    <textarea
                                        placeholder="Share your adventure..."
                                        className="flex-1 min-h-[100px] p-2 bg-transparent focus:outline-none resize-none text-slate-700 placeholder:text-slate-400"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        required
                                    />
                                </div>

                                {newImage && (
                                    <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100">
                                        <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setNewImage("")}
                                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            <div className="w-4 h-4 flex items-center justify-center">×</div>
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                className="pl-7 py-1.5 text-xs rounded-full bg-slate-50 border-none focus:ring-1 focus:ring-primary w-28 transition-all"
                                                value={newDestination}
                                                onChange={(e) => setNewDestination(e.target.value)}
                                                required
                                            />
                                            <MapPin className="absolute left-2.5 top-2 w-3 h-3 text-slate-400" />
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                id="post-image-upload"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setNewImage(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor="post-image-upload"
                                                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-xs text-slate-600 hover:bg-slate-100 transition-colors"
                                            >
                                                <ImageIcon className="w-3 h-3" />
                                                <span>Photo</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
                                        <Button type="submit" size="sm" className="gap-2 rounded-full h-8 text-xs">
                                            Post <Send className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Feed */}
                <div className="space-y-8">
                    {!user && !searchQuery && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center mb-8 shadow-lg">
                            <h3 className="font-bold text-xl mb-2">Join the Community</h3>
                            <p className="opacity-90 mb-4 text-sm">Log in to share your travel moments, like posts, and save inspiration.</p>
                            <Button variant="secondary" size="sm" asChild>
                                <Link to="/login">Sign In / Sign Up</Link>
                            </Button>
                        </div>
                    )}

                    {loading ? (
                        [1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-3xl shadow-sm h-80 w-full animate-pulse border border-slate-100" />
                        ))
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                            <p>No posts found matching your search.</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden"
                            >
                                {/* Post Header */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={post.userAvatar || `https://ui-avatars.com/api/?name=${post.userName}`} alt={post.userName} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                                        <div>
                                            <div className="font-bold text-sm text-slate-900 leading-tight">{post.userName}</div>
                                            <div className="text-xs text-slate-500">{post.destinationTag}</div>
                                        </div>
                                    </div>
                                    {/* Share Button (Fixed Position) */}
                                    <button onClick={() => handleShare(post)} className="text-slate-400 hover:text-slate-900 transition-colors p-2">
                                        <Send className="w-5 h-5 -rotate-45" strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* Main Image */}
                                {post.image && (
                                    <div className="w-full aspect-[4/5] sm:aspect-square bg-slate-50 relative">
                                        <img src={post.image} alt={post.destinationTag} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                )}

                                {/* Actions Bar */}
                                <div className="p-4 pb-2">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-5">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                disabled={!user}
                                                className={`transition-transform active:scale-95 ${hasLiked(post) ? 'text-red-500' : 'text-slate-800 hover:text-slate-600'}`}
                                            >
                                                <Heart className={`w-7 h-7 ${hasLiked(post) ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                            </button>
                                            <button
                                                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                                                className="text-slate-800 hover:text-slate-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                            </button>
                                        </div>
                                        <button className="text-slate-800 hover:text-slate-600">
                                            <Bookmark className="w-6 h-6" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    {/* Likes Count */}
                                    <div className="font-bold text-sm mb-2">
                                        {post.likes.length} likes
                                    </div>

                                    {/* Caption */}
                                    <div className="text-sm leading-relaxed mb-1">
                                        <span className="font-bold mr-2">{post.userName}</span>
                                        <span className="text-slate-800">{post.content}</span>
                                    </div>

                                    {/* Comments Preview */}
                                    {post.comments && post.comments.length > 0 && (
                                        <button
                                            onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                                            className="text-slate-500 text-sm mt-2 mb-1"
                                        >
                                            View all {post.comments.length} comments
                                        </button>
                                    )}

                                    {/* Date */}
                                    <div className="text-[10px] uppercase text-slate-400 font-medium mt-1 mb-3">
                                        {new Date(post.createdAt).toLocaleDateString([], { month: 'long', day: 'numeric' })}
                                    </div>

                                    {/* Comments Section */}
                                    <AnimatePresence>
                                        {activeCommentPostId === post.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-slate-100 pt-3 mt-3 overflow-hidden"
                                            >
                                                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto px-1">
                                                    {post.comments?.map(comment => (
                                                        <div key={comment.id} className="flex gap-2 text-sm">
                                                            <span className="font-bold shrink-0">{comment.userName}</span>
                                                            <span className="text-slate-700">{comment.text}</span>
                                                        </div>
                                                    ))}
                                                    {(!post.comments || post.comments.length === 0) && (
                                                        <p className="text-slate-400 text-sm italic">No comments yet.</p>
                                                    )}
                                                </div>

                                                {/* Add Comment Input */}
                                                {user && (
                                                    <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            className="flex-1 bg-slate-50 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-300"
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={!commentText.trim()}
                                                            className="text-indigo-600 font-semibold text-sm disabled:opacity-50"
                                                        >
                                                            Post
                                                        </button>
                                                    </form>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
