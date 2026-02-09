import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  loading?: boolean;
  className?: string;
  animationDelay?: number;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  trend,
  loading = false,
  className,
  animationDelay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className={cn("overflow-hidden border-border/50 shadow-sm", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {loading ? (
                <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
              ) : (
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
              {trend && (
                <div className="flex items-center gap-1 pt-1">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      trend.positive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {trend.positive ? "↗" : "↘"} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {trend.label}
                  </span>
                </div>
              )}
            </div>
            {Icon && (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  iconBgColor
                )}
              >
                <Icon className={cn("h-6 w-6", iconColor)} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;