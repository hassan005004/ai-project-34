import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Calendar, Clock, Edit2, Trash2, MoreVertical, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "todo" | "in-progress" | "review" | "done";
  tags?: string[];
  completed?: boolean;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const priorityColors: Record<string, string> = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
};

const statusColors: Record<string, string> = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  review: "bg-purple-100 text-purple-800 border-purple-200",
  done: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const TaskCard = ({
  id,
  title,
  description,
  dueDate,
  priority = "medium",
  status = "todo",
  tags = [],
  completed = false,
  onToggleComplete,
  onEdit,
  onDelete,
  className,
}: TaskCardProps) => {
  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className={cn(
          "w-full overflow-hidden border transition-all duration-200 hover:shadow-md",
          completed && "opacity-70",
          isOverdue && "border-red-200 bg-red-50/50",
          className
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={completed}
                onCheckedChange={() => onToggleComplete?.(id)}
                className="mt-1 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <div className="space-y-1">
                <h3
                  className={cn(
                    "font-semibold text-base leading-tight",
                    completed && "line-through text-gray-500"
                  )}
                >
                  {title}
                </h3>
                {description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(id)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn("text-xs font-medium", priorityColors[priority])}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
            <Badge variant="outline" className={cn("text-xs font-medium", statusColors[status])}>
              {status.replace("-", " ")}
            </Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {dueDate && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(dueDate), "MMM d")}</span>
                      {isOverdue && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Due: {format(new Date(dueDate), "PPP")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {completed && (
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Completed</span>
              </div>
            )}
          </div>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(id)}
              className="flex-1 sm:flex-none"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(id)}
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskCard;