import { Link, useLocation } from "react-router-dom";
import { Home, Map, PlusCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isAdmin?: boolean;
}

export function MobileNav({ isAdmin = false }: MobileNavProps) {
  const location = useLocation();
  const basePath = isAdmin ? "/admin" : "/dashboard";

  const items = [
    { icon: Home, label: "Home", href: basePath },
    { icon: Map, label: "Itineraries", href: `${basePath}/itineraries` },
    { icon: PlusCircle, label: "New", href: isAdmin ? `${basePath}/requests` : `${basePath}/request` },
    { icon: User, label: "Profile", href: `${basePath}/settings` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-0.5 bg-accent rounded-full"
                />
              )}
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
