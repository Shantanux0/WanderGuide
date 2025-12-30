import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In a real app, this would validate admin credentials
            if (email.includes("@admin.com") || password === "admin123") {
                await login(email, "Admin User", "admin");
                navigate("/admin");
                toast({
                    title: "Welcome Admin",
                    description: "You have successfully logged in to the admin dashboard."
                });
            } else {
                throw new Error("Invalid admin credentials");
            }
        } catch (error) {
            toast({
                title: "Access Denied",
                description: "Invalid admin credentials. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
                        <Shield className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                    <p className="text-zinc-400 text-sm mt-1">Authorized personnel only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                        <div className="relative">
                            <LayoutDashboard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@wanderguide.com"
                                className="bg-black/20 border-white/10 pl-10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-300">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-black/20 border-white/10 pl-10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Access Dashboard"}
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/login" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                        Not an admin? Go to main site
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
