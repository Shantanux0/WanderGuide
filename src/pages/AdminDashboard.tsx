import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { Users, FileText, Map, PieChart } from "lucide-react";

export default function AdminDashboard() {
    const { user } = useAuth();

    // Mock stats for admin
    const stats = {
        upcomingTrips: 0,
        pendingRequests: 12, // example
    };

    const adminStats = [
        { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-500", bg: "bg-blue-100/50" },
        { label: "Pending Requests", value: "12", icon: FileText, color: "text-amber-500", bg: "bg-amber-100/50" },
        { label: "Active Itineraries", value: "89", icon: Map, color: "text-green-500", bg: "bg-green-100/50" },
        { label: "Revenue", value: "$45k", icon: PieChart, color: "text-purple-500", bg: "bg-purple-100/50" },
    ];

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar user={user || undefined} stats={stats} isAdmin={true} />
            </div>

            {/* Main Content */}
            <main className="flex-1 pb-20 md:pb-0">
                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-zinc-400">
                            Overview of platform activity and requests.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {adminStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800 flex items-center gap-4"
                            >
                                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity Section (Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 min-h-[300px]"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-white">Recent Activity</h2>
                        <div className="flex items-center justify-center h-48 text-zinc-500">
                            Map and charts coming soon...
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Mobile Navigation */}
            <MobileNav isAdmin={true} />
        </div>
    );
}
