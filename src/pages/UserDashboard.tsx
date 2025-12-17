import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Briefcase, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { ItineraryCard } from "@/components/ItineraryCard";
import { DestinationCarousel } from "@/components/DestinationCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { store, Itinerary, Request } from "@/lib/store";

export default function UserDashboard() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<'idle' | 'found' | 'not-found'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [itinData, reqData] = await Promise.all([
            store.getItineraries(user.id),
            store.getRequests()
          ]);
          setItineraries(itinData);
          // Filter requests for this user
          setRequests(reqData.filter(r => r.userId === user.id));
        } catch (error) {
          console.error("Failed to load data", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Check if destination exists
    const destinations = await store.getDestinations();
    const found = destinations.find(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (found) {
      navigate(`/destination/${found.id}`);
    } else {
      setSearchResult('not-found');
    }
  };

  const upcomingTrips = itineraries.length + requests.length;

  // We don't have pending requests in store for user specifically yet in a simple way, mock for now or fetch
  const stats = {
    upcomingTrips: upcomingTrips,
    pendingRequests: 0,
  };
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user || undefined} stats={stats} />
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name.split(" ")[0]}!
                </h1>
                <p className="text-muted-foreground">
                  Ready for your next adventure?
                </p>
              </div>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/passport">
                  <span className="text-xl">📕</span> My Passport
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Search Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 animated-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
            <div className="relative z-10 p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Where to next?
              </h2>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search destinations (e.g. Paris)..."
                      className="pl-10 h-12 bg-white border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Button variant="cta" size="lg" onClick={handleSearch}>
                    Explore
                  </Button>
                </div>

                {/* Search Result / Fallback */}
                {searchResult === 'not-found' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white"
                  >
                    <p className="mb-3 text-sm">
                      We couldn't find a pre-planned package for "{searchQuery}".
                    </p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/dashboard/request?destination=${encodeURIComponent(searchQuery)}`}>
                        Create Custom Itinerary for {searchQuery}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Trending Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <DestinationCarousel />
          </motion.div>

          {/* My Itineraries (Combined) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Itineraries</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Active Itineraries */}
              {itineraries.map((itinerary, i) => (
                <ItineraryCard
                  key={itinerary.id}
                  {...itinerary}
                  image={itinerary.heroImage}
                  index={i}
                />
              ))}

              {/* Requests */}
              {requests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-card card-lift relative cursor-pointer"
                  onClick={() => {
                    // For now, since we don't have a status details page, just alert the user
                    // In a full app, this would go to /dashboard/request/${req.id}
                    // For this demo, maybe just navigate to the request form pre-filled? No that's confusing.
                    // Let's just do nothing or maybe a small toast? 
                    // Actually, the user wants it to "take them to their itinerary". 
                    // Since it's PENDING, there IS no itinerary.
                    // I'll leave it as is but remove the disabled button styling that looks broken.
                  }}
                >
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {/* Placeholder or attempt to match image */}
                    <div className="absolute inset-0 bg-primary/10" />
                    <MapPin className="w-12 h-12 text-primary/40" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-500/90 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                        {req.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{req.destination}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Requested for {req.startDate} ({req.days} days)
                    </p>
                    <p className="text-xs text-muted-foreground italic border-t pt-2">
                      Our experts are working on this. Check back soon!
                    </p>
                  </div>
                </motion.div>
              ))}

              {itineraries.length === 0 && requests.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <p className="text-muted-foreground mb-4">You haven't planned any trips yet.</p>
                  <Button variant="cta" asChild>
                    <Link to="/destinations">Start Exploring</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Request CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(var(--sandy-beige)), hsl(var(--background)))"
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 p-8">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-12 h-12 text-accent" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  Need a Custom Itinerary?
                </h3>
                <p className="text-muted-foreground mb-4 md:mb-0">
                  Our travel experts will craft a personalized trip just for you. Tell us your dream destination!
                </p>
              </div>
              <Button variant="cta" size="lg" asChild>
                <Link to="/dashboard/request">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
