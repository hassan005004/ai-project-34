import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Settings, Bell, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const isMobile = useMobile();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread messages.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-background border-b"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="hidden sm:inline-block text-xl font-bold tracking-tight">
                TestApp
              </span>
            </Link>
            <Badge variant="outline" className="ml-3 hidden sm:flex">
              v1.0
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative"
                >
                  <Link to={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                </Button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                3
              </span>
            </Button>

            {/* User Avatar */}
            <Avatar className="h-8 w-8 cursor-pointer border">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Test" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <span className="text-primary-foreground font-bold text-lg">T</span>
                      </div>
                      <span className="text-xl font-bold">TestApp</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <Separator className="mb-6" />

                  <nav className="flex-1 space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Button
                          key={item.name}
                          asChild
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to={item.href}>
                            <Icon className="mr-3 h-5 w-5" />
                            {item.name}
                          </Link>
                        </Button>
                      );
                    })}
                  </nav>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Test" />
                          <AvatarFallback>TU</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Test User</p>
                          <p className="text-xs text-muted-foreground">admin@test.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar (Bottom) */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden"
        >
          <div className="flex items-center justify-around h-16">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="flex flex-col h-auto py-3"
                >
                  <Link to={item.href}>
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                    <span className={`text-xs mt-1 ${isActive ? "text-primary font-medium" : ""}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="absolute top-0 w-full h-1 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;