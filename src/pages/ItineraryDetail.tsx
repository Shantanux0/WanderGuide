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
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={itineraryData.heroImage}
          alt={itineraryData.destination}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
                <span>/</span>
                <Link to="/dashboard/itineraries" className="hover:text-white">Itineraries</Link>
                <span>/</span>
                <span className="text-white">{itineraryData.destination}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <Badge variant={itineraryData.status as any} className="mb-3">
                    {itineraryData.status.charAt(0).toUpperCase() + itineraryData.status.slice(1)}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {itineraryData.destination}
                  </h1>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{itineraryData.startDate} — {itineraryData.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{itineraryData.days.length} days</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="glass" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="glass" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="glass" size="sm">
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Day by Day */}
        <div className="space-y-8">
          {itineraryData.days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              className="bg-card rounded-2xl shadow-card overflow-hidden"
            >
              {/* Day Header */}
              <div className="bg-primary px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary-foreground/70 text-sm">Day {day.day}</span>
                    <h3 className="text-xl font-semibold text-primary-foreground">
                      {day.title}
                    </h3>
                  </div>
                  <div className="text-primary-foreground/80 text-sm">
                    {day.date}
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
                        className="flex gap-4"
                      >
                        {/* Timeline */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <TimeIcon className="w-5 h-5 text-accent" />
                          </div>
                          {actIndex < day.activities.length - 1 && (
                            <div className="w-0.5 flex-1 bg-border mt-2" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <span>{activity.time}</span>
                          </div>
                          <div className="bg-muted/50 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <ActivityIcon className="w-5 h-5 text-primary" />
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

        {/* Map placeholder */}
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-card rounded-2xl shadow-card p-2 overflow-hidden"
        >
          <div className="h-96 w-full rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(itineraryData.destination)}`}
            ></iframe>
            {/* Note: Since we don't have a real API key, we'll revert to a static openstreetmap for demo purposes or keep the placeholder better styled */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-muted/10">
              {/* Fallback IFRAME for OpenStreetMap which doesn't need key */}
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik&marker=51.47734914170364%2C-0.001856088638305664`}
                style={{ pointerEvents: 'auto', background: '#e5e7eb' }}
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
