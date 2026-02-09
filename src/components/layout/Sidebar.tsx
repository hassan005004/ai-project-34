import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  FileText,
  BarChart3,
  Calendar,
  Mail,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  CreditCard,
  Users,
  Folder,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useMobile();

  const mainNavItems: NavItem[] = [
    { title: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    { title: "Profile", icon: <User className="h-5 w-5" />, path: "/profile" },
    { title: "Projects", icon: <Folder className="h-5 w-5" />, path: "/projects", badge: 3 },
    { title: "Analytics", icon: <BarChart3 className="h-5 w-5" />, path: "/analytics" },
    { title: "Calendar", icon: <Calendar className="h-5 w-5" />, path: "/calendar" },
    { title: "Messages", icon: <MessageSquare className="h-5 w-5" />, path: "/messages", badge: 5 },
    { title: "Documents", icon: <FileText className="h-5 w-5" />, path: "/documents" },
    { title: "Team", icon: <Users className="h-5 w-5" />, path: "/team" },
  ];

  const secondaryNavItems: NavItem[] = [
    { title: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
    { title: "Billing", icon: <CreditCard className="h-5 w-5" />, path: "/billing" },
    { title: "Notifications", icon: <Bell className="h-5 w-5" />, path: "/notifications" },
    { title: "Support", icon: <HelpCircle className="h-5 w-5" />, path: "/support" },
    { title: "Security", icon: <Shield className="h-5 w-5" />, path: "/security" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const mobileSidebarWidth = collapsed ? "w-16" : "w-full";

  return (
    <TooltipProvider delayDuration={300}>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-background shadow-lg transition-all duration-300 ease-in-out",
          isMobile ? mobileSidebarWidth : sidebarWidth,
          isMobile && "border-r-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">T</span>
                </div>
                <span className="text-xl font-semibold">TestApp</span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mx-auto"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">T</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1 px-3 py-4">
          {/* User profile */}
          <div className={cn("mb-6", collapsed ? "px-0" : "px-2")}>
            <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser" alt="User" />
                <AvatarFallback>TU</AvatarFallback>
              </Avatar>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <div>
                      <p className="text-sm font-medium">Test User</p>
                      <p className="text-xs text-muted-foreground">admin@testapp.com</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="space-y-1">
            <p className={cn("mb-2 text-xs font-semibold uppercase text-muted-foreground", collapsed && "text-center")}>
              {!collapsed ? "Main" : "•"}
            </p>
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Tooltip key={item.path} disableHoverableContent={!collapsed}>
                  <TooltipTrigger asChild>
                    <Link to={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "h-10 w-full justify-start gap-3 px-3",
                          collapsed && "justify-center px-0",
                          isActive && "bg-secondary font-medium"
                        )}
                      >
                        <div className="relative">
                          {item.icon}
                          {item.badge && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex-1 text-left"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                      {item.badge && <p className="text-xs text-muted-foreground">{item.badge} new</p>}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>

          <Separator className="my-4" />

          {/* Secondary navigation */}
          <nav className="space-y-1">
            <p className={cn("mb-2 text-xs font-semibold uppercase text-muted-foreground", collapsed && "text-center")}>
              {!collapsed ? "Preferences" : "•"}
            </p>
            {secondaryNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Tooltip key={item.path} disableHoverableContent={!collapsed}>
                  <TooltipTrigger asChild>
                    <Link to={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "h-10 w-full justify-start gap-3 px-3",
                          collapsed && "justify-center px-0",
                          isActive && "bg-secondary font-medium"
                        )}
                      >
                        {item.icon}
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex-1 text-left"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4">
          <Tooltip disableHoverableContent={!collapsed}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn("h-10 w-full justify-start gap-3 px-3", collapsed && "justify-center px-0")}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 text-left"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default Sidebar;