import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Sun,
    Sunset,
    Moon,
    Hotel,
    Utensils,
    Camera,
    Train,
    Ship,
    Wine,
    TreePine,
    ShoppingBag,
    Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { store, Destination } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

const timeIcons = {
    Morning: Sun,
    Afternoon: Sunset,
    Evening: Moon,
};

const activityIcons: Record<string, any> = {
    plane: Train,
    hotel: Hotel,
    food: Utensils,
    camera: Camera,
    train: Train,
    ship: Ship,
    wine: Wine,
    water: Ship, // Fallback for water/swim
    sun: Sun,
    tree: TreePine,
    monkey: TreePine, // Fallback
    dance: Music,
    shop: ShoppingBag,
    mountain: TreePine,
    walk: MapPin,
    bus: Train,
    beach: Sun,
    star: Moon,
    glass: Wine,
};

export default function DestinationDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [destination, setDestination] = useState<Destination | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            if (id) {
                try {
                    const data = await store.getDestination(parseInt(id));
                    setDestination(data);
                } catch (error) {
                    console.error("Failed to load destination", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchDestination();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!destination) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Destination Not Found</h1>
                <Button asChild>
                    <Link to="/destinations">Back to Destinations</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />

            {/* Hero */}
            <div className="relative h-[60vh] min-h-[500px]">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container mx-auto px-4 pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                                <Link to="/" className="hover:text-white">Home</Link>
                                <span>/</span>
                                <Link to="/destinations" className="hover:text-white">Destinations</Link>
                                <span>/</span>
                                <span className="text-white">{destination.name}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                {destination.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-medium">{destination.category}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                    <span className="text-sm font-medium">{destination.price}</span>
                                </div>
                            </div>

                            <p className="text-lg text-white/80 max-w-2xl">
                                {destination.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">3-Day Sample Itinerary</h2>
                    <div className="flex gap-3">
                        <Button variant="outline" asChild>
                            <Link to={`/dashboard/request?destination=${encodeURIComponent(destination.name)}`}>
                                Customize This Trip
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link to={`/dashboard/request?destination=${encodeURIComponent(destination.name)}&days=3&type=fixed`}>
                                Book This 3-Day Plan
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Day by Day */}
                <div className="space-y-8">
                    {destination.days?.map((day, dayIndex) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dayIndex * 0.1 }}
                            className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50"
                        >
                            {/* Day Header */}
                            <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-primary font-bold text-sm uppercase tracking-wider">Day {day.day}</span>
                                        <h3 className="text-xl font-semibold text-foreground mt-1">
                                            {day.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Activities */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {day.activities.map((activity, actIndex) => {
                                        const TimeIcon = timeIcons[activity.time as keyof typeof timeIcons] || Sun;
                                        const ActivityIcon = activityIcons[activity.icon as keyof typeof activityIcons] || MapPin;

                                        return (
                                            <motion.div
                                                key={actIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: dayIndex * 0.1 + actIndex * 0.05 }}
                                                className="flex gap-4 group"
                                            >
                                                {/* Timeline */}
                                                <div className="flex flex-col items-center">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                        <TimeIcon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    {actIndex < day.activities.length - 1 && (
                                                        <div className="w-0.5 flex-1 bg-border mt-2" />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 pb-2">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                        <span>{activity.time}</span>
                                                    </div>
                                                    <div className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                                                                <ActivityIcon className="w-5 h-5 text-foreground" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-foreground mb-1">
                                                                    {activity.title}
                                                                </h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {activity.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-card rounded-2xl shadow-card p-2 overflow-hidden"
                >
                    <div className="h-96 w-full rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">Map View of {destination.name}</p>
                        </div>
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=0,0`}
                            // Note: Real geocoding needed for accurate bbox, using world view for now or could try to approximate
                            className="z-10 relative"
                            style={{ pointerEvents: 'auto' }}
                        ></iframe>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
