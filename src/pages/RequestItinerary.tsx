import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { store } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, DollarSign, Clock, Phone, MessageSquare } from "lucide-react";

export default function RequestItinerary() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        destination: searchParams.get("destination") || "",
        days: Number(searchParams.get("days")) || 3,
        startDate: "",
        budget: "",
        mobile: "",
        isWhatsapp: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            await store.createRequest({
                userId: user.id,
                user: { name: user.name, email: user.email },
                destination: formData.destination,
                startDate: formData.startDate,
                days: Number(formData.days),
                budget: formData.budget,
                mobile: formData.mobile,
                isWhatsapp: formData.isWhatsapp,
                priority: "medium", // Default
            });

            toast({
                title: "Request Submitted!",
                description: "Our travel experts will start planning your trip.",
            });

            navigate("/dashboard");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit request. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar user={user} />

            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl shadow-lg border border-border/50 p-8"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">
                            {searchParams.get("type") === "fixed" ? "Confirm Your Trip" : "Plan Your Dream Trip"}
                        </h1>
                        <p className="text-muted-foreground">
                            {searchParams.get("type") === "fixed"
                                ? "Fill in your details to book this 3-day package."
                                : "Tell us your preferences and we'll craft the perfect itinerary."
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Destination */}
                        <div className="space-y-2">
                            <Label htmlFor="destination">Destination / Place Name</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="destination"
                                    required
                                    placeholder="e.g. Paris, Bali, Tokyo"
                                    className="pl-10"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Days */}
                            <div className="space-y-2">
                                <Label htmlFor="days">Number of Days</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="days"
                                        type="number"
                                        min="1"
                                        required
                                        className={`pl-10 ${searchParams.get("type") === "fixed" ? "bg-muted text-muted-foreground" : ""}`}
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                                        disabled={searchParams.get("type") === "fixed"}
                                    />
                                </div>
                            </div>

                            {/* Start Date */}
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="startDate"
                                        type="date"
                                        required
                                        className="pl-10"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                            <Label htmlFor="budget">Approximate Budget</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="budget"
                                    required
                                    placeholder="e.g. $2000 or ₹50,000"
                                    className="pl-10"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Mobile & WhatsApp */}
                        <div className="space-y-4 pt-2">
                            <Label htmlFor="mobile">Contact Information</Label>
                            <div className="space-y-3">
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="mobile"
                                        type="tel"
                                        required
                                        placeholder="Mobile Number"
                                        className="pl-10"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="whatsapp"
                                        checked={formData.isWhatsapp}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isWhatsapp: checked as boolean })}
                                    />
                                    <Label htmlFor="whatsapp" className="cursor-pointer flex items-center gap-1 font-normal">
                                        <MessageSquare className="w-4 h-4 text-green-600" />
                                        Contact me via WhatsApp
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Request"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
