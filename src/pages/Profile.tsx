import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { store, User, Destination, Stamp } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming we have this, or use standard
import { MapPin, Globe, Award, BookOpen, Camera, Plane, Save, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Navigate } from "react-router-dom";

const DEMO_USER: User = {
    id: "user-1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    role: "user",
    location: "Mumbai, India",
    bio: "Passionate photographer and food lover trying to eat my way around the globe. 📸 🍜",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    favorites: [],
    preferences: {
        travel: {
            dietary: ["Vegetarian"],
            travelStyle: "Adventure",
            frequency: "Frequent"
        },
        app: {
            currency: "USD",
            language: "en",
            notifications: true
        }
    } as any
};

export default function Profile() {
    const { user, updateUser } = useAuth();
    const [isDemo, setIsDemo] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Derived Stats
    const [passportStamps, setPassportStamps] = useState<Stamp[]>([]);
    const [favorites, setFavorites] = useState<Destination[]>([]);
    const [activeTab, setActiveTab] = useState<"overview" | "preferences" | "activity">("overview");

    // Form State
    const [formData, setFormData] = useState<Partial<User>>({});

    const activeUser = isDemo ? DEMO_USER : user;

    useEffect(() => {
        if (activeUser) {
            setFormData(activeUser);
            loadStats(activeUser.id);
        }
    }, [activeUser]);

    const loadStats = async (userId: string) => {
        // Load passport counts
        const passport = await store.getPassport(userId);
        if (passport) setPassportStamps(passport.stamps);

        // Load specific favorites objects
        const allDestinations = await store.getDestinations();
        if (activeUser?.id === "user-1") {
            // Hardcode some favorites for demo user visuals
            setFavorites(allDestinations.slice(0, 3));
        } else if (activeUser?.favorites) {
            const favs = allDestinations.filter(d => activeUser.favorites.includes(d.id));
            setFavorites(favs);
        }
    };

    const handleSave = async () => {
        if (!activeUser) return;
        if (isDemo) {
            setIsEditing(false);
            alert("Changes are not saved in Demo Mode.");
            return;
        }
        setIsLoading(true);
        try {
            await updateUser({ ...activeUser, ...formData } as User); // Update Context & LocalStorage
            await store.updateUser({ ...activeUser, ...formData } as User); // Simulate API
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!activeUser) {
        // ... (sign in interstitial)
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                {/* Header Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-8 relative">
                    <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90" />

                    <div className="px-8 pb-8 flex flex-col md:flex-row items-start gap-6 -mt-12 relative z-10">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden shrink-0 group relative">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                    <Globe className="w-12 h-12" />
                                </div>
                            )}
                            {isEditing && (
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="w-6 h-6" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 pt-4 md:pt-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    {isEditing ? (
                                        <div className="space-y-2 max-w-sm">
                                            <Input
                                                value={formData.name || ""}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Full Name"
                                                className="text-xl font-bold h-10"
                                            />
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <Input
                                                    value={formData.location || ""}
                                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="City, Country"
                                                    className="h-8 text-sm"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="text-3xl font-bold">{formData.name}</h1>
                                            {formData.location && (
                                                <div className="flex items-center gap-2 text-slate-500 mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{formData.location}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <Button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    variant={isEditing ? "default" : "outline"}
                                    disabled={isLoading}
                                    className="gap-2 rounded-full"
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="w-4 h-4" /> Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-4 h-4" /> Edit Profile
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Bio */}
                            <div className="mt-4 max-w-2xl">
                                {isEditing ? (
                                    <textarea
                                        className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                        rows={3}
                                        placeholder="Tell us about your travel dreams..."
                                        value={formData.bio || ""}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-slate-600 leading-relaxed font-light">
                                        {formData.bio || "No bio yet. Click edit to tell your story!"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Key Stats Bar */}
                    <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-4 mt-6 flex justify-around md:justify-start md:gap-16">
                        <div className="text-center md:text-left">
                            <div className="text-2xl font-bold text-indigo-600">{passportStamps.length}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Stamps</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-2xl font-bold text-pink-600">{activeUser.favorites?.length || favorites.length}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Favorites</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-2xl font-bold text-orange-600">{isDemo ? '2,450' : '0'}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Points</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`pb-3 text-sm font-semibold tracking-wide transition-colors relative ${activeTab === 'overview' ? 'text-slate-900 border-b-2 border-slate-900 -mb-[2px]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`pb-3 text-sm font-semibold tracking-wide transition-colors relative ${activeTab === 'preferences' ? 'text-slate-900 border-b-2 border-slate-900 -mb-[2px]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={`pb-3 text-sm font-semibold tracking-wide transition-colors relative ${activeTab === 'activity' ? 'text-slate-900 border-b-2 border-slate-900 -mb-[2px]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Activity
                    </button>
                </div>

                {/* Content Area */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="md:col-span-2 space-y-8">
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                {/* Favorites Section */}
                                <section>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-yellow-500" /> Favorite Destinations
                                    </h3>
                                    {favorites.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {favorites.map(fav => (
                                                <Link to={`/destination/${fav.id}`} key={fav.id} className="group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-md transition-all">
                                                    <div className="aspect-video relative overflow-hidden">
                                                        <img src={fav.image} alt={fav.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                                    </div>
                                                    <div className="p-3">
                                                        <h4 className="font-bold text-slate-800 truncate">{fav.name}</h4>
                                                        <div className="text-xs text-slate-500">{fav.locationType}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-xl p-8 text-center border border-dashed border-slate-200">
                                            <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Award className="w-6 h-6 opacity-50" />
                                            </div>
                                            <p className="text-slate-500 text-sm">No details yet. Go explore!</p>
                                        </div>
                                    )}
                                </section>
                            </motion.div>
                        )}

                        {activeTab === 'preferences' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                                    <h3 className="text-lg font-bold mb-6">Travel Preferences</h3>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 block">Travel Style</label>
                                            <select
                                                disabled={!isEditing}
                                                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={formData.preferences?.travel?.travelStyle || "Balanced"}
                                                onChange={e => {
                                                    const newPrefs = { ...formData.preferences, travel: { ...formData.preferences?.travel, travelStyle: e.target.value } };
                                                    setFormData({ ...formData, preferences: newPrefs as any });
                                                }}
                                            >
                                                <option>Relaxed</option>
                                                <option>Adventure</option>
                                                <option>Balanced</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 block">Language</label>
                                            <select
                                                disabled={!isEditing}
                                                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={formData.preferences?.language || "en"}
                                                onChange={e => setFormData({ ...formData, preferences: { ...formData.preferences, language: e.target.value as any } as any })}
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                            </select>
                                        </div>
                                    </div>

                                    {!isEditing && <p className="text-xs text-slate-400 mt-6 text-center italic">* Enable edit mode to change preferences</p>}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'activity' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h3 className="text-lg font-bold mb-4">Recent Passport Stamps</h3>
                                <div className="space-y-3">
                                    {passportStamps.map(stamp => (
                                        <div key={stamp.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100">
                                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-xl shrink-0">
                                                {stamp.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800">{stamp.destinationName}</h4>
                                                <div className="text-xs text-slate-500">
                                                    {stamp.status === 'completed' ? `Visited on ${new Date(stamp.date).toLocaleDateString()}` : 'Planned Trip'}
                                                </div>
                                            </div>
                                            {stamp.status === 'completed' && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Completed</span>
                                            )}
                                        </div>
                                    ))}
                                    {passportStamps.length === 0 && (
                                        <p className="text-slate-500 text-sm">No activity yet.</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h4 className="font-bold text-slate-900 mb-4 text-sm">Quick Actions</h4>
                            <div className="space-y-2">
                                <Button asChild variant="ghost" className="w-full justify-start text-slate-600">
                                    <Link to="/passport">
                                        <BookOpen className="w-4 h-4 mr-2" /> View Passport
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start text-slate-600">
                                    <Link to="/settings">
                                        <Award className="w-4 h-4 mr-2" /> Account Settings
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Travel Frequency */}
                        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="font-bold opacity-80 text-xs uppercase tracking-widest mb-1">Traveler Level</h4>
                                <div className="text-2xl font-bold mb-2">{isDemo ? "Globe Trotter" : "Explorer"}</div>
                                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                                    <div className={`bg-yellow-400 h-full ${isDemo ? 'w-[90%]' : 'w-[70%]'}`} />
                                </div>
                                <p className="text-xs opacity-70">{isDemo ? '90% to "Legend"' : '70% to "Globe Trotter"'}</p>
                            </div>
                            <Plane className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-[-15deg]" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
