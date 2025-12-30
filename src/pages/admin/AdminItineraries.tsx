import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { store, Itinerary } from "@/lib/store";
import { useEffect } from "react";
import { ItineraryCard } from "@/components/ItineraryCard";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminItineraries() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app we'd have a getAllItineraries method, but for now we can mock or just fetch current user's
        // Since this is frontend only, we'll just show the user's itineraries as a demo of "managed itineraries"
        const fetchItineraries = async () => {
            if (user) {
                if (user) {
                    const data = await store.getItineraries(user.id, true); // true for isAdmin
                    setItineraries(data);
                }
            }
            setLoading(false);
        };
        fetchItineraries();
    }, [user]);

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            <div className="hidden md:block">
                <Sidebar user={user || undefined} isAdmin={true} />
            </div>

            <main className="flex-1 pb-20 md:pb-0">
                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Approved Itineraries</h1>
                        <p className="text-zinc-400">View and manage active travel plans.</p>
                    </motion.div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {itineraries.map((itinerary, i) => (
                                <div key={itinerary.id} className="group relative">
                                    <ItineraryCard
                                        {...itinerary}
                                        image={itinerary.heroImage}
                                        index={i}
                                    />
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => navigate(`/admin/itineraries/edit/${itinerary.id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {itineraries.length === 0 && (
                                <div className="col-span-full py-12 text-center text-zinc-500 bg-zinc-900 rounded-xl border border-dashed border-zinc-800">
                                    No active itineraries found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}
