import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { store, Passport as PassportType, Badge, Stamp, Destination } from "@/lib/store";
import { Compass, Calendar, Map, Award, Plane, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AnimatePresence } from "framer-motion";

export default function Passport() {
    const { user } = useAuth();
    const [passport, setPassport] = useState<PassportType | null>(null);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        store.getDestinations().then(setDestinations);

        if (user) {
            loadPassport(user.id);
        } else if (isDemo) {
            loadPassport("user-1"); // Load demo user data
        } else {
            setLoading(false);
        }
    }, [user, isDemo]);

    const loadPassport = async (userId: string) => {
        setLoading(true);
        try {
            const data = await store.getPassport(userId);
            setPassport(data);
        } catch (error) {
            console.error("Failed to load passport", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStampClick = (stamp: Stamp) => {
        setSelectedStamp(stamp);
    };

    // Helper to find destination details
    const getDestinationDetails = (stampName: string) => {
        return destinations.find(d => d.name.includes(stampName) || stampName.includes(d.name.split(',')[0]));
    };

    if (!user && !isDemo) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Map className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">My Passport</h2>
                    <p className="text-slate-600 mb-6">Log in to view your digital travel passport, stamps, and badges.</p>
                    <div className="flex flex-col gap-3">
                        <Button asChild className="w-full">
                            <Link to="/login">Sign In</Link>
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => setIsDemo(true)}>
                            View Demo Passport
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
    }

    return (
        <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center">
            <Navbar />
            <div className="w-full pt-24 pb-20 px-4 flex flex-col items-center">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">My Passport</h1>
                    <p className="text-slate-600">Your journey across the globe, documented.</p>
                </div>

                {/* ... remaining code ... */}

                {/* Passport Book Container */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-5xl bg-[#1a2b4b] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
                    style={{
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`, // Subtle texture
                    }}
                >
                    {/* Visual Spine for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-[#111e33] to-[#243b66] z-10 -ml-2 shadow-inner" />

                    {/* Left Page: Identity */}
                    <div className="flex-1 bg-[#fffdf5] p-8 md:p-12 relative border-r border-slate-200 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-repeat" />

                        {/* Scattered Decoration Fragments (Identity Page) */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* Top Right Fragment */}
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-15 rotate-12 mix-blend-multiply">
                                <img src="/passport-decoration.jpg" className="w-full h-full object-cover rounded-full blur-[1px]" style={{ objectPosition: '10% 20%' }} alt="" />
                            </div>
                            {/* Bottom Left Fragment */}
                            <div className="absolute bottom-10 left-[-10px] w-24 h-24 opacity-10 -rotate-12 mix-blend-multiply">
                                <img src="/passport-decoration.jpg" className="w-full h-full object-cover rounded-md" style={{ objectPosition: '80% 80%' }} alt="" />
                            </div>
                            {/* Center Background Wash */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.05] grayscale mix-blend-multiply">
                                <img src="/passport-decoration.jpg" className="w-full h-full object-cover rounded-full blur-sm" style={{ objectPosition: '50% 50%' }} alt="" />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8 opacity-50">
                                <Compass className="w-6 h-6" />
                                <span className="text-sm font-mono tracking-widest uppercase">WanderGuide Republic</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-8 items-start">
                                {/* Photo Area */}
                                <div className="shrink-0">
                                    <div className="w-32 h-40 bg-slate-200 border-4 border-slate-100 shadow-sm relative overflow-hidden">
                                        {(user?.avatar) ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover grayscale contrast-125" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                <Plane className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black" />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-6 font-mono text-sm text-slate-800">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Surname / Given Names</label>
                                        <div className="text-xl font-bold uppercase tracking-wide border-b border-dashed border-slate-300 pb-1">{user?.name || "Demo Traveler"}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Passport No.</label>
                                            <div className="font-bold">{passport?.passportNumber}</div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Nationality</label>
                                            <div className="font-bold">{passport?.nationality}</div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Date of Issue</label>
                                            <div className="font-bold">{new Date(passport?.issuedDate || "").toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Trips Taken</label>
                                            <div className="font-bold">{passport?.stamps.length || 0}</div>
                                        </div>
                                    </div>

                                    {/* Electronic signature style */}
                                    <div className="pt-4 opacity-70">
                                        <span className="font-handwriting text-2xl">{user?.name || "Demo Traveler"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Page: Stamps */}
                    <div className="flex-1 bg-[#fffdf5] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-repeat" />

                        {/* Scattered Decoration Fragments (Visa Page) */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* Top Left Corner */}
                            <div className="absolute top-[-10px] left-[-30px] w-40 h-40 opacity-10 -rotate-45 mix-blend-multiply">
                                <img src="/passport-decoration.jpg" className="w-full h-full object-cover" style={{ objectPosition: '90% 10%' }} alt="" />
                            </div>
                            {/* Bottom Right - Stamp style */}
                            <div className="absolute bottom-20 right-[-10px] w-28 h-28 opacity-15 rotate-12 mix-blend-multiply">
                                <div className="w-full h-full border-4 border-slate-300/30 rounded-full overflow-hidden">
                                    <img src="/passport-decoration.jpg" className="w-full h-full object-cover grayscale sepia" style={{ objectPosition: '30% 60%' }} alt="" />
                                </div>
                            </div>
                            {/* Random strip */}
                            <div className="absolute top-1/3 right-0 w-16 h-48 opacity-[0.08] rotate-3 mix-blend-multiply">
                                <img src="/passport-decoration.jpg" className="w-full h-full object-cover" style={{ objectPosition: '50% 10%' }} alt="" />
                            </div>
                        </div>

                        <div className="relative z-10 h-full">
                            <h3 className="text-center text-xs font-mono tracking-[0.3em] uppercase text-slate-300 mb-8">Visa / Validation</h3>

                            {passport?.stamps.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 pb-10 border-2 border-dashed border-slate-100 rounded-lg m-4">
                                    <Plane className="w-12 h-12 mb-2 opacity-20" />
                                    <p className="text-sm font-mono uppercase">Page Empty</p>
                                    <p className="text-xs mt-2">Book a trip to earn stamps</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {passport?.stamps.map((stamp, idx) => (
                                        <div key={stamp.id} className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ scale: 2, opacity: 0, rotate: Math.random() * 20 - 10 }}
                                                animate={{ scale: 1, opacity: 0.8, rotate: Math.random() * 20 - 10 }}
                                                transition={{ delay: idx * 0.1, type: "spring" }}
                                                onClick={() => handleStampClick(stamp)}
                                                className={`w-24 h-24 flex flex-col items-center justify-center border-4 border-double rounded-full p-2 hover:opacity-100 hover:scale-110 transition-all cursor-pointer bg-blend-multiply mix-blend-multiply relative ${stamp.status === 'completed' ? 'border-green-800/60 text-green-900/80' : 'border-indigo-900/40 text-indigo-900/70'}`}
                                                title={`${stamp.destinationName} - ${new Date(stamp.date).toLocaleDateString()}`}
                                            >
                                                <div className="text-[10px] font-bold uppercase tracking-tighter text-center leading-none mb-1">{stamp.destinationName.substring(0, 10)}</div>
                                                <div className="text-2xl">{stamp.icon}</div>
                                                <div className="text-[8px] font-mono mt-1">{new Date(stamp.date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</div>

                                                {/* Completion Overlay - Custom Image with Animation */}
                                                {stamp.status === 'completed' && (
                                                    <motion.div
                                                        initial={{ scale: 1.5, opacity: 1 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{
                                                            delay: 0.5 + (idx * 0.1),
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 15
                                                        }}
                                                        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
                                                    >
                                                        <img
                                                            src="/completed-stamp.png"
                                                            alt="Completed"
                                                            className="w-[120%] h-[120%] max-w-none object-contain mix-blend-multiply"
                                                            style={{ transform: 'rotate(-15deg)' }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </motion.div>

                                            {/* Label below stamp */}
                                            <div className="mt-2 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider text-center max-w-[80px] leading-tight opacity-60">
                                                {stamp.destinationName}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Badges Section */}
                <div className="w-full max-w-5xl mt-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        Achievements
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Render Earned Badges */}
                        {passport?.badges.map((badge) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={badge.id}
                                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xl shrink-0">
                                    {badge.icon === 'compass' ? <Compass className="w-6 h-6" /> : badge.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{badge.name}</h4>
                                    <p className="text-xs text-slate-500">{badge.description}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Placeholders for future badges */}
                        {(!passport?.badges.some(b => b.id === 'badge-explorer')) && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 flex items-center gap-4 opacity-60">
                                <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center shrink-0">
                                    <Compass className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-400">Explorer</h4>
                                    <p className="text-xs text-slate-400">Collect 3 destination stamps</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Stamp Details Modal */}
            <AnimatePresence>
                {selectedStamp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedStamp(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStamp(null)}
                                className="absolute top-4 right-4 z-10 text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Destination Image */}
                            <div className="h-40 relative bg-slate-200">
                                {getDestinationDetails(selectedStamp.destinationName)?.image ? (
                                    <img
                                        src={getDestinationDetails(selectedStamp.destinationName)?.image}
                                        alt={selectedStamp.destinationName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                        <Map className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold">{selectedStamp.destinationName}</h3>
                                    <div className="flex items-center gap-2 text-xs opacity-90 mt-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>Visited: {new Date(selectedStamp.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Stamp Status */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedStamp.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                        {selectedStamp.status === 'completed' ? 'Trip Completed' : 'Trip Planned'}
                                    </div>
                                    <div className="text-3xl">{selectedStamp.icon}</div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {getDestinationDetails(selectedStamp.destinationName)?.description || "A wonderful journey captured in your passport."}
                                </p>

                                {/* Action */}
                                <div className="grid grid-cols-2 gap-3">
                                    {getDestinationDetails(selectedStamp.destinationName) && (
                                        <Button asChild variant="outline" className="w-full">
                                            <Link to={`/destination/${getDestinationDetails(selectedStamp.destinationName)?.id}`}>
                                                View Destination
                                            </Link>
                                        </Button>
                                    )}
                                    <Button onClick={() => setSelectedStamp(null)} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
