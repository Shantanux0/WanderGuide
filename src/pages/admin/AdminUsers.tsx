import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MoreHorizontal, UserCheck, Shield } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminUsers() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Users Data
    const users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "User", status: "Active", joined: "2024-01-15" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Active", joined: "2024-02-20" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Admin", status: "Active", joined: "2023-11-05" },
        { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User", status: "Inactive", joined: "2024-03-10" },
        { id: 5, name: "Evan Wright", email: "evan@example.com", role: "User", status: "Active", joined: "2024-01-22" },
    ];

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">User Management</h1>
                        <p className="text-zinc-400">Manage user accounts and permissions.</p>
                    </motion.div>

                    {/* Actions Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                placeholder="Search users..."
                                className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button>Add User</Button>
                    </div>

                    {/* Users Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden"
                    >
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-zinc-800 border-zinc-800">
                                    <TableHead className="text-zinc-400">Name</TableHead>
                                    <TableHead className="text-zinc-400">Email</TableHead>
                                    <TableHead className="text-zinc-400">Role</TableHead>
                                    <TableHead className="text-zinc-400">Status</TableHead>
                                    <TableHead className="text-zinc-400">Joined</TableHead>
                                    <TableHead className="text-right text-zinc-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((u) => (
                                    <TableRow key={u.id} className="hover:bg-zinc-800/50 border-zinc-800">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                    {u.name[0]}
                                                </div>
                                                {u.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                                {u.role === 'Admin' && <Shield className="w-3 h-3" />}
                                                {u.role}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {u.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{u.joined}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </motion.div>
                </div>
            </main>

            <MobileNav isAdmin={true} />
        </div>
    );
}
