import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { store, Destination, ItineraryDay } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, MapPin, Edit2, Save, Trash2, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function AdminDestinations() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Default 3-Day Itinerary Helper
    const getDefaultItinerary = (): ItineraryDay[] => {
        return [1, 2, 3].map(day => ({
            day: day,
            date: `Day ${day}`,
            title: `Day ${day} Exploration`,
            activities: [
                { time: "Morning", icon: "sun", title: "Morning Activity", description: "Start your day with...", image: "", location: "" },
                { time: "Afternoon", icon: "camera", title: "Afternoon Sightseeing", description: "Visit the famous...", image: "", location: "" },
                { time: "Evening", icon: "moon", title: "Evening Relax", description: "End your day with...", image: "", location: "" }
            ]
        }));
    };

    // Form State
    const [formData, setFormData] = useState<{
        name: string;
        image: string;
        description: string;
        price: string;
        category: string;
        rating: string;
        reviews: string;
        days: ItineraryDay[];
    }>({
        name: "",
        image: "",
        description: "",
        price: "",
        category: "",
        rating: "4.5",
        reviews: "0",
        days: getDefaultItinerary()
    });

    useEffect(() => {
        loadDestinations();
    }, []);

    const loadDestinations = async () => {
        const data = await store.getDestinations();
        setDestinations(data);
    };

    const filteredDestinations = destinations.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async () => {
        try {
            if (editingId) {
                await store.updateDestination(editingId, {
                    ...formData,
                    rating: parseFloat(formData.rating),
                    reviews: parseInt(formData.reviews)
                });
                toast({ title: "Success", description: "Destination updated successfully." });
            } else {
                await store.addDestination({
                    ...formData,
                    rating: parseFloat(formData.rating),
                    reviews: parseInt(formData.reviews),
                    tags: [], // Basic implementation
                });
                toast({ title: "Success", description: "New destination added." });
            }
            setIsDialogOpen(false);
            loadDestinations();
            resetForm();
        } catch (e) {
            toast({ title: "Error", description: "Failed to save destination.", variant: "destructive" });
        }
    };

    const startEdit = (dest: Destination) => {
        setEditingId(dest.id);
        setFormData({
            name: dest.name,
            image: dest.image,
            description: dest.description || "",
            price: dest.price,
            category: dest.category,
            rating: dest.rating.toString(),
            reviews: dest.reviews.toString(),
            days: dest.days && dest.days.length > 0 ? dest.days : getDefaultItinerary()
        });
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            name: "",
            image: "",
            description: "",
            price: "",
            category: "",
            rating: "4.5",
            reviews: "0",
            days: getDefaultItinerary()
        });
    };

    const updateDayTitle = (dayIndex: number, newTitle: string) => {
        const newDays = [...formData.days];
        newDays[dayIndex].title = newTitle;
        setFormData({ ...formData, days: newDays });
    };

    const updateDayDate = (dayIndex: number, newDate: string) => {
        const newDays = [...formData.days];
        newDays[dayIndex].date = newDate;
        setFormData({ ...formData, days: newDays });
    };

    const updateActivity = (dayIndex: number, actIndex: number, field: string, value: string) => {
        const newDays = [...formData.days];
        // @ts-ignore
        newDays[dayIndex].activities[actIndex][field] = value;
        setFormData({ ...formData, days: newDays });
    };

    const addActivity = (dayIndex: number) => {
        const newDays = [...formData.days];
        newDays[dayIndex].activities.push({
            time: "Morning",
            icon: "map-pin",
            title: "",
            description: "",
            image: "",
            location: "",
            mapUrl: "",
            visitTime: "",
            foodRecommendation: ""
        });
        setFormData({ ...formData, days: newDays });
    };

    const removeActivity = (dayIndex: number, actIndex: number) => {
        const newDays = [...formData.days];
        newDays[dayIndex].activities.splice(actIndex, 1);
        setFormData({ ...formData, days: newDays });
    };

    const addDay = () => {
        const newDays = [...formData.days];
        newDays.push({
            day: newDays.length + 1,
            date: `Day ${newDays.length + 1}`,
            title: `Day ${newDays.length + 1} Exploration`,
            activities: []
        });
        setFormData({ ...formData, days: newDays });
    };

    const removeDay = (dayIndex: number) => {
        const newDays = [...formData.days];
        newDays.splice(dayIndex, 1);
        // Re-index days
        const reindexedDays = newDays.map((day, index) => ({
            ...day,
            day: index + 1,
            date: day.date.startsWith("Day") ? `Day ${index + 1}` : day.date
        }));
        setFormData({ ...formData, days: reindexedDays });
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            <div className="hidden md:block">
                <Sidebar user={user || undefined} isAdmin={true} />
            </div>

            <main className="flex-1 pb-20 md:pb-0">
                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
                    >
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Destinations</h1>
                            <p className="text-zinc-400">Manage travel locations and details.</p>
                        </div>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={resetForm}>
                                    <Plus className="w-4 h-4 mr-2" /> Add New Place
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-2xl max-h-[85vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingId ? "Edit Destination" : "Add New Destination"}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800"
                                                placeholder="e.g. Kyoto, Japan"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Input
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800"
                                                placeholder="e.g. Cultural"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <ImageUpload
                                            value={formData.image}
                                            onChange={(val) => setFormData({ ...formData, image: val })}
                                            placeholder="https://... or upload file"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="bg-zinc-950 border-zinc-800"
                                            placeholder="Brief description..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 col-span-2">
                                        <div className="space-y-2">
                                            <Label>Price (approx)</Label>
                                            <Input
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800"
                                                placeholder="₹25,000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Rating</Label>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                value={formData.rating}
                                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Reviews</Label>
                                            <Input
                                                type="number"
                                                value={formData.reviews}
                                                onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800"
                                            />
                                        </div>
                                    </div>

                                    {/* Itinerary Section */}
                                    <div className="col-span-2 mt-4">
                                        <Label className="text-lg font-semibold mb-2 block">Itinerary Plan (3 Days)</Label>
                                        <Tabs defaultValue="day-0" className="w-full">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TabsList className="bg-zinc-800 flex-1 justify-start overflow-x-auto">
                                                    {formData.days.map((day, index) => (
                                                        <TabsTrigger key={index} value={`day-${index}`} className="flex-shrink-0">Day {index + 1}</TabsTrigger>
                                                    ))}
                                                </TabsList>
                                                <Button variant="outline" size="icon" onClick={addDay} className="shrink-0 bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            {formData.days.map((day, dayIndex) => (
                                                <TabsContent key={dayIndex} value={`day-${dayIndex}`} className="space-y-4 pt-4">
                                                    <div className="flex items-end gap-2">
                                                        <div className="space-y-2 w-1/4">
                                                            <Label>Date / Label</Label>
                                                            <Input
                                                                value={day.date}
                                                                onChange={(e) => updateDayDate(dayIndex, e.target.value)}
                                                                className="bg-zinc-950 border-zinc-800"
                                                                placeholder="e.g. Day 1"
                                                            />
                                                        </div>
                                                        <div className="space-y-2 flex-1">
                                                            <Label>Day Title</Label>
                                                            <Input
                                                                value={day.title}
                                                                onChange={(e) => updateDayTitle(dayIndex, e.target.value)}
                                                                className="bg-zinc-950 border-zinc-800"
                                                            />
                                                        </div>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => removeDay(dayIndex)}
                                                            className="bg-red-900/20 text-red-400 hover:bg-red-900/40 border-red-900/50 border mb-0.5"
                                                            disabled={formData.days.length <= 1}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    {day.activities.map((activity, actIndex) => (
                                                        <div key={actIndex} className="p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 space-y-3 relative group">
                                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => removeActivity(dayIndex, actIndex)}
                                                                    className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <div className="w-1/3">
                                                                    <Label className="text-xs text-zinc-500 mb-1.5 block">Time</Label>
                                                                    <Input
                                                                        value={activity.time}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'time', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="e.g. 10:00 AM"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <Label className="text-xs text-zinc-500 mb-1.5 block">Activity Title</Label>
                                                                    <Input
                                                                        value={activity.title}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'title', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="Activity Title"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="pt-1">
                                                                <Label className="text-xs text-zinc-500 mb-1.5 block">Activity Image</Label>
                                                                <ImageUpload
                                                                    value={activity.image || ""}
                                                                    onChange={(val) => updateActivity(dayIndex, actIndex, 'image', val)}
                                                                    className="w-full"
                                                                    placeholder="Activity Image URL or Upload"
                                                                />
                                                            </div>
                                                            <Textarea
                                                                value={activity.description}
                                                                onChange={(e) => updateActivity(dayIndex, actIndex, 'description', e.target.value)}
                                                                className="bg-zinc-900 border-zinc-800 min-h-[60px] text-sm"
                                                                placeholder="Activity Description"
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-zinc-500" />
                                                                <div className="flex-1 space-y-2">
                                                                    <Input
                                                                        value={activity.location || ""}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'location', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="Location Name (e.g. MG Road)"
                                                                    />
                                                                    <Input
                                                                        value={activity.mapUrl || ""}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'mapUrl', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="Google Maps Link (optional)"
                                                                    />
                                                                    <Input
                                                                        value={activity.visitTime || ""}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'visitTime', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="Visit Time (e.g. 10:00 AM - 12:00 PM)"
                                                                    />
                                                                    <Input
                                                                        value={activity.foodRecommendation || ""}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'foodRecommendation', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                        placeholder="Famous Food (e.g. Vada Pav)"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => addActivity(dayIndex)}
                                                        className="w-full border-dashed border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700 text-zinc-400"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Activity
                                                    </Button>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </div>
                                </div>
                                <DialogFooter className="gap-2">
                                    <Button variant="outline" onClick={() => setShowPreview(true)} className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300">
                                        Open Preview
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">Cancel</Button>
                                    <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Preview Dialog */}
                        <Dialog open={showPreview} onOpenChange={setShowPreview}>
                            <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-background overflow-y-auto border-zinc-800">
                                <ScrollArea className="flex-1 bg-background text-foreground">
                                    <div className="p-0">
                                        {/* Hero Section Preview */}
                                        <div className="relative h-[400px] w-full">
                                            <img
                                                src={formData.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop"}
                                                alt={formData.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />
                                            <div className="absolute inset-0 flex flex-col justify-end">
                                                <div className="container mx-auto px-6 pb-8">
                                                    <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                                                        <span>Home</span>
                                                        <span>/</span>
                                                        <span>Destinations</span>
                                                        <span>/</span>
                                                        <span className="text-white">{formData.name || "Destination Name"}</span>
                                                    </div>

                                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{formData.name || "Destination Name"}</h1>

                                                    <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                                            <MapPin className="w-4 h-4" />
                                                            <span className="text-sm font-medium">{formData.category || "Category"}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                                            <span className="text-sm font-medium">{formData.price || "Price"}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-lg text-white/80 max-w-2xl">
                                                        {formData.description || "Destination description will appear here..."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container mx-auto px-6 py-12">
                                            <h2 className="text-3xl font-bold mb-8 text-foreground">3-Day Sample Itinerary</h2>
                                            <div className="space-y-8">
                                                {formData.days.map((day, idx) => (
                                                    <div key={idx} className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50">
                                                        {/* Day Header */}
                                                        <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
                                                            <div>
                                                                <span className="text-primary font-bold text-sm uppercase tracking-wider">{day.date}</span>
                                                                <h3 className="text-xl font-semibold text-foreground mt-1">{day.title}</h3>
                                                            </div>
                                                        </div>

                                                        {/* Activities */}
                                                        <div className="p-6">
                                                            <div className="space-y-6">
                                                                {day.activities.map((act, actIdx) => (
                                                                    <div key={actIdx} className="flex gap-4 group">
                                                                        {/* Timeline */}
                                                                        <div className="flex flex-col items-center">
                                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                                <div className="w-5 h-5 text-primary flex items-center justify-center">
                                                                                    {act.time === 'Morning' ? <span className="text-lg">☀️</span> :
                                                                                        act.time === 'Evening' ? <span className="text-lg">🌙</span> :
                                                                                            <span className="text-lg">🌤️</span>}
                                                                                </div>
                                                                            </div>
                                                                            {actIdx < day.activities.length - 1 && (
                                                                                <div className="w-0.5 flex-1 bg-border mt-2" />
                                                                            )}
                                                                        </div>

                                                                        {/* Content */}
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
                                                                                            className="w-full md:w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                                                                        />
                                                                                    )}
                                                                                    <div className="flex-1">
                                                                                        <h4 className="font-semibold text-foreground mb-1">{act.title}</h4>
                                                                                        <p className="text-sm text-muted-foreground mb-2">{act.description}</p>

                                                                                        {act.location && (
                                                                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                                                                <a
                                                                                                    href={act.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.location)}`}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
                                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                                >
                                                                                                    <MapPin className="w-3 h-3" />
                                                                                                    {act.location}
                                                                                                </a>
                                                                                                {act.visitTime && (
                                                                                                    <span className="text-xs text-muted-foreground">({act.visitTime})</span>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {act.foodRecommendation && (
                                                                                            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mt-2">
                                                                                                <Utensils className="w-3 h-3" />
                                                                                                <span>Try: {act.foodRecommendation}</span>
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
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t border-border flex justify-end sticky bottom-0 bg-background/80 backdrop-blur-xl">
                                    <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </motion.div>

                    {/* Search */}
                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search places..."
                            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50 max-w-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            filteredDestinations.map((dest) => (
                                <Card key={dest.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white">
                                            {dest.category}
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-white flex justify-between items-start">
                                            {dest.name}
                                            <span className="text-sm font-normal text-zinc-400 flex items-center gap-1">
                                                <span className="text-yellow-500">★</span> {dest.rating}
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <p className="text-sm text-zinc-400 line-clamp-2">{dest.description}</p>
                                        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                                            <MapPin className="w-3 h-3" /> {dest.locationType || "National"}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex justify-between items-center border-t border-zinc-800/50 p-4 bg-zinc-950/30">
                                        <span className="font-semibold text-white">{dest.price}</span>
                                        <Button variant="outline" size="sm" onClick={() => startEdit(dest)} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                                            <Edit2 className="w-3 h-3 mr-2" /> Edit
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>

                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}
