import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Compass, Camera, Map, Coffee, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutUs() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Navbar isTransparent={true} />

            {/* Hero: The Cinematic Opening */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    {/* Darker gradient at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
                        alt="Wanderer overlooking mountains"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="relative z-20 container mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.2em" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-xs md:text-sm font-bold uppercase mb-6 tracking-[0.2em] text-white/80"
                    >
                        The Art of Travel
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 leading-none tracking-tight"
                    >
                        Wander<br /><span className="italic font-light text-white/90">Guide</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="max-w-xl mx-auto text-lg md:text-xl text-white/80 font-light leading-relaxed"
                    >
                        We believe that travel is the only thing you buy that makes you richer. it's about the stories you bring back.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* The Manifesto: Editorial Typography */}
            <section className="py-32 bg-background relative overflow-hidden">
                {/* Subtle texture or text in background */}
                <div className="absolute top-20 left-0 text-[20vw] leading-none font-bold text-foreground/5 pointer-events-none select-none">
                    ROAM
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-12">
                            "We built WanderGuide because we refused to accept that travel should be <span className="text-muted-foreground line-through decoration-primary decoration-2">stressful</span>."
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                The modern world is loud. It's filled with notifications, deadlines, and the constant pressure to be " productive." Travel is our escape. It's the pause button.
                            </p>
                            <p>
                                But planning that escape often feels like work. We wanted to change that. We wanted to create a space where the *planning* feels as inspiring as the *journey*. Where you can discover the soul of a city before you even pack your bags.
                            </p>
                        </div>

                        <div className="mt-16 border-l-2 border-primary pl-8 py-2 italic text-xl text-foreground/80">
                            Our philosophy is simple: <strong className="text-foreground">Authenticity over popularity.</strong> We'd rather send you to a hole-in-the-wall dumpling shop in Tokyo than a tourist trap.
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Scrollytelling Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* Large Image */}
                        <div className="md:col-span-7 h-[600px] relative rounded-lg overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop"
                                alt="Culinary experiences"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                            />
                            <div className="absolute bottom-8 left-8 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                                        <Coffee className="w-5 h-5" />
                                    </div>
                                    <span className="uppercase tracking-widest text-sm font-bold">Taste</span>
                                </div>
                                <h3 className="text-3xl font-serif">Culinary Journeys</h3>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="md:col-span-5 md:pl-8 space-y-6">
                            <h3 className="text-4xl font-bold">Not Just Sightseeing. <br /> <span className="text-primary font-serif italic">Soul-seeking.</span></h3>
                            <p className="text-muted-foreground">
                                You don't just see a place with your eyes. You taste it in the street food, hear it in the morning markets, and feel it in the cobblestones under your feet.
                            </p>
                            <p className="text-muted-foreground">
                                Our curated itineraries focus on sensory experiences that connect you to the local culture.
                            </p>
                        </div>
                    </div>

                    {/* Inverted Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-24">
                        <div className="md:col-span-5 md:pr-8 space-y-6 order-2 md:order-1">
                            <h3 className="text-4xl font-bold">Hidden Gems, <br /> <span className="text-primary font-serif italic">Revealed.</span></h3>
                            <p className="text-muted-foreground">
                                Forget the generic "Top 10" lists. We work with local experts to find the spots that don't make it into the guidebooks.
                            </p>
                            <Link to="/destinations" className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-4">
                                Explore our secret spots <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="md:col-span-7 h-[600px] relative rounded-lg overflow-hidden group order-1 md:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop"
                                alt="Mountain landscape"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                            />
                            <div className="absolute bottom-8 left-8 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                                        <Map className="w-5 h-5" />
                                    </div>
                                    <span className="uppercase tracking-widest text-sm font-bold">Discover</span>
                                </div>
                                <h3 className="text-3xl font-serif">Untouched Landscapes</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Team Section (Minimal) */}
            <section className="py-32 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-16">The Minds Behind The Maps</h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        {[
                            { name: "Global Nomads", role: "Verification Team" },
                            { name: "Local Locals", role: "Content Curators" },
                            { name: "Tech Wizards", role: "Platform Builders" },
                        ].map((group, i) => (
                            <div key={i} className="space-y-2">
                                <div className="w-40 h-40 mx-auto bg-background rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30 relative overflow-hidden group hover:border-solid hover:border-primary transition-all">
                                    <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                                    <Users className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg">{group.name}</h3>
                                <div className="text-sm text-muted-foreground uppercase tracking-wide">{group.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cinematic CTA */}
            <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2670&auto=format&fit=crop"
                        alt="Sunrise"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center text-white space-y-8 px-4">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold">Your Story Begins Here</h2>
                    <p className="text-xl max-w-lg mx-auto text-white/80">
                        The world is vast, beautiful, and waiting for you.
                    </p>
                    <Button variant="default" size="xl" className="bg-white text-black hover:bg-white/90 rounded-full px-12" asChild>
                        <Link to="/destinations">Start Your Journey</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
