import { useState, useEffect, useCallback } from 'react';
import { ComponentType, ButtonProps, InputProps, CardProps, ComponentProps } from '../types/component';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Copy, Layout, Code } from 'lucide-react';

// Type guards
const isButtonProps = (props: ComponentProps): props is ButtonProps => {
  return 'variant' in props && 'size' in props;
};

const isInputProps = (props: ComponentProps): props is InputProps => {
  return 'placeholder' in props && 'type' in props && 'label' in props;
};

const isCardProps = (props: ComponentProps): props is CardProps => {
  return 'title' in props;
};

interface UIGeneratorProps {
  command: string;
}

// Component style presets
const STYLE_PRESETS = {
  modern: {
    button: {
      variant: 'default',
      className: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
    },
    card: {
      className: 'backdrop-blur-sm bg-white/10 border-none shadow-lg',
    },
    input: {
      className: 'border-2 focus:ring-2 ring-purple-500/20',
    }
  },
  minimal: {
    button: {
      variant: 'outline',
      className: 'hover:bg-secondary/80',
    },
    card: {
      className: 'border shadow-sm hover:shadow',
    },
    input: {
      className: 'border focus:ring-1 ring-primary/20',
    }
  },
  glassmorphism: {
    button: {
      variant: 'secondary',
      className: 'backdrop-blur-md bg-white/10 border-white/20',
    },
    card: {
      className: 'backdrop-blur-lg bg-white/10 border-white/20',
    },
    input: {
      className: 'backdrop-blur-md bg-white/5 border-white/20',
    }
  }
};

// Command patterns for better recognition
const COMMAND_PATTERNS = {
  create: /create|add|make|generate/i,
  modify: /change|update|set|modify/i,
  delete: /delete|remove|clear/i,
  style: /modern|minimal|clean|glass|gradient|dark|light/i,
  color: /red|blue|green|purple|teal|indigo|gray|white|black/i,
  size: /small|medium|large|huge|tiny/i,
  position: /top|bottom|left|right|center/i,
  state: /hover|focus|active|disabled/i,
  animation: /animate|transition|fade|slide|bounce/i
};

