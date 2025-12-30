import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Map } from "lucide-react";

export default function AdminAnalytics() {
    const { user } = useAuth();

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
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Platform Analytics</h1>
                        <p className="text-zinc-400">Insights into user growth and travel trends.</p>
                    </motion.div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-200">Total Revenue</CardTitle>
                                <DollarSignIcon className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">$45,231.89</div>
                                <p className="text-xs text-zinc-500">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-200">Active Travelers</CardTitle>
                                <Users className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">+2350</div>
                                <p className="text-xs text-zinc-500">+180.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-200">Trips Planned</CardTitle>
                                <Map className="h-4 w-4 text-zinc-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">+12,234</div>
                                <p className="text-xs text-zinc-500">+19% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Placeholder */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="min-h-[300px] flex flex-col items-center justify-center text-zinc-500 bg-zinc-900 border-zinc-800">
                            <BarChart3 className="w-12 h-12 mb-4 opacity-20" />
                            <p>User Growth Chart</p>
                        </Card>
                        <Card className="min-h-[300px] flex flex-col items-center justify-center text-zinc-500 bg-zinc-900 border-zinc-800">
                            <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
                            <p>Destination Trends Chart</p>
                        </Card>
                    </div>
                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}
