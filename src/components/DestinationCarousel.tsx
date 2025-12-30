import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const trendingDestinations = [
  {
    id: 1,
    name: "Goa, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    travelers: "2.4k travelers this month",
  },
  {
    id: 2,
    name: "Manali, India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
    travelers: "1.8k travelers this month",
  },
  {
    id: 3,
    name: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    travelers: "3.1k travelers this month",
  },
  {
    id: 17,
    name: "Hampi, India",
    image: "/Hampi_karnataka.jpg",
    travelers: "1.2k travelers this month",
  },
  {
    id: 16,
    name: "Konkan, India",
    image: "/konkan.webp",
    travelers: "2.0k travelers this month",
  },
];

export function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) =>
      prev === trendingDestinations.length - 3 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? trendingDestinations.length - 3 : prev - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-semibold">Trending Destinations</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${currentIndex * (100 / 3 + 1.33)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {trendingDestinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              className="min-w-[calc(33.333%-0.67rem)] group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/destination/${dest.id}`}>
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm">
                      {dest.name}
                    </h3>
                    <p className="text-white/70 text-xs">{dest.travelers}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
