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
  { icon: FileText, label: "Itinerary Requests", href: "/admin/requests", badge: true },
  { icon: Map, label: "Approved Itineraries", href: "/admin/itineraries" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Wrench, label: "Admin Tools", href: "/admin/tools" },
];

export function Sidebar({ isAdmin = false, user, stats }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "relative h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
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
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-accent rounded-lg flex items-center justify-center">
            <Compass className="w-6 h-6 text-sidebar-primary" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg"
              >
                WanderGuide
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
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
                  <span className="font-medium truncate">{user.name}</span>
                  {isAdmin && <Badge variant="admin" className="text-[10px]">Admin</Badge>}
                </div>
                <p className="text-xs text-sidebar-foreground/60 truncate">
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
              <div className="bg-sidebar-accent rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-sidebar-primary">
                  {stats.upcomingTrips}
                </div>
                <div className="text-[10px] text-sidebar-foreground/60">
                  Upcoming
                </div>
              </div>
              <div className="bg-sidebar-accent rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-sidebar-primary">
                  {stats.pendingRequests}
                </div>
                <div className="text-[10px] text-sidebar-foreground/60">
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
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
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
        </Link>
      </div>
    </motion.aside>
  );
}
