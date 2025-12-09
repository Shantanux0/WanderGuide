import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { store, Destination } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

export default function Destinations() {
  const { user, toggleFavorite } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "National" | "International">("All");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await store.getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to load destinations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    const type = dest.locationType || "International";
    return matchesSearch && type === activeTab;
  });

  const handleToggleFavorite = (id: number) => {
    toggleFavorite(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover amazing places around the world and start planning your next adventure.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4">
              {["All", "National", "International"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as any)}
                  className="min-w-[100px]"
                >
                  {tab}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 bg-card animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card card-lift flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleToggleFavorite(dest.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${user?.favorites?.includes(dest.id)
                          ? "fill-coral text-coral"
                          : "text-white"
                          }`}
                      />
                    </button>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white font-bold text-lg">{dest.price}</span>
                      <span className="text-white/70 text-sm"> / person</span>
                    </div>
                    {/* Location Type Badge */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-medium uppercase">
                      {dest.locationType || "International"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {dest.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{dest.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{dest.reviews.toLocaleString()} reviews</span>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                      {dest.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dest.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-auto" asChild>
                      <Link to={`/destination/${dest.id}`}>
                        View Sample Itinerary
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Tell us your dream destination and our travel experts will craft a personalized itinerary just for you.
          </p>
          <Button variant="cta" size="lg" asChild>
            <Link to="/dashboard/request">Request Custom Itinerary</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
