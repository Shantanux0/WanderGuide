import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Heart, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Link, useSearchParams } from "react-router-dom";
import { store, Destination } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

export default function Destinations() {
  const { user, toggleFavorite } = useAuth();
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
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

  const handleToggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
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
                  className="h-full"
                >
                  <Link to={`/destination/${dest.id}`} className="block h-full">
                    <Card className="overflow-hidden group h-full hover:shadow-lg transition-all duration-300 card-lift border-border/50">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-2 right-2 flex gap-2">
                          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-white border border-white/10">
                            {dest.category}
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleToggleFavorite(e, dest.id)}
                          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all hover:bg-black/60 border border-white/10 group/heart"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${user?.favorites?.includes(dest.id)
                                ? "fill-rose-500 text-rose-500"
                                : "text-white group-hover/heart:text-rose-400"
                              }`}
                          />
                        </button>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground flex justify-between items-start text-lg">
                          {dest.name}
                          <span className="text-sm font-normal text-muted-foreground flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-full">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            {dest.rating}
                          </span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed">{dest.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          {dest.locationType || "International"} • {dest.reviews} reviews
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 p-4 bg-muted/30 group-hover:bg-muted/50 transition-colors mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Starting from</span>
                          <span className="font-semibold text-foreground">{dest.price}</span>
                        </div>
                        <Button size="sm" variant="outline" className="h-8 text-xs border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                          View Details <ArrowRight className="w-3 h-3 ml-1.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
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
