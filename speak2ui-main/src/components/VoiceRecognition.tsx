import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Command, Sparkles, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import type { 
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent
} from '@/types/speech-recognition';

interface VoiceRecognitionProps {
  onCommand: (command: string) => void;
}

// Design-specific command patterns
const DESIGN_KEYWORDS = {
  colors: ['red', 'blue', 'green', 'purple', 'teal', 'dark', 'light', 'primary', 'secondary', 'accent'],
  sizes: ['small', 'medium', 'large', 'tiny', 'huge', 'bigger', 'smaller'],
  components: ['button', 'card', 'form', 'input', 'navbar', 'menu', 'modal', 'sidebar', 'header'],
  styles: ['rounded', 'shadow', 'gradient', 'transparent', 'solid', 'outlined', 'bordered'],
  positions: ['top', 'bottom', 'left', 'right', 'center'],
  actions: ['create', 'make', 'add', 'generate', 'show', 'display', 'update', 'change'],
  properties: ['color', 'size', 'width', 'height', 'padding', 'margin', 'font', 'background']
};

// Command suggestions based on context
const COMMAND_SUGGESTIONS = [
  "Create a modern login form with gradient background",
  "Generate a responsive navigation bar with glassmorphism effect",
  "Add a card grid layout with hover animations",
  "Make a hero section with animated background",
  "Create a sidebar with nested menu items"
];

const VoiceRecognition = ({ onCommand }: VoiceRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [detectedKeywords, setDetectedKeywords] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Process command to extract design-specific keywords
  const processCommand = (command: string) => {
    const words = command.toLowerCase().split(' ');
    const detected: string[] = [];
    
    words.forEach(word => {
      Object.entries(DESIGN_KEYWORDS).forEach(([category, keywords]) => {
        if (keywords.includes(word)) {
          detected.push(word);
        }
      });
    });

    setDetectedKeywords(detected);
    return command;
  };

  // Initialize speech recognition with enhanced error handling
  const initRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Your browser does not support speech recognition');
      return;
    }

    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Listening for design commands...', {
          icon: <Sparkles className="w-4 h-4" />
        });
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript = transcript;
            const processedCommand = processCommand(finalTranscript);
            if (processedCommand) {
              setIsExecuting(true);
              onCommand(processedCommand);
              setTimeout(() => setIsExecuting(false), 1500);
            }
          } else {
            interimTranscript = transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed') {
          toast.error('Please allow microphone access');
        } else {
          toast.error(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      toast.error('Failed to initialize speech recognition');
    }
  }, [onCommand]);

  // Rotate through command suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion(prev => (prev + 1) % COMMAND_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Start/stop listening with enhanced feedback
  const toggleListening = () => {
    if (!recognitionRef.current) {
      initRecognition();
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      toast.info('Stopped listening');
    } else {
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
        toast.error('Failed to start voice recognition');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Command className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Voice Commands</h2>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={toggleListening}
            className="relative"
            disabled={isExecuting}
          >
            {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isListening ? "Stop" : "Start"} Listening
            {isListening && (
              <motion.div
                className="absolute -inset-1 rounded-lg bg-primary/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card p-4 rounded-lg border"
          >
            <p className="text-sm text-muted-foreground mb-2">Transcript:</p>
            <p className="font-medium">{transcript}</p>
            {detectedKeywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {detectedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <RefreshCcw className="w-4 h-4" />
          Try saying:
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSuggestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-sm font-medium text-primary"
          >
            "{COMMAND_SUGGESTIONS[currentSuggestion]}"
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoiceRecognition;
