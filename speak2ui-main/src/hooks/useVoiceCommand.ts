
import { useState, useEffect } from 'react';
import { processCommand } from '@/services/uiComponentService';
import { toast } from 'sonner';

export function useVoiceCommand(voiceCommand: string) {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [componentType, setComponentType] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const processVoiceCommand = async () => {
      if (voiceCommand && voiceCommand.trim() !== '') {
        setIsProcessing(true);
        console.log('Command changed, processing:', voiceCommand);
        
        try {
          // Process the command with enhanced UI generation
          const result = enhancedProcessCommand(voiceCommand);
          
          // Short delay to show processing state
          await new Promise(resolve => setTimeout(resolve, 800));
          
          setGeneratedCode(result.code);
          setComponentType(result.component);
          
          // Send message to parent window with the generated code
          window.parent.postMessage({
            type: 'GENERATED_CODE',
            code: result.code
          }, '*');
          
          toast.success(`Generated ${result.component} component`);
        } catch (error) {
          console.error('Error processing voice command:', error);
          toast.error('Failed to process command');
        } finally {
          setIsProcessing(false);
        }
      }
    };
    
    processVoiceCommand();
  }, [voiceCommand]);

  // Enhanced command processor with more sophisticated UI generation
  const enhancedProcessCommand = (command: string) => {
    // First try the service's processCommand
    try {
      return processCommand(command);
    } catch (e) {
      console.log('Default processor failed, using enhanced processor');
      
      // If that fails or returns basic results, use our enhanced processor
      const lowerCommand = command.toLowerCase();
      
      // Pricing card component
      if (lowerCommand.includes('pricing') || lowerCommand.includes('price')) {
        return {
          component: 'Pricing Card',
          code: `
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PricingCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
          <CardDescription>Get access to all premium features</CardDescription>
          <div className="mt-1">
            <span className="text-3xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {['Unlimited projects', 'Priority support', 'Custom domains', 'Analytics dashboard', 'Team collaboration'].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Start 14-Day Free Trial</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;
          `
        };
      }
      
      // Testimonial component
      if (lowerCommand.includes('testimonial')) {
        return {
          component: 'Testimonial',
          code: `
import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Testimonial = () => {
  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-1 mb-4">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl italic mb-6">
            "This product has completely transformed how our team works. The implementation was smooth, and the results were immediate. I can't imagine going back to our old workflow."
          </blockquote>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pravatar.cc/100" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-sm text-muted-foreground">Director of Product, Acme Inc.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Testimonial;
          `
        };
      }
      
      // Hero section component
      if (lowerCommand.includes('hero') || (lowerCommand.includes('header') && lowerCommand.includes('section'))) {
        return {
          component: 'Hero Section',
          code: `
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full py-12 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 -z-10 rounded-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <div>
              <p className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                New Features Available
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Build beautiful interfaces with ease
              </h1>
              <p className="text-xl text-muted-foreground">
                Create stunning user interfaces without writing a single line of code. Just describe what you want, and we'll build it for you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Examples
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <img 
                      src={\`https://i.pravatar.cc/100?img=\${i+20}\`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">1,200+</span> happy users
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-black/20 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-foreground ml-1"></div>
                    </div>
                  </div>
                  <p className="mt-4 font-medium">Watch Demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
          `
        };
      }
      
      // Contact form component
      if (lowerCommand.includes('contact') && lowerCommand.includes('form')) {
        return {
          component: 'Contact Form',
          code: `
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="john.doe@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="How can we help you?" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Tell us what you need..." rows={4} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          <Send className="h-4 w-4" />
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
          `
        };
      }
      
      // Dashboard stats component
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('stats')) {
        return {
          component: 'Dashboard Stats',
          code: `
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Users, CreditCard, Activity, TrendingUp } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      icon: CreditCard,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '2,420',
      change: '+12.3%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '3.65%',
      change: '+2.5%',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+12.3%',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center pt-1">
              <span className={\`text-xs \${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'} flex items-center\`}>
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
          `
        };
      }
      
      // If no specific command matches, return a default component based on the original processCommand
      return processCommand(command);
    }
  };

  return {
    generatedCode,
    componentType,
    isProcessing
  };
}
