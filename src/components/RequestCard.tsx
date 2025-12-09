import { motion } from "framer-motion";
import { User, MapPin, Calendar, Flag, Clock, Check, X, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RequestCardProps {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  destination: string;
  startDate: string;
  days: number;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  index?: number;
  onApprove?: () => void;
  onEdit?: () => void;
  onDecline?: () => void;
}

export function RequestCard({
  id,
  user,
  destination,
  startDate,
  days,
  priority,
  status,
  createdAt,
  index = 0,
  onApprove,
  onEdit,
  onDecline,
}: RequestCardProps) {
  const priorityColors = {
    low: "text-muted-foreground",
    medium: "text-accent",
    high: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {user.avatar || user.name[0]}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{user.name}</h4>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Flag className={`w-4 h-4 ${priorityColors[priority]}`} />
          <Badge variant={status === "pending" ? "pending" : status === "in-progress" ? "draft" : "confirmed"}>
            {status.replace("-", " ")}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-medium">{destination}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{startDate} ({days} Days)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Requested {createdAt}</span>
        </div>
      </div>

      {/* Actions */}
      {status === "pending" && (
        <div className="flex gap-2 pt-3 border-t border-border">
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            onClick={onApprove}
          >
            <Check className="w-4 h-4 mr-1" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDecline}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}
