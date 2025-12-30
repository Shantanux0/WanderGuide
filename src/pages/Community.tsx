import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, MapPin, Send, Image as ImageIcon, Plus, Search, X, Trash2, Edit2, Check } from "lucide-react";
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
        if (!user || !newContent.trim() || !newDestination.trim() || !newImage) {
            if (!newImage) alert("Please add a photo to your story!");
            return;
        }

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

    const handleDelete = async (postId: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        const updatedPosts = await store.deleteCommunityPost(postId);
        setPosts(updatedPosts);
    };

    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");

    const startEditing = (post: CommunityPost) => {
        setEditingPostId(post.id);
        setEditText(post.content);
    };

    const cancelEditing = () => {
        setEditingPostId(null);
        setEditText("");
    };

    const saveEdit = async (postId: string) => {
        if (!editText.trim()) return;
        const updatedPosts = await store.updateCommunityPost(postId, editText);
        setPosts(updatedPosts);
        cancelEditing();
    };

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
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-100 via-purple-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute top-40 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Dot Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,250,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <Navbar />

            <div className="container mx-auto pt-28 pb-20 px-4 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-slate-900 tracking-tight mb-4"
                        >
                            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Stories</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 max-w-lg"
                        >
                            Explore travel stories, tips, and hidden gems shared by our global community of wanderers.
                        </motion.p>
                    </div>

                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/60 backdrop-blur-md border border-white/50 p-2 rounded-2xl shadow-sm flex items-center gap-2"
                        >
                            <div className="relative flex-1 lg:w-64">
                                <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search stories..."
                                    className="w-full pl-9 pr-4 py-2 bg-transparent text-sm font-medium placeholder:text-slate-400 border-none focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {user && (
                                <Button onClick={() => setIsCreating(!isCreating)} size="sm" className="rounded-xl shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                                    <Plus className="w-4 h-4 mr-1" /> New Post
                                </Button>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Filters & Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <span className="bg-indigo-100/50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100">
                            {posts.length}
                        </span>
                        Stories shared
                    </div>

                    <div className="flex-1 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                        <div className="flex items-center gap-2 min-w-max">
                            <button
                                onClick={() => setSearchQuery("")}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${searchQuery === ""
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                All Places
                            </button>
                            {Array.from(new Set(posts.map(p => p.destinationTag).filter(Boolean))).slice(0, 8).map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(tag === searchQuery ? "" : tag)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${searchQuery === tag
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Create Post Form Modal/Expandable */}
                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden max-w-2xl mx-auto z-20 relative"
                        >
                            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-slate-800">Create New Post</h3>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)} className="h-8 w-8 p-0 rounded-full">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex gap-4">
                                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="User" />
                                    <div className="flex-1 space-y-4">
                                        <textarea
                                            placeholder="Share your latest adventure... Where did you go? What did you discover?"
                                            className="w-full min-h-[120px] p-4 bg-slate-50/50 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
                                            required
                                        />

                                        {newImage && (
                                            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-sm border border-slate-200/50">
                                                <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setNewImage("")}
                                                    className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full hover:bg-black/80 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex gap-2">
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-indigo-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="Add Location"
                                                        className="pl-9 pr-4 py-2 text-sm rounded-full bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 placeholder:text-indigo-400/70 border-none focus:ring-2 focus:ring-indigo-200 transition-all w-40"
                                                        value={newDestination}
                                                        onChange={(e) => setNewDestination(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 transition-colors">
                                                    <ImageIcon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Add Photo <span className="text-red-500">*</span></span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => setNewImage(reader.result as string);
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>

                                            <Button type="submit" size="sm" className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                                                Post Story
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Masonry Feed */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {!user && !searchQuery ? (
                        <div className="break-inside-avoid mb-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white text-center shadow-xl shadow-indigo-900/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="font-bold text-2xl mb-3">Join our Community</h3>
                                <p className="opacity-90 mb-6 font-medium text-indigo-100">Share your journey, discover new places, and connect with travelers worldwide.</p>
                                <Button variant="secondary" className="rounded-full px-8 bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-lg" asChild>
                                    <Link to="/login">Sign In / Sign Up</Link>
                                </Button>
                            </div>
                        </div>
                    ) : null}

                    {loading ? (
                        [1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="break-inside-avoid mb-6 bg-white rounded-[2rem] shadow-sm h-80 w-full animate-pulse border border-slate-100" />
                        ))
                    ) : filteredPosts.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-50 flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Search className="w-8 h-8" />
                            </div>
                            <p className="text-xl font-medium text-slate-600">No stories found</p>
                            <p className="text-slate-400">Try adjusting your search terms</p>
                        </div>
                    ) : (
                        filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="break-inside-avoid mb-6 bg-white/70 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/60 overflow-hidden group"
                            >
                                {/* Main Image */}
                                {post.image && (
                                    <div className="w-full relative overflow-hidden group-hover:opacity-95 transition-opacity">
                                        <div className="absolute top-4 left-4 z-10">
                                            <Link
                                                to={`/destinations?search=${encodeURIComponent(post.destinationTag)}`}
                                                className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1 hover:bg-black/60 transition-colors"
                                            >
                                                <MapPin className="w-3 h-3" /> {post.destinationTag}
                                            </Link>
                                        </div>
                                        <img src={post.image} alt={post.destinationTag} className="w-full h-auto object-cover" loading="lazy" />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Post Header if no image, or just user info */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-[2px] bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full">
                                                <img src={post.userAvatar || `https://ui-avatars.com/api/?name=${post.userName}`} alt={post.userName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 leading-tight">{post.userName}</div>
                                                <div className="text-xs text-slate-500 font-medium">{new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                                            </div>
                                        </div>
                                        {user && user.id === post.userId && (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => startEditing(post)}
                                                    className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50"
                                                    title="Edit Post"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                                                    title="Delete Post"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="mb-4">
                                        {!post.image && (
                                            <Link
                                                to={`/destinations?search=${encodeURIComponent(post.destinationTag)}`}
                                                className="mb-2 inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-semibold hover:bg-indigo-100 transition-colors"
                                            >
                                                <MapPin className="w-3 h-3" /> {post.destinationTag}
                                            </Link>
                                        )}
                                        {editingPostId === post.id ? (
                                            <div className="space-y-3">
                                                <textarea
                                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-none min-h-[100px] text-slate-700 leading-relaxed text-[15px]"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="ghost" size="sm" onClick={cancelEditing} className="h-8">Cancel</Button>
                                                    <Button size="sm" onClick={() => saveEdit(post.id)} className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                                                        <Check className="w-3 h-3" /> Save
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-slate-700 leading-relaxed text-[15px]">{post.content}</p>
                                        )}
                                    </div>

                                    {/* Interaction Bar */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                disabled={!user}
                                                className={`flex items-center gap-1.5 transition-colors ${hasLiked(post) ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}
                                            >
                                                <Heart className={`w-5 h-5 ${hasLiked(post) ? 'fill-current' : ''}`} strokeWidth={2} />
                                                <span className="text-sm font-semibold">{post.likes.length > 0 ? post.likes.length : ''}</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                                                className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors"
                                            >
                                                <div className="relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                                    {post.comments && post.comments.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>}
                                                </div>
                                                <span className="text-sm font-semibold">{post.comments?.length || ''}</span>
                                            </button>
                                        </div>
                                        <button onClick={() => handleShare(post)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <Send className="w-5 h-5" strokeWidth={2} />
                                        </button>
                                    </div>

                                    {/* Comments Dropdown */}
                                    <AnimatePresence>
                                        {activeCommentPostId === post.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="pt-4 mt-2"
                                            >
                                                <div className="bg-slate-50/80 rounded-xl p-3 space-y-3 mb-3 max-h-48 overflow-y-auto custom-scrollbar">
                                                    {post.comments?.map(comment => (
                                                        <div key={comment.id} className="flex gap-2 text-sm">
                                                            <div className="font-bold shrink-0 text-slate-900">{comment.userName}</div>
                                                            <div className="text-slate-600 leading-snug">{comment.text}</div>
                                                        </div>
                                                    ))}
                                                    {(!post.comments || post.comments.length === 0) && (
                                                        <p className="text-slate-400 text-xs italic text-center py-2">No comments yet. Be the first!</p>
                                                    )}
                                                </div>

                                                {user && (
                                                    <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex items-center gap-2 relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            className="flex-1 bg-white border border-slate-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={!commentText.trim()}
                                                            className="absolute right-2 text-indigo-600 p-1 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-50"
                                                        >
                                                            <Send className="w-4 h-4" />
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
