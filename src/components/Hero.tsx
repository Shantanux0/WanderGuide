import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Plane, Search, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { store, Destination } from "@/lib/store";

const destinationsLocations = [
  { name: "New York", top: "32%", left: "24%" },
  { name: "Paris", top: "27%", left: "48%" },
  { name: "Tokyo", top: "35%", left: "80%" },
  { name: "Rio", top: "70%", left: "30%" },
  { name: "Cape Town", top: "75%", left: "52%" },
  { name: "Sydney", top: "75%", left: "85%" },
  { name: "New Delhi", top: "40%", left: "66%" },
];

const FadeText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <span className="inline-flex h-[1.2em] relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-white/90 font-medium whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await store.getDestinations();
        setAllDestinations(data);
      } catch (e) {
        console.error("Failed to fetch destinations", e);
      }
    };
    fetch();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDestinations = allDestinations.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.locationType?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If exact match found, go there
    const exactMatch = allDestinations.find(d => d.name.toLowerCase() === searchQuery.toLowerCase());
    if (exactMatch) {
      navigate(`/destination/${exactMatch.id}`);
    } else {
      navigate(`/dashboard/request?destination=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with world map pattern */}
      <div className="absolute inset-0 bg-primary">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 animated-gradient opacity-90" />

        {/* World Map Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <img src="/world-map-minimal.avif" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Map dots pattern - Keeping existing as requested, though image might overlap */}
        <div className="absolute inset-0 map-dots opacity-30" />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsla(200, 47%, 33%, 0.75), hsla(0, 0%, 0%, 0.6))"
          }}
        />
      </div>

      {/* Animated destination pins */}
      {destinationsLocations.map((dest, i) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
          className="absolute hidden md:flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{ top: dest.top, left: dest.left }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="relative">
              <MapPin className="w-6 h-6 text-accent fill-accent" />
              <div className="absolute inset-0 bg-accent/30 rounded-full animate-ping" />
            </div>
          </motion.div>
          <span className="mt-1 text-xs text-white/80 font-medium">{dest.name}</span>
        </motion.div>
      ))}

      {/* Flying plane animation */}
      <motion.div
        className="absolute top-1/4 hidden md:block"
        animate={{ x: ["-100vw", "100vw"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Plane className="w-8 h-8 text-white/40 rotate-45" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, layout: { duration: 0.3 } }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="text-sm text-white/90 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2" />
              <FadeText texts={[
                "Pune",
                "Jaipur",
                "Goa",
                "Ladakh",
                "Kerala",
                "Manali"
              ]} />
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Journey
            <br />
            <span className="text-gradient-warm">Begins Here</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mb-10 font-light"
          >
            Explore. Plan. Wander.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-sm mx-auto mb-10 relative z-50"
            ref={dropdownRef}
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Where to next?"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/30 transition-all text-sm shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-white border-0"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showDropdown && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden text-left"
                >
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Destinations
                    </div>

                    {filteredDestinations.map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => navigate(`/destination/${dest.id}`)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {dest.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {dest.locationType || "Destination"}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}

                    {filteredDestinations.length === 0 && (
                      <div className="px-4 py-3 text-muted-foreground text-sm text-center italic">
                        No destinations found matching "{searchQuery}"
                      </div>
                    )}

                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={() => navigate(`/dashboard/request?destination=${encodeURIComponent(searchQuery)}`)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/5 transition-colors text-primary font-medium"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          Request Itinerary for "{searchQuery}"
                          <div className="text-xs text-muted-foreground font-normal">
                            Cannot find what you're looking for? Let us plan it for you.
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="cta" size="xl" asChild>
              <Link to={user ? "/dashboard" : "/login?signup=true"} className="gap-2">
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/destinations">Browse Destinations</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: "50+", label: "Destinations" },
              { value: "10k+", label: "Happy Travelers" },
              { value: "4.9", label: "Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section >
  );
}
