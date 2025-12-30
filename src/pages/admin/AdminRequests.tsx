import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { store, Request } from "@/lib/store";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Clock, CheckCircle2, XCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function AdminRequests() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await store.getRequests();
            setRequests(data);
            setLoading(false);
        };
        fetchRequests();
    }, []);

    const pendingRequests = requests.filter(r => r.status === 'pending');
    const otherRequests = requests.filter(r => r.status !== 'pending');

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
                        className="mb-8"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Itinerary Requests</h1>
                        <p className="text-zinc-400">Manage and process new trip requests.</p>
                    </motion.div>

                    {/* Pending Queue */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            Pending Queue <Badge variant="secondary">{pendingRequests.length}</Badge>
                        </h2>

                        {loading ? (
                            <p>Loading requests...</p>
                        ) : pendingRequests.length === 0 ? (
                            <div className="text-center py-10 bg-zinc-900 rounded-xl border border-dashed border-zinc-800">
                                <p className="text-zinc-500">No pending requests.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {pendingRequests.map((req, i) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Card className="hover:shadow-md transition-shadow bg-zinc-900 border-zinc-800 text-zinc-100">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg text-white">{req.destination}</CardTitle>
                                                        <CardDescription className="flex items-center gap-1 mt-1 text-zinc-400">
                                                            Requested by <span className="font-medium text-zinc-300">{req.user?.name || "Unknown"}</span>
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant={req.priority === 'high' ? 'destructive' : req.priority === 'medium' ? 'default' : 'secondary'}>
                                                        {req.priority} priority
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-zinc-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {req.startDate}
                                                </div>
                                                <div className="flex items-center gap-2 text-zinc-500">
                                                    <Clock className="w-4 h-4" />
                                                    {req.days} days
                                                </div>
                                                <div className="flex items-center gap-2 text-zinc-500">
                                                    <DollarSign className="w-4 h-4" />
                                                    {req.budget}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex gap-2 justify-end pt-2">
                                                <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/30 border-red-900/50">
                                                    <XCircle className="w-4 h-4 mr-1" /> Reject
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0"
                                                    onClick={() => navigate("/admin/itineraries/new", {
                                                        state: {
                                                            requestData: {
                                                                destination: req.destination,
                                                                startDate: req.startDate,
                                                                userId: req.userId,
                                                                user: req.user
                                                            }
                                                        }
                                                    })}
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-1" /> Approve & Plan
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}
