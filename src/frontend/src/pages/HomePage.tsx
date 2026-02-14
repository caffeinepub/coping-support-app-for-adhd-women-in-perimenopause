import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Calendar, PenLine, Bookmark, Sparkles } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Heart,
      title: 'Coping Toolkit',
      description: 'Browse evidence-based strategies tailored for ADHD and perimenopause.',
      path: '/toolkit',
      color: 'text-chart-1',
    },
    {
      icon: BookOpen,
      title: 'Library',
      description: 'Learn about the intersection of ADHD and perimenopause with curated topics.',
      path: '/library',
      color: 'text-chart-2',
    },
    {
      icon: Calendar,
      title: 'Daily Check-in',
      description: 'Track your daily state in under 30 seconds with simple, supportive prompts.',
      path: '/check-in',
      color: 'text-chart-3',
    },
    {
      icon: PenLine,
      title: 'Journal',
      description: 'Reflect and process with optional prompts designed for your experience.',
      path: '/journal',
      color: 'text-chart-4',
    },
    {
      icon: Bookmark,
      title: 'Saved',
      description: 'Keep your favorite coping strategies and topics in one place.',
      path: '/saved',
      color: 'text-chart-5',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Welcome to Flourish</h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            A supportive space for women navigating ADHD and perimenopause. Find coping strategies, track your well-being, and access resources designed with your unique experience in mind.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/toolkit">
                <Heart className="h-5 w-5 mr-2" />
                Explore Toolkit
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/library">
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Library
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="/assets/generated/home-hero.dim_1600x900.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">What You'll Find Here</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.path} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-accent ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={feature.path}>
                      Get Started →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Supportive Message */}
      <section className="bg-muted/50 rounded-xl p-8 text-center">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          You're not alone in this journey. Flourish is here to support you with practical tools and understanding as you navigate the unique challenges of ADHD and perimenopause.
        </p>
      </section>
    </div>
  );
}
