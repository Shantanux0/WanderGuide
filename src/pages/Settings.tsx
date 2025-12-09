import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { store, User } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { User as UserIcon, Bell, Globe, Map } from "lucide-react";

export default function Settings() {
    const { user, login } = useAuth(); // We might need a way to update the user in context, 'login' updates it if we treat it as re-auth or just manual update? 
    // Actually, AuthContext should probably have an update function, but store.updateUser updates the DB.
    // We'll update store then maybe hack a state update or just trust the store on refresh.

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "travel">("profile");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currency: "USD",
        language: "en",
        emailNotif: true,
        whatsappNotif: true,
        dietary: "",
        travelStyle: "Balanced"
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                currency: user.preferences?.currency || "USD",
                language: user.preferences?.language || "en",
                emailNotif: user.preferences?.notifications?.email ?? true,
                whatsappNotif: user.preferences?.notifications?.whatsapp ?? true,
                dietary: user.preferences?.travel?.dietary?.join(", ") || "",
                travelStyle: user.preferences?.travel?.travelStyle || "Balanced"
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const dietaryArray = formData.dietary.split(",").map(s => s.trim()).filter(Boolean);

            const updates: Partial<User> = {
                name: formData.name,
                preferences: {
                    currency: formData.currency as any,
                    language: formData.language as any,
                    notifications: {
                        email: formData.emailNotif,
                        whatsapp: formData.whatsappNotif,
                        marketing: false
                    },
                    travel: {
                        dietary: dietaryArray,
                        travelStyle: formData.travelStyle as any
                    }
                }
            };

            await store.updateUser(user.id, updates);

            // In a real app we'd update context state here. 
            // For now, let's just show success
            toast({
                title: "Settings Saved",
                description: "Your preferences have been updated.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save settings.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />

            <div className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar / Tabs */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-col gap-2">
                                <Button
                                    variant={activeTab === "profile" ? "secondary" : "ghost"}
                                    className="justify-start"
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    Profile
                                </Button>
                                <Button
                                    variant={activeTab === "preferences" ? "secondary" : "ghost"}
                                    className="justify-start"
                                    onClick={() => setActiveTab("preferences")}
                                >
                                    <Globe className="w-4 h-4 mr-2" />
                                    App Preferences
                                </Button>
                                <Button
                                    variant={activeTab === "travel" ? "secondary" : "ghost"}
                                    className="justify-start"
                                    onClick={() => setActiveTab("travel")}
                                >
                                    <Map className="w-4 h-4 mr-2" />
                                    Travel Style
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">

                                {activeTab === "profile" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email Address</label>
                                            <Input
                                                value={formData.email}
                                                disabled
                                                className="bg-muted opacity-70"
                                            />
                                            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "preferences" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">App Preferences</h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Currency</label>
                                                <select
                                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    value={formData.currency}
                                                    onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                                >
                                                    <option value="USD">USD ($)</option>
                                                    <option value="INR">INR (₹)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Language</label>
                                                <select
                                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    value={formData.language}
                                                    onChange={e => setFormData({ ...formData, language: e.target.value })}
                                                >
                                                    <option value="en">English</option>
                                                    <option value="es">Spanish</option>
                                                    <option value="fr">French</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <h3 className="text-sm font-semibold mb-4">Notifications</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm">Email Notifications</label>
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.emailNotif}
                                                        onChange={e => setFormData({ ...formData, emailNotif: e.target.checked })}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm">WhatsApp Updates</label>
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.whatsappNotif}
                                                        onChange={e => setFormData({ ...formData, whatsappNotif: e.target.checked })}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "travel" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">Travel Preferences</h2>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Travel Style</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {["Relaxed", "Balanced", "Adventure"].map(style => (
                                                    <div
                                                        key={style}
                                                        onClick={() => setFormData({ ...formData, travelStyle: style })}
                                                        className={`
                                cursor-pointer rounded-lg border p-4 text-center text-sm font-medium transition-colors
                                ${formData.travelStyle === style
                                                                ? "bg-primary text-primary-foreground border-primary"
                                                                : "hover:bg-accent hover:text-accent-foreground"}
                              `}
                                                    >
                                                        {style}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Dietary Restrictions</label>
                                            <Input
                                                placeholder="e.g. Vegetarian, Gluten-free, Halal"
                                                value={formData.dietary}
                                                onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                                            />
                                            <p className="text-xs text-muted-foreground">Separate multiple items with commas</p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 pt-6 border-t flex justify-end">
                                    <Button onClick={handleSave} disabled={loading} size="lg">
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
