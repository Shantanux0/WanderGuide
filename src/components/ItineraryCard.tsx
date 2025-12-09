import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ItineraryCardProps {
  id: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "draft" | "completed" | "cancelled";
  index?: number;
}

export function ItineraryCard({
  id,
  destination,
  image,
  startDate,
  endDate,
  status,
  index = 0,
}: ItineraryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group bg-card rounded-xl overflow-hidden shadow-card card-lift"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge
          variant={status}
          className="absolute top-3 right-3"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-lg text-foreground">{destination}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            {startDate} — {endDate}
          </span>
        </div>

        <Button variant="outline" size="sm" className="w-full group/btn" asChild>
          <Link to={`/itinerary/${id}`}>
            View Details
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
