import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { Rocket, Sparkles, Users, TrendingUp, Shield, Zap, ArrowRight, CheckCircle, Star, Globe } from "lucide-react";

const Home = () => {
  const { toast } = useToast();
  const isMobile = useMobile();

  const handleGetStarted = () => {
    toast({
      title: "Welcome!",
      description: "Let's get started with your journey.",
    });
  };

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Features",
      description: "AI-powered insights that adapt to your needs.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized performance for any scale.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Deploy anywhere with our worldwide network.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "CTO, TechScale",
      content: "This platform transformed our workflow. The team's productivity increased by 40%.",
      avatar: "AJ",
    },
    {
      name: "Maria Chen",
      role: "Product Lead, InnovateCo",
      content: "The intuitive design and powerful features made onboarding a breeze for our entire team.",
      avatar: "MC",
    },
    {
      name: "David Park",
      role: "Founder, StartupLabs",
      content: "Finally, a solution that scales with our growth without compromising on simplicity.",
      avatar: "DP",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: <Users className="h-4 w-4" /> },
    { label: "Uptime", value: "99.9%", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Countries", value: "50+", icon: <Globe className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge className="mb-4 px-4 py-1 text-sm font-semibold" variant="outline">
            <Sparkles className="mr-2 h-3 w-3" />
            Now in Public Beta
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build the Future,{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Faster Than Ever
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern platform that empowers teams to create, collaborate, and scale with cutting‑edge tools and
            intuitive design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size={isMobile ? "default" : "lg"} onClick={handleGetStarted}>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline">
              <Rocket className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need, Built In</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to accelerate your development and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="group">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>
                  Get a complete picture of your workspace and performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Project Completion</p>
                    <p className="text-sm text-muted-foreground">12 of 15 tasks completed</p>
                  </div>
                  <Progress value={80} className="w-1/2" />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Active Members</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Storage Used</p>
                    <p className="text-2xl font-bold">45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your milestones and achievements.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Onboarding", "First Project", "Team Setup", "Advanced Features"].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your third‑party integrations.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with popular tools like GitHub, Slack, Figma, and more. All integrations are secured with
                  OAuth 2.0.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Teams Worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 md:p-12 text-center border"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams who are already building the future with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted}>
              Start Free Trial
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">No credit card required • 14‑day free trial • Cancel anytime</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;