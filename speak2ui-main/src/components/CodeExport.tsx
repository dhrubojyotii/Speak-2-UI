
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Code, CheckCircle, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface CodeExportProps {
  code: string;
}

const CodeExport = ({ code }: CodeExportProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        toast.success('Code copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy code');
      });
  };

  // Download code as a file
  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'MyComponent.jsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Code downloaded');
  };

  // Generate full React app code
  const generateFullAppCode = () => {
    return `
// App.jsx
import React from 'react';
import MyComponent from './MyComponent';

function App() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-2xl font-bold mb-6">My App</h1>
      <MyComponent />
    </div>
  );
}

export default App;

// MyComponent.jsx
${code}
    `;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Code size={16} />
            Export Code
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Export Code
          </DialogTitle>
          <DialogDescription>
            Copy or download the generated React and Tailwind CSS code for your UI.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="component" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="component">Component</TabsTrigger>
            <TabsTrigger value="fullApp">Full App</TabsTrigger>
          </TabsList>
          
          <TabsContent value="component" className="mt-4">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-secondary/30">
              <pre className="text-sm"><code>{code}</code></pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="fullApp" className="mt-4">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-secondary/30">
              <pre className="text-sm"><code>{generateFullAppCode()}</code></pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="secondary" onClick={copyToClipboard}>
            {copied ? (
              <>
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button variant="default" onClick={downloadCode} className="gap-2">
            <Download size={16} />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CodeExport;
