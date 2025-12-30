import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Sun,
  Sunset,
  Moon,
  Download,
  Share2,
  Printer,
  Hotel,
  Utensils,
  Camera,
  Train,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { store, Itinerary } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

const timeIcons = {
  Morning: Sun,
  Afternoon: Sunset,
  Evening: Moon,
};

const activityIcons = {
  plane: Train,
  hotel: Hotel,
  food: Utensils,
  camera: Camera,
  train: Train,
};

interface ItineraryDetailProps {
  previewData?: Itinerary;
}

export default function ItineraryDetail({ previewData }: ItineraryDetailProps) {
  const { id } = useParams();
  const { user } = useAuth();
  const [itineraryData, setItineraryData] = useState<Itinerary | undefined>(previewData);
  const [loading, setLoading] = useState(!previewData);

  useEffect(() => {
    if (previewData) {
      setItineraryData(previewData);
      setLoading(false);
      return;
    }

    const fetchItinerary = async () => {
      if (id) {
        try {
          const data = await store.getItinerary(id);
          setItineraryData(data);
        } catch (error) {
          console.error("Failed to load itinerary", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchItinerary();
  }, [id, previewData]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!itineraryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Itinerary Not Found</h1>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <img
          src={itineraryData.heroImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop"}
          alt={itineraryData.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Itineraries</span>
                <span>/</span>
                <span className="text-white">{itineraryData.destination}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {itineraryData.destination}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{itineraryData.startDate} — {itineraryData.endDate}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-sm font-medium">{itineraryData.price ? `$${itineraryData.price}` : "Price TBD"}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-white text-black hover:bg-white/90 border-0">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
                <Button variant="outline" className="text-white border-white/20 bg-black/20 hover:bg-black/40 hover:text-white backdrop-blur-sm">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Itinerary Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Your Itinerary</h2>
              <div className="space-y-8">
                {itineraryData.days.map((day, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dayIndex * 0.1 }}
                    className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50"
                  >
                    {/* Day Header */}
                    <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
                      <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">{day.date || `Day ${day.day}`}</span>
                        <h3 className="text-xl font-semibold text-foreground mt-1">{day.title}</h3>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="p-6">
                      <div className="space-y-6">
                        {day.activities.map((act, actIndex) => (
                          <div key={actIndex} className="flex gap-4 group">
                            {/* Timeline section */}
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <div className="w-5 h-5 text-primary flex items-center justify-center">
                                  {act.time === 'Morning' ? <span className="text-lg">☀️</span> :
                                    act.time === 'Evening' ? <span className="text-lg">🌙</span> :
                                      <span className="text-lg">🌤️</span>}
                                </div>
                              </div>
                              {actIndex < day.activities.length - 1 && (
                                <div className="w-0.5 flex-1 bg-border mt-2" />
                              )}
                            </div>

                            {/* Activity Content */}
                            <div className="flex-1 pb-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <span>{act.time}</span>
                              </div>
                              <div className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col md:flex-row gap-4">
                                  {act.image && (
                                    <img
                                      src={act.image}
                                      alt={act.title}
                                      className="w-full md:w-32 h-32 object-cover rounded-lg flex-shrink-0"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-foreground mb-1 text-lg">{act.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{act.description}</p>

                                    {act.location && (
                                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        <a
                                          href={act.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.location)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit bg-primary/10 px-2.5 py-1 rounded-md transition-colors hover:bg-primary/20"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <MapPin className="w-3.5 h-3.5" />
                                          {act.location}
                                        </a>
                                        {act.visitTime && (
                                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                                            <span className="text-lg">⏰</span>
                                            <span>{act.visitTime}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {act.foodRecommendation && (
                                      <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 mt-3 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-md border border-amber-100 dark:border-amber-900/50 w-fit">
                                        <Utensils className="w-3.5 h-3.5" />
                                        <span className="font-medium">Famous Food:</span>
                                        <span>{act.foodRecommendation}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
