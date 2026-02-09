import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar, ExternalLink, MoreVertical, Star } from "lucide-react";
import { useState } from "react";

export interface UserCardProps {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  bio?: string;
  location?: string;
  phone?: string;
  joinDate?: string;
  status?: "active" | "inactive" | "pending";
  tags?: string[];
  rating?: number;
  onActionClick?: (id: string, action: string) => void;
  className?: string;
}

const UserCard = ({
  id,
  name,
  email,
  avatarUrl,
  role,
  bio,
  location,
  phone,
  joinDate,
  status = "active",
  tags = [],
  rating,
  onActionClick,
  className = "",
}: UserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    pending: "bg-yellow-500",
  };

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAction = (action: string) => {
    if (onActionClick) {
      onActionClick(id, action);
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={className}
      >
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${statusColors[status]}`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{name}</h3>
                    {rating !== undefined && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction("more")}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            {bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{bio}</p>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 truncate">{email}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400 truncate">{location}</span>
                </div>
              )}
              {joinDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Joined {joinDate}</span>
                </div>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs font-normal px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-0">
            <div className="flex items-center justify-between w-full">
              <Badge
                variant="outline"
                className={`text-xs font-medium ${
                  status === "active"
                    ? "border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                    : status === "pending"
                    ? "border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-400"
                    : "border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-400"
                }`}
              >
                {statusLabels[status]}
              </Badge>

              <motion.div
                animate={{ width: isHovered ? "auto" : "auto" }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => handleAction("view")}
                >
                  <span>View</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default UserCard;