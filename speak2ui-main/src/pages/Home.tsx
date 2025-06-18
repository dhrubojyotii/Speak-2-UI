import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import VoiceRecognition from "../components/VoiceRecognition";
import UIPreview from "../components/UIPreview";
import CodeExport from "../components/CodeExport";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Footer from "../components/Footer";
import { useVoiceCommand } from "@/hooks/useVoiceCommand";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Mic, Code, Layout, Wand, Sparkles, 
  LucideIcon, Zap, CornerDownRight, Headphones
} from "lucide-react";
import { motion } from "framer-motion";

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string 
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-xl flex flex-col items-center text-center"
  >
    <div className="p-3 rounded-full bg-primary/10 mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

// Example command component
const ExampleCommand = ({ command, description }: { command: string; description: string }) => (
  <div className="bg-secondary/30 p-3 rounded-lg flex items-start gap-3 group">
    <CornerDownRight className="w-4 h-4 text-muted-foreground mt-1" />
    <div>
      <p className="font-medium text-sm">{command}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
    <motion.button 
      whileTap={{ scale: 0.97 }}
      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Try this command"
    >
      <Headphones className="w-4 h-4 text-muted-foreground" />
    </motion.button>
  </div>
);

const Home = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [voiceCommand, setVoiceCommand] = useState("");
  const { generatedCode, componentType, isProcessing } = useVoiceCommand(voiceCommand);

  // Handle voice command
  const handleVoiceCommand = useCallback((command: string) => {
    console.log("Voice command received:", command);
    setVoiceCommand(command);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <BackgroundAnimation />
      <Navbar />
      
      <main className="flex-1 container py-8">
        {!currentUser ? (
          // Enhanced content for non-authenticated users
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-speak-purple to-speak-teal via-speak-purple-light bg-clip-text text-transparent">
                Transform Voice to Beautiful UI
              </h1>
              <p className="text-lg md:text-xl mb-6 text-muted-foreground max-w-2xl mx-auto">
                Experience the future of UI development. Just speak your design ideas, and watch them come to life instantly with our AI-powered interface.
              </p>
              <div className="flex gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="bg-gradient-to-r from-speak-purple to-speak-teal hover:opacity-90 transition-all"
                  >
                    Get Started
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {/* <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      const demoSection = document.getElementById("demo");
                      demoSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    See Demo
                  </Button> */}
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-12"
            >
              <FeatureCard
                icon={Mic}
                title="Voice Commands"
                description="Create UI components naturally through voice interactions"
              />
              <FeatureCard
                icon={Wand}
                title="AI-Powered"
                description="Advanced AI understands your intent and generates pixel-perfect components"
              />
              <FeatureCard
                icon={Code}
                title="Code Export"
                description="Get clean, production-ready code for your generated components"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-2xl mx-auto"
            >
              <Card className="bg-background/50 backdrop-blur border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Try these commands:</h3>
                  <div className="space-y-3">
                    <ExampleCommand
                      command="Create a modern login form"
                      description="Generates a styled login form with username and password fields"
                    />
                    <ExampleCommand
                      command="Make a navigation menu"
                      description="Creates a responsive navigation bar with dropdown support"
                    />
                    <ExampleCommand
                      command="Build a pricing card"
                      description="Generates a beautiful pricing component with features list"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          // Enhanced content for authenticated users
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            {/* Welcome section */}
            <section className="glass p-8 rounded-xl text-center">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-speak-purple to-speak-teal bg-clip-text text-transparent">
                  Welcome to Speak 2 UI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your voice is the paintbrush. Create beautiful UI components just by speaking.
                </p>
              </motion.div>
            </section>
            
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Voice Recognition Panel */}
              <div className="md:col-span-1 space-y-6">
                <VoiceRecognition onCommand={handleVoiceCommand} />
                
                {/* Example commands */}
                <Card className="glass overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Try These Commands
                    </h3>
                  </div>
                  <div className="p-4 space-y-3 max-h-[260px] overflow-y-auto scrollbar-hidden">
                    <ExampleCommand 
                      command="Create a pricing card"
                      description="Generates a pricing plan component with title, price, and features"
                    />
                    <ExampleCommand 
                      command="Add a testimonial slider with images"
                      description="Creates a carousel to showcase customer testimonials"
                    />
                    <ExampleCommand 
                      command="Make a hero section with a call to action"
                      description="Builds a header section with headline, description, and button"
                    />
                    <ExampleCommand 
                      command="Generate a contact form with validation"
                      description="Creates a form with name, email, message fields with validation"
                    />
                    <ExampleCommand 
                      command="Create a dashboard stats panel"
                      description="Builds analytics cards with metrics and icons"
                    />
                  </div>
                </Card>
              </div>
              
              {/* UI Generator Panel */}
              <div className="md:col-span-2">
                <Card className="glass overflow-hidden">
                  <Tabs defaultValue="generator" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-1 m-1">
                      <TabsTrigger value="generator" className="flex items-center">
                        <Layout className="h-4 w-4 mr-2" />
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="export" className="flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        Export
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="generator" className="p-4">
                      <div className="space-y-4">
                        <UIPreview code={generatedCode} isProcessing={isProcessing} />
                        
                        {componentType && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center p-3 bg-secondary/20 rounded-md"
                          >
                            <p>Generated <span className="font-medium">{componentType}</span> component</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Switch to the Export tab to view and download the code
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="export" className="p-4">
                      <div className="text-center space-y-4">
                        <h3 className="text-lg font-medium">Export Your UI</h3>
                        <p className="text-muted-foreground">
                          Export your UI as React + Tailwind CSS code that you can use in your projects.
                        </p>
                        <CodeExport code={generatedCode || `
import React from 'react';
import { Button } from '@/components/ui/button';

const MyComponent = () => {
  return (
    <div className="space-y-4">
      <Button variant="default">Click me</Button>
    </div>
  );
};

export default MyComponent;
                        `} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </div>
            
            {/* Tips section */}
            <section className="glass p-8 rounded-xl mt-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Wand className="h-5 w-5" />
                Voice Command Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-secondary/30 rounded-xl">
                  <h3 className="font-semibold mb-3 text-lg">UI Components</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple inline-block"></span>
                      "Create a blue button with icon"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple inline-block"></span>
                      "Add a card with image and text"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple inline-block"></span>
                      "Make a navigation menu"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple inline-block"></span>
                      "Generate a testimonial section"
                    </li>
                  </ul>
                </div>
                
                <div className="p-5 bg-secondary/30 rounded-xl">
                  <h3 className="font-semibold mb-3 text-lg">Complete Pages</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-teal inline-block"></span>
                      "Create a product landing page"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-teal inline-block"></span>
                      "Make a login page with form"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-teal inline-block"></span>
                      "Generate a user profile page"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-teal inline-block"></span>
                      "Design a pricing comparison page"
                    </li>
                  </ul>
                </div>
                
                <div className="p-5 bg-secondary/30 rounded-xl">
                  <h3 className="font-semibold mb-3 text-lg">Customization</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple-light inline-block"></span>
                      "Change button color to red"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple-light inline-block"></span>
                      "Update the heading to say Welcome"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple-light inline-block"></span>
                      "Add a shadow to the card"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-speak-purple-light inline-block"></span>
                      "Make the font size larger"
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
