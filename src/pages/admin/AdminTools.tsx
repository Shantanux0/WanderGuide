import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Database, RefreshCw, Server } from "lucide-react";

export default function AdminTools() {
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
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">System Tools</h1>
                        <p className="text-zinc-400">Manage system configuration and maintenance.</p>
                    </motion.div>

                    <div className="grid gap-6">
                        {/* System Status */}
                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Server className="w-5 h-5 text-indigo-500" />
                                    System Status
                                </CardTitle>
                                <CardDescription className="text-zinc-400">Current system health and operational status.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="font-medium text-green-400 bg-green-950/30 border border-green-900/50 px-3 py-1 rounded-full text-sm">All Systems Operational</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature Flags */}
                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            <CardHeader>
                                <CardTitle className="text-white">Feature Configuration</CardTitle>
                                <CardDescription className="text-zinc-400">Enable or disable specific platform features.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-zinc-200">User Registration</Label>
                                        <p className="text-sm text-zinc-500">Allow new users to sign up.</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-zinc-200">Maintenance Mode</Label>
                                        <p className="text-sm text-zinc-500">Disable access for non-admin users.</p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-indigo-600" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="bg-zinc-950/50 border-red-900/30">
                            <CardHeader>
                                <CardTitle className="text-red-500 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Danger Zone
                                </CardTitle>
                                <CardDescription className="text-red-900/50">Irreversible actions. Tread carefully.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-red-900/20 rounded-lg bg-red-950/10">
                                    <div>
                                        <h4 className="font-medium text-red-400">Clear Cache</h4>
                                        <p className="text-sm text-red-500/70">Delete all temporary system cache.</p>
                                    </div>
                                    <Button variant="destructive" size="sm" className="gap-2 border-red-900/50 bg-red-950/50 hover:bg-red-900 text-red-200">
                                        <Database className="w-4 h-4" /> Clear
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-4 border border-red-900/20 rounded-lg bg-red-950/10">
                                    <div>
                                        <h4 className="font-medium text-red-400">Restart Server</h4>
                                        <p className="text-sm text-red-500/70">Reboot the main application server.</p>
                                    </div>
                                    <Button variant="destructive" size="sm" className="gap-2 border-red-900/50 bg-red-950/50 hover:bg-red-900 text-red-200">
                                        <RefreshCw className="w-4 h-4" /> Restart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}
