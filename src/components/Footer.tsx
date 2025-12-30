
import { Compass, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Compass className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight text-primary">WanderGuide</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Curating unforgettable journeys and helping you discover the world's hidden gems with ease.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
                            <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                hello@wanderguide.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Pune, India
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} WanderGuide. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
