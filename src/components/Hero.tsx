import { motion } from "framer-motion";
import { MapPin, ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const destinations = [
  { name: "Paris", top: "20%", left: "45%" },
  { name: "Tokyo", top: "35%", left: "80%" },
  { name: "New York", top: "30%", left: "25%" },
  { name: "Sydney", top: "70%", left: "85%" },
  { name: "Rio", top: "60%", left: "30%" },
  { name: "Cape Town", top: "65%", left: "52%" },
];

export function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with world map pattern */}
      <div className="absolute inset-0 bg-primary">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 animated-gradient opacity-90" />

        {/* Map dots pattern */}
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
      {destinations.map((dest, i) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
          className="absolute hidden md:flex flex-col items-center"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-white/90">Plan your next adventure</span>
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
    </section>
  );
}
