import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Wand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UIPreviewProps {
  code: string;
  isProcessing: boolean;
  componentType?: string;
}

const UIPreview = ({ code, isProcessing, componentType }: UIPreviewProps): JSX.Element => {
  const [iframeHeight, setIframeHeight] = useState<number>(400);

  useEffect(() => {
    const handleIframeResize = (event: MessageEvent) => {
      if (event.data.type === 'RESIZE_IFRAME') {
        setIframeHeight(event.data.height + 32); // Add padding
      }
    };

    window.addEventListener('message', handleIframeResize);
    return () => window.removeEventListener('message', handleIframeResize);
  }, []);

  const renderPreview = () => {
    if (isProcessing) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 p-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand className="h-5 w-5 text-primary animate-spin" />
            <p className="text-primary font-medium">Crafting your UI component...</p>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Skeleton className={`h-${[28, 100, 28, 44][i]}px w-${['3/4', 'full', '1/2', '1/3'][i]}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (!code) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 space-y-6"
        >
          <p className="text-lg font-medium text-muted-foreground">
            Ready to create your UI components
          </p>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Skeleton className="h-[100px]" />
              </motion.div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Try these voice commands:</p>
            <ul className="space-y-1">
              <li>"Create a modern login form with gradient"</li>
              <li>"Generate a responsive navigation menu"</li>
              <li>"Make a pricing card with hover effects"</li>
            </ul>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="w-full h-full">
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                  body { 
                    padding: 1rem; 
                    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
                    color: hsl(222.2, 84%, 4.9%);
                    background-color: transparent;
                  }
                  .btn { 
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    padding: 0.625rem 1.25rem;
                    background-color: hsl(222.2, 47.4%, 11.2%);
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.875rem;
                  }
                  .btn:hover { 
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  }
                  .btn-primary {
                    background: linear-gradient(to right, #8844ee, #6600cc);
                  }
                  .btn-secondary {
                    background-color: hsl(215, 20%, 95%);
                    color: hsl(222.2, 47.4%, 11.2%);
                  }
                  .btn-outline {
                    background-color: transparent;
                    border: 1px solid hsl(215, 20%, 65%);
                    color: hsl(222.2, 47.4%, 11.2%);
                  }
                  .btn-ghost {
                    background-color: transparent;
                    color: hsl(222.2, 47.4%, 11.2%);
                  }
                  .btn-destructive {
                    background-color: hsl(0, 84.2%, 60.2%);
                  }
                  .card {
                    border-radius: 0.75rem;
                    border: 1px solid hsl(215, 20%, 90%);
                    background-color: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    transition: all 0.2s ease;
                  }
                  .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                  }
                  .form-input {
                    width: 100%;
                    padding: 0.625rem;
                    border-radius: 0.5rem;
                    border: 1px solid hsl(215, 20%, 85%);
                    background-color: white;
                    font-size: 0.875rem;
                    transition: all 0.2s ease;
                  }
                  .form-input:focus {
                    outline: none;
                    border-color: #8844ee;
                    box-shadow: 0 0 0 3px rgba(136, 68, 238, 0.1);
                  }
                  .label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.375rem;
                    display: block;
                    color: hsl(222.2, 47.4%, 11.2%);
                  }
                  .nav-menu {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background-color: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                  }
                  .nav-item {
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                  }
                  .nav-item:hover {
                    background-color: hsl(215, 20%, 95%);
                  }
                  .tooltip {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                  }
                  .tooltip .tooltip-text {
                    visibility: hidden;
                    width: 120px;
                    background-color: black;
                    color: #fff;
                    text-align: center;
                    border-radius: 0.25rem;
                    padding: 0.25rem 0;
                    position: absolute;
                    z-index: 10;
                    bottom: 125%;
                    left: 50%;
                    margin-left: -60px;
                    opacity: 0;
                    transition: opacity 0.2s;
                  }
                  .tooltip:hover .tooltip-text {
                    visibility: visible;
                    opacity: 1;
                  }
                </style>
              </head>
              <body>
                <div id="app"></div>
                <script>
                  const app = document.getElementById('app');
                  app.innerHTML = \`${code}\`;
                </script>
              </body>
            </html>
          `}
          style={{ width: '100%', height: `${iframeHeight}px`, border: 'none' }}
          title="Live Preview"
        />
      </div>
    );
  };

  return (
    <Card className="w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b px-4 py-3 bg-muted/40 flex items-center justify-between"
      >
        <Label className="text-sm font-medium">Live Preview</Label>
        {componentType && (
          <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 rounded-full">
            {componentType}
          </span>
        )}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isProcessing ? 'processing' : code ? 'preview' : 'empty'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          {renderPreview()}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default UIPreview;