const UIGenerator = ({ command }: UIGeneratorProps) => {
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [lastProcessedCommand, setLastProcessedCommand] = useState<string>('');

  // Enhanced command processing with natural language understanding
  const processCommand = (command: string) => {
    if (!command || command === lastProcessedCommand) return;
    
    console.log('Processing command:', command);
    const lowerCommand = command.toLowerCase();
    
    // Extract style preferences
    const stylePreset = Object.keys(STYLE_PRESETS).find(style => 
      lowerCommand.includes(style)
    ) || 'modern';
    
    // Extract color preferences
    const colorMatch = lowerCommand.match(COMMAND_PATTERNS.color);
    const color = colorMatch ? colorMatch[0] : null;
    
    // Extract size preferences
    const sizeMatch = lowerCommand.match(COMMAND_PATTERNS.size);
    const size = sizeMatch ? sizeMatch[0] : 'default';
    
    // Handle component creation
    if (COMMAND_PATTERNS.create.test(lowerCommand)) {
      handleCreateComponent(lowerCommand, { stylePreset, color, size });
    }
    // Handle component modification
    else if (COMMAND_PATTERNS.modify.test(lowerCommand)) {
      handleModifyComponent(lowerCommand, { stylePreset, color, size });
    }
    // Handle component deletion
    else if (COMMAND_PATTERNS.delete.test(lowerCommand)) {
      handleDeleteComponent(lowerCommand);
    }
    else {
      toast.error('Could not understand the command. Try being more specific.');
    }
    
    setLastProcessedCommand(command);
  };

  // Enhanced component creation with style presets
  const handleCreateComponent = (command: string, options: { stylePreset: keyof typeof STYLE_PRESETS, color: string | null, size: string }) => {
    const { stylePreset, color, size } = options;
    const presets = STYLE_PRESETS[stylePreset];
    
    const newComponent: ComponentType = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'button',
      properties: {
        text: 'Button',
        variant: 'default',
        size: 'default',
        className: ''
      } as ButtonProps
    };

    // Style modifications based on command
    if (isButtonProps(newComponent.properties)) {
      if (command.includes('blue')) newComponent.properties.variant = 'default';
      if (command.includes('red') || command.includes('destructive')) newComponent.properties.variant = 'destructive';
      if (command.includes('outline')) newComponent.properties.variant = 'outline';
      if (command.includes('ghost')) newComponent.properties.variant = 'ghost';
      if (command.includes('link')) newComponent.properties.variant = 'link';
      if (command.includes('secondary')) newComponent.properties.variant = 'secondary';
      
      if (command.includes('small')) newComponent.properties.size = 'sm';
      if (command.includes('large')) newComponent.properties.size = 'lg';
    }

    // Handle different component types
    if (command.includes('button')) {
      if (isButtonProps(newComponent.properties)) {
        newComponent.properties.text = command.includes('submit') ? 'Submit' : 'Button';
        newComponent.properties.variant = presets.button.variant as ButtonProps['variant'];
        newComponent.properties.className = presets.button.className;
      }
    }
    else if (command.includes('input')) {
      newComponent.type = 'input';
      newComponent.properties = {
        type: 'text',
        placeholder: 'Enter text',
        label: 'Input',
        className: presets.input.className
      } as InputProps;
      
      if (isInputProps(newComponent.properties)) {
        if (command.includes('email')) {
          newComponent.properties.type = 'email';
          newComponent.properties.placeholder = 'Enter email';
          newComponent.properties.label = 'Email';
        }
        else if (command.includes('password')) {
          newComponent.properties.type = 'password';
          newComponent.properties.placeholder = 'Enter password';
          newComponent.properties.label = 'Password';
        }
      }
    }
    else if (command.includes('card')) {
      newComponent.type = 'card';
      newComponent.properties = {
        title: 'Card Title',
        description: 'Card Description',
        content: 'Card Content',
        className: presets.card.className
      } as CardProps;
    }

    setComponents(prev => [...prev, newComponent]);
    setLastProcessedCommand(command);
  };

  // Enhanced component modification
  const handleModifyComponent = (command: string, options: { stylePreset: string, color?: string | null, size?: string }) => {
    // If there are no components, show an error
    if (components.length === 0) {
      toast.error('No components to modify');
      return;
    }

    // Create a copy of the components
    const updatedComponents = [...components];
    
    // For simplicity, modify the last component
    const lastComponent = updatedComponents[updatedComponents.length - 1];
    let modified = false;
    
    // Modify button
    if (lastComponent.type === 'button') {
      const buttonProps = lastComponent.properties as any;
      // Change button text
      if (command.includes('text to')) {
        const textMatch = command.match(/text to\s+["']?([^"']+)["']?/i);
        if (textMatch && textMatch[1]) {
          buttonProps.text = textMatch[1];
          modified = true;
        }
      }
      
      // Change button color
      if (command.includes('blue') || command.includes('primary')) {
        buttonProps.variant = 'default';
        modified = true;
      }
      if (command.includes('red') || command.includes('destructive')) {
        buttonProps.variant = 'destructive';
        modified = true;
      }
      if (command.includes('outline')) {
        buttonProps.variant = 'outline';
        modified = true;
      }
      if (command.includes('ghost')) {
        buttonProps.variant = 'ghost';
        modified = true;
      }
      if (command.includes('link')) {
        buttonProps.variant = 'link';
        modified = true;
      }
      if (command.includes('secondary')) {
        buttonProps.variant = 'secondary';
        modified = true;
      }
      
      // Change button size
      if (command.includes('small')) {
        buttonProps.size = 'sm';
        modified = true;
      }
      if (command.includes('large')) {
        buttonProps.size = 'lg';
        modified = true;
      }
      if (command.includes('default size')) {
        buttonProps.size = 'default';
        modified = true;
      }
    }
    
    // Modify input
    else if (lastComponent.type === 'input') {
      const inputProps = lastComponent.properties as any;
      // Change input placeholder
      if (command.includes('placeholder to')) {
        const placeholderMatch = command.match(/placeholder to\s+["']?([^"']+)["']?/i);
        if (placeholderMatch && placeholderMatch[1]) {
          inputProps.placeholder = placeholderMatch[1];
          modified = true;
        }
      }
      
      // Change input label
      if (command.includes('label to')) {
        const labelMatch = command.match(/label to\s+["']?([^"']+)["']?/i);
        if (labelMatch && labelMatch[1]) {
          inputProps.label = labelMatch[1];
          modified = true;
        }
      }
      
      // Change input type
      if (command.includes('type to')) {
        if (command.includes('email')) {
          inputProps.type = 'email';
          modified = true;
        }
        if (command.includes('password')) {
          inputProps.type = 'password';
          modified = true;
        }
        if (command.includes('text')) {
          inputProps.type = 'text';
          modified = true;
        }
      }
    }
    
    // Modify card
    else if (lastComponent.type === 'card') {
      const cardProps = lastComponent.properties as any;
      // Change card title
      if (command.includes('title to')) {
        const titleMatch = command.match(/title to\s+["']?([^"']+)["']?/i);
        if (titleMatch && titleMatch[1]) {
          cardProps.title = titleMatch[1];
          modified = true;
        }
      }
      
      // Change card description
      if (command.includes('description to')) {
        const descMatch = command.match(/description to\s+["']?([^"']+)["']?/i);
        if (descMatch && descMatch[1]) {
          cardProps.description = descMatch[1];
          modified = true;
        }
      }
      
      // Change card content
      if (command.includes('content to')) {
        const contentMatch = command.match(/content to\s+["']?([^"']+)["']?/i);
        if (contentMatch && contentMatch[1]) {
          cardProps.content = contentMatch[1];
          modified = true;
        }
      }
    }
    
    // Update the components state if modified
    if (modified) {
      setComponents(updatedComponents);
      toast.success(`Modified ${lastComponent.type}`);
    } else {
      toast.error('Could not modify component');
    }
  };

  // Delete a component
  const handleDeleteComponent = (command: string) => {
    if (components.length === 0) {
      toast.error('No components to delete');
      return;
    }
    
    // By default, delete the last component
    const updatedComponents = components.slice(0, -1);
    setComponents(updatedComponents);
    toast.success('Deleted the last component');
  };

  // Handle manual delete
  const handleDeleteById = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    toast.success('Component deleted');
  };

  // Generate code for the components
  const generateCode = () => {
    let code = `import React from 'react';\n`;
    
    // Import statements
    code += `import { Button } from '@/components/ui/button';\n`;
    code += `import { Input } from '@/components/ui/input';\n`;
    code += `import { Label } from '@/components/ui/label';\n`;
    code += `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';\n\n`;
    
    code += `const MyComponent = () => {\n`;
    code += `  return (\n`;
    code += `    <div className="space-y-4">\n`;
    
    // Generate JSX for each component
    components.forEach(component => {
      if (component.type === 'button') {
        const buttonProps = component.properties as any;
        code += `      <Button variant="${buttonProps.variant}" size="${buttonProps.size}">${buttonProps.text}</Button>\n`;
      }
      else if (component.type === 'input') {
        const inputProps = component.properties as any;
        code += `      <div className="space-y-2">\n`;
        code += `        <Label htmlFor="${component.id}">${inputProps.label}</Label>\n`;
        code += `        <Input id="${component.id}" type="${inputProps.type}" placeholder="${inputProps.placeholder}" />\n`;
        code += `      </div>\n`;
      }
      else if (component.type === 'card') {
        const cardProps = component.properties as any;
        code += `      <Card>\n`;
        code += `        <CardHeader>\n`;
        code += `          <CardTitle>${cardProps.title}</CardTitle>\n`;
        code += `          <CardDescription>${cardProps.description}</CardDescription>\n`;
        code += `        </CardHeader>\n`;
        code += `        <CardContent>\n`;
        code += `          <p>${cardProps.content}</p>\n`;
        code += `        </CardContent>\n`;
        code += `      </Card>\n`;
      }
    });
    
    code += `    </div>\n`;
    code += `  );\n`;
    code += `};\n\n`;
    code += `export default MyComponent;`;
    
    return code;
  };

  // Copy code to clipboard
  const copyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code)
      .then(() => toast.success('Code copied to clipboard'))
      .catch(() => toast.error('Failed to copy code'));
  };

  // Render a component
  const renderComponent = (component: ComponentType) => {
    switch (component.type) {
      case 'button':
        const buttonProps = component.properties as any;
        return (
          <Button 
            variant={buttonProps.variant}
            size={buttonProps.size}
          >
            {buttonProps.text}
          </Button>
        );
      case 'input':
        const inputProps = component.properties as any;
        return (
          <div className="space-y-2">
            <Label htmlFor={component.id}>{inputProps.label}</Label>
            <Input 
              id={component.id}
              type={inputProps.type} 
              placeholder={inputProps.placeholder} 
            />
          </div>
        );
      case 'card':
        const cardProps = component.properties as any;
        return (
          <Card>
            <CardHeader>
              <CardTitle>{cardProps.title}</CardTitle>
              <CardDescription>{cardProps.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{cardProps.content}</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  // Process command when it changes using useEffect
  useEffect(() => {
    if (command && command !== lastProcessedCommand) {
      console.log('Command changed, processing:', command);
      processCommand(command);
    }
  }, [command, lastProcessedCommand]);

  // Update the generatedCode in Home.tsx
  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage({ type: 'GENERATED_CODE', code: generateCode() }, '*');
    }
  }, [components]);

  return (
    <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview" className="flex items-center">
          <Layout className="h-4 w-4 mr-2" />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center">
          <Code className="h-4 w-4 mr-2" />
          Code
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="preview" className="mt-4">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            {components.length > 0 ? (
              <div className="space-y-4">
                {components.map((component, index) => (
                  <div key={component.id} className="relative group">
                    <div className="p-4 hover:bg-accent/20 rounded-md transition-colors">
                      {renderComponent(component)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteById(component.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <p className="text-muted-foreground">No components added yet.</p>
                <p className="text-muted-foreground">Try saying "Create a button" or "Add a login form".</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="code" className="mt-4">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            {components.length > 0 ? (
              <div className="relative">
                <ScrollArea className="h-[300px] w-full">
                  <pre className="text-sm p-4 rounded-md bg-secondary overflow-auto">
                    <code>{generateCode()}</code>
                  </pre>
                </ScrollArea>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={copyCode}
                >
                  <Copy size={16} className="mr-2" />
                  Copy Code
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <p className="text-muted-foreground">No components to generate code for.</p>
                <p className="text-muted-foreground">Add components in the Preview tab first.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UIGenerator;
