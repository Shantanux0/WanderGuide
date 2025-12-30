import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  FileText,
  PlusCircle,
  Settings,
  Users,
  BarChart3,
  Wrench,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isAdmin?: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  stats?: {
    upcomingTrips: number;
    pendingRequests: number;
  };
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: boolean;
}

const userMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Map, label: "My Itineraries", href: "/dashboard/itineraries" },
  { icon: PlusCircle, label: "Request Itinerary", href: "/dashboard/request" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const adminMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Compass, label: "Destinations", href: "/admin/destinations" },
  { icon: FileText, label: "Itinerary Requests", href: "/admin/requests", badge: true },
  { icon: Map, label: "Approved Itineraries", href: "/admin/itineraries" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Wrench, label: "Admin Tools", href: "/admin/tools" },
];

import { useAuth } from "@/context/AuthContext";

export function Sidebar({ isAdmin = false, user, stats }: SidebarProps) {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "sticky top-0 h-screen transition-all duration-300 flex flex-col border-r shadow-xl z-30",
        isAdmin
          ? "bg-zinc-900 text-zinc-100 border-zinc-800"
          : "bg-[#F9F6F0] text-stone-800 border-[#E6E0D4]",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-background rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Header */}
      <div className={cn("p-4 border-b", isAdmin ? "border-zinc-800" : "border-[#E6E0D4]")}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center">
            <Compass className="w-6 h-6 text-[#F9F6F0]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg text-stone-900"
              >
                WanderGuide
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* User Info */}
      <div className={cn("p-4 border-b", isAdmin ? "border-zinc-800" : "border-[#E6E0D4]")}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E6E0D4] flex items-center justify-center text-stone-800 font-bold border border-[#D6D0C4]">
            {user.name[0]}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate text-stone-900">{user.name}</span>
                  {isAdmin && <Badge variant="admin" className="text-[10px]">Admin</Badge>}
                </div>
                <p className="text-xs text-stone-500 truncate">
                  {user.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        <AnimatePresence>
          {!collapsed && stats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 gap-2"
            >
              <div className="bg-white/50 rounded-lg p-2 text-center border border-[#E6E0D4]">
                <div className="text-lg font-bold text-stone-800">
                  {stats.upcomingTrips}
                </div>
                <div className="text-[10px] text-stone-500">
                  Upcoming
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-2 text-center border border-[#E6E0D4]">
                <div className="text-lg font-bold text-stone-800">
                  {stats.pendingRequests}
                </div>
                <div className="text-[10px] text-stone-500">
                  Pending
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-[#E6E0D4] text-stone-900 shadow-sm"
                  : "text-stone-600 hover:bg-[#E6E0D4]/50 hover:text-stone-900"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <Badge variant="pending" className="text-[10px] px-1.5">
                  3
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={cn("p-3 border-t", isAdmin ? "border-zinc-800" : "border-sidebar-border")}>
        <div
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-600 hover:bg-[#E6E0D4]/50 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
