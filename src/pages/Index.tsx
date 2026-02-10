import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Rocket, Sparkles, Users, Zap, CheckCircle, ArrowRight, Star, TrendingUp, Globe } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useMobile();

  const handleGetStarted = () => {
    toast({
      title: "Welcome to Hasan! Project",
      description: "Let's build something amazing together.",
    });
  };

  const features = [
    {
      title: "Blazing Fast",
      description: "Optimized performance with Vite and modern tooling.",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Developer Friendly",
      description: "TypeScript, Tailwind CSS, and reusable components.",
      icon: Sparkles,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Team Ready",
      description: "Collaborate seamlessly with built-in best practices.",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Global Scale",
      description: "Deploy anywhere with optimized production builds.",
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Lead",
      content: "Hasan accelerated our development by 40%. The component library is exceptional.",
      avatar: "AJ",
    },
    {
      name: "Sam Rivera",
      role: "Product Manager",
      content: "The clean design system helped us maintain consistency across all our products.",
      avatar: "SR",
    },
    {
      name: "Taylor Kim",
      role: "Full Stack Developer",
      content: "Best React starter kit I've used. The TypeScript integration is flawless.",
      avatar: "TK",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-4 px-4 py-1 text-sm font-semibold" variant="outline">
              <Sparkles className="mr-2 h-3 w-3" />
              Introducing
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Hasan</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A modern, production-ready React starter kit built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.
              Launch your next project in minutes.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size={isMobile ? "default" : "lg"} onClick={handleGetStarted} className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size={isMobile ? "default" : "lg"} variant="outline" className="gap-2">
                <Star className="h-4 w-4" />
                Star on GitHub
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <Card className="mx-auto max-w-4xl border-primary/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Built for Speed & Scale</CardTitle>
                <CardDescription>
                  Everything you need to build a modern web application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {features.map((feat, idx) => (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className={cn("mb-2 inline-flex rounded-lg p-2", feat.bgColor)}>
                            <feat.icon className={cn("h-5 w-5", feat.color)} />
                          </div>
                          <CardTitle className="text-lg">{feat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{feat.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 py-12 sm:py-20">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Hasan?</CardTitle>
                  <CardDescription>
                    A carefully curated stack for modern web development.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">TypeScript First</h4>
                      <p className="text-sm text-muted-foreground">
                        Full type safety and enhanced developer experience.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Tailwind CSS</h4>
                      <p className="text-sm text-muted-foreground">
                        Utility-first CSS for rapid UI development.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Radix UI + shadcn/ui</h4>
                      <p className="text-sm text-muted-foreground">
                        Accessible, unstyled components that you can customize.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>
                    Track the development milestones of Hasan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">Core Components</span>
                      <span className="text-sm text-muted-foreground">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">Documentation</span>
                      <span className="text-sm text-muted-foreground">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">Examples & Templates</span>
                      <span className="text-sm text-muted-foreground">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="community" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What Developers Say</CardTitle>
                  <CardDescription>
                    Join thousands of developers already building with Hasan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, idx) => (
                      <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardContent className="pt-6">
                            <div className="mb-4 flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                              </Avatar>
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                              </div>
                            </div>
                            <p className="text-sm italic text-muted-foreground">"{testimonial.content}"</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 text-center shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl">Ready to Build with Hasan?</CardTitle>
                <CardDescription className="text-lg">
                  Start your next project in minutes with our production‑ready starter kit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Trusted by 5,000+ developers</span>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Everything you need—routing, state, UI components, dark mode, and more—already configured.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button size="lg" className="gap-2" onClick={handleGetStarted}>
                  <Rocket className="h-5 w-5" />
                  Launch Your Project
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="px-4 py-8 text-center text-sm text-muted-foreground">
        <p>
          Built with ❤️ using the Hasan stack. © {new Date().getFullYear()} – Open source and ready for your next big idea.
        </p>
      </footer>
    </div>
  );
};

export default Index;
