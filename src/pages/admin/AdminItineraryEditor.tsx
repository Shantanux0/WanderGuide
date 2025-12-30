import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { store, Itinerary, ItineraryDay } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, ArrowLeft, Calendar, User, Eye, MapPin, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminItineraryEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Initial state from navigation (e.g. from Approve request)
    const initialData = location.state?.requestData;

    const [formData, setFormData] = useState<Partial<Itinerary>>({
        destination: initialData?.destination || "",
        status: "draft",
        startDate: initialData?.startDate || "",
        endDate: "",
        price: 0,
        heroImage: "",
        days: []
    });

    useEffect(() => {
        if (id && id !== "new") {
            const loadItinerary = async () => {
                const data = await store.getItinerary(id);
                if (data) setFormData(data);
            };
            loadItinerary();
        }
    }, [id]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (id && id !== "new") {
                await store.updateItinerary(id, formData);
                toast({ title: "Itinerary Updated", description: "Changes saved successfully." });
            } else {
                await store.createItinerary({
                    ...formData as any,
                    userId: initialData?.userId || user?.id || "admin", // Assign to request user or admin
                });
                toast({ title: "Itinerary Created", description: "New itinerary has been created." });
            }
            navigate("/admin/itineraries");
        } catch (error) {
            toast({ title: "Error", description: "Failed to save itinerary.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const addDay = () => {
        const newDay: ItineraryDay = {
            day: (formData.days?.length || 0) + 1,
            date: "", // Default to empty for custom label
            title: "New Day",
            activities: []
        };
        setFormData({ ...formData, days: [...(formData.days || []), newDay] });
    };

    const updateDay = (index: number, field: keyof ItineraryDay, value: any) => {
        const newDays = [...(formData.days || [])];
        newDays[index] = { ...newDays[index], [field]: value };
        setFormData({ ...formData, days: newDays });
    };

    const updateDayDate = (index: number, value: string) => {
        updateDay(index, 'date', value);
    };

    const addActivity = (dayIndex: number) => {
        const newDays = [...(formData.days || [])];
        newDays[dayIndex].activities.push({
            time: "",
            icon: "camera",
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

    const updateActivity = (dayIndex: number, actIndex: number, field: string, value: string) => {
        const newDays = [...(formData.days || [])];
        newDays[dayIndex].activities[actIndex] = { ...newDays[dayIndex].activities[actIndex], [field]: value };
        setFormData({ ...formData, days: newDays });
    };

    const removeActivity = (dayIndex: number, actIndex: number) => {
        const newDays = [...(formData.days || [])];
        newDays[dayIndex].activities.splice(actIndex, 1);
        setFormData({ ...formData, days: newDays });
    };

    const removeDay = (index: number) => {
        const newDays = [...(formData.days || [])];
        newDays.splice(index, 1);
        // Re-index days if needed, but we rely on array index mainly.
        // Optionally update 'day' property if we use strict numbering
        const reindexed = newDays.map((d, i) => ({ ...d, day: i + 1 }));
        setFormData({ ...formData, days: reindexed });
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            <div className="hidden md:block">
                <Sidebar user={user || undefined} isAdmin={true} />
            </div>

            <main className="flex-1 pb-20 md:pb-0">
                <div className="p-6 md:p-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-zinc-400 hover:text-white hover:bg-zinc-900">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {id === "new" ? "Create New Itinerary" : "Edit Itinerary"}
                                </h1>
                                <p className="text-zinc-400">
                                    {id === "new" ? "Drafting a plan for " + (initialData?.user?.name || "User") : "Editing " + formData.destination}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" onClick={() => setShowPreview(true)} className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/30">
                                <Eye className="w-4 h-4 mr-2" /> Preview
                            </Button>
                            <Button onClick={handleSave} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20">
                                <Save className="w-4 h-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Itinerary"}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader>
                                    <CardTitle className="text-white">Trip Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Destination</Label>
                                        <Input
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            className="bg-zinc-950 border-zinc-800 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Status</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(v: any) => setFormData({ ...formData, status: v })}
                                        >
                                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="pending">Pending Approval</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Start Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <Input
                                                type="date"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800 text-white pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">End Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <Input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                className="bg-zinc-950 border-zinc-800 text-white pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Total Price</Label>
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                            className="bg-zinc-950 border-zinc-800 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Hero Image URL</Label>
                                        <ImageUpload
                                            value={formData.heroImage || ""}
                                            onChange={(val) => setFormData({ ...formData, heroImage: val })}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Days & Activities */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Itinerary Plan</h2>
                                <Button size="sm" onClick={addDay} className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
                                    <Plus className="w-4 h-4 mr-2" /> Add Day
                                </Button>
                            </div>

                            {formData.days?.map((day, dayIndex) => (
                                <Card key={dayIndex} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                                    <CardHeader className="bg-zinc-950/50 pb-4 border-b border-zinc-800 flex flex-row items-center justify-between">
                                        <div className="flex gap-4 flex-1 items-center">
                                            <div className="w-32">
                                                <Label className="text-zinc-500 text-xs mb-1 block">Date / Label</Label>
                                                <Input
                                                    value={day.date || ""}
                                                    onChange={(e) => updateDayDate(dayIndex, e.target.value)}
                                                    className="bg-zinc-900/50 border-zinc-700 text-sm h-9"
                                                    placeholder="e.g. Day 1"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-zinc-500 text-xs mb-1 block">Day Title</Label>
                                                <Input
                                                    value={day.title}
                                                    onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                                                    className="bg-transparent border-0 text-lg font-bold text-white px-0 h-auto focus-visible:ring-0 shadow-none"
                                                    placeholder="Day Title"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => removeDay(dayIndex)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-4">
                                        {day.activities.map((act, actIndex) => (
                                            <div key={actIndex} className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800 group space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-xs text-zinc-500 font-mono">ACTIVITY {actIndex + 1}</div>
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-600 hover:text-red-400" onClick={() => removeActivity(dayIndex, actIndex)}>
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                    {/* Time & Title */}
                                                    <div className="md:col-span-1 space-y-3">
                                                        <div>
                                                            <Label className="text-zinc-400 text-xs">Time Slot</Label>
                                                            <Input
                                                                value={act.time || ""}
                                                                onChange={(e) => updateActivity(dayIndex, actIndex, 'time', e.target.value)}
                                                                className="bg-zinc-900 border-zinc-800 h-9"
                                                                placeholder="e.g. Morning"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label className="text-zinc-400 text-xs">Activity Title</Label>
                                                            <Input
                                                                value={act.title}
                                                                onChange={(e) => updateActivity(dayIndex, actIndex, 'title', e.target.value)}
                                                                className="bg-zinc-900 border-zinc-800 h-9 font-medium"
                                                                placeholder="Title"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Description & Location */}
                                                    <div className="md:col-span-2 space-y-3">
                                                        <div>
                                                            <Label className="text-zinc-400 text-xs">Description</Label>
                                                            <Textarea
                                                                value={act.description}
                                                                onChange={(e) => updateActivity(dayIndex, actIndex, 'description', e.target.value)}
                                                                className="min-h-[80px] bg-zinc-900 border-zinc-800 text-sm resize-none"
                                                                placeholder="Description..."
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-zinc-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> Location Details</Label>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <Input
                                                                    value={act.location || ""}
                                                                    onChange={(e) => updateActivity(dayIndex, actIndex, 'location', e.target.value)}
                                                                    className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                    placeholder="Location Name"
                                                                />
                                                                <Input
                                                                    value={act.visitTime || ""}
                                                                    onChange={(e) => updateActivity(dayIndex, actIndex, 'visitTime', e.target.value)}
                                                                    className="bg-zinc-900 border-zinc-800 h-8 text-sm"
                                                                    placeholder="Time (e.g. 10 AM)"
                                                                />
                                                                <Input
                                                                    value={act.mapUrl || ""}
                                                                    onChange={(e) => updateActivity(dayIndex, actIndex, 'mapUrl', e.target.value)}
                                                                    className="bg-zinc-900 border-zinc-800 h-8 text-sm col-span-2"
                                                                    placeholder="Google Maps Link (optional)"
                                                                />
                                                                <div className="col-span-2 relative">
                                                                    <Utensils className="absolute left-2.5 top-2 w-3 h-3 text-zinc-500" />
                                                                    <Input
                                                                        value={act.foodRecommendation || ""}
                                                                        onChange={(e) => updateActivity(dayIndex, actIndex, 'foodRecommendation', e.target.value)}
                                                                        className="bg-zinc-900 border-zinc-800 h-8 text-sm pl-8"
                                                                        placeholder="Famous Food Recommendation"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Image */}
                                                    <div className="md:col-span-1">
                                                        <Label className="text-zinc-400 text-xs mb-2 block">Activity Image</Label>
                                                        <div className="h-full">
                                                            <ImageUpload
                                                                value={act.image || ""}
                                                                onChange={(val) => updateActivity(dayIndex, actIndex, 'image', val)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => addActivity(dayIndex)} className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800">
                                            <Plus className="w-3 h-3 mr-2" /> Add Activity
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <MobileNav isAdmin={true} />

            {/* Preview Dialog */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-background overflow-y-auto border-zinc-800">
                    <ScrollArea className="flex-1 bg-background text-foreground">
                        <div className="p-0">
                            {/* Hero Section Preview */}
                            <div className="relative h-[400px] w-full">
                                <img
                                    src={formData.heroImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop"}
                                    alt={formData.destination}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end">
                                    <div className="container mx-auto px-6 pb-8">
                                        <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                                            <span>Home</span>
                                            <span>/</span>
                                            <span>Itineraries</span>
                                            <span>/</span>
                                            <span className="text-white">{formData.destination || "Destination Name"}</span>
                                        </div>

                                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{formData.destination || "Destination Name"}</h1>

                                        <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                                <span className="text-sm font-medium">{formData.price ? `$${formData.price}` : "Price TBD"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container mx-auto px-6 py-12">
                                <h2 className="text-3xl font-bold mb-8 text-foreground">Draft Itinerary</h2>
                                <div className="space-y-8">
                                    {formData.days?.map((day, idx) => (
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
        </div>
    );
}
