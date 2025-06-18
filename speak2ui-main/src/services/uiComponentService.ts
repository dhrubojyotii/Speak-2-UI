
import { toast } from 'sonner';

// Default component templates
const componentTemplates = {
  button: `
  <Button 
    variant="default"
    className="w-full"
  >
    Click Me
  </Button>
  `,
  
  card: `
  <Card className="w-full max-w-md mx-auto p-6">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description here</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content goes here.</p>
    </CardContent>
    <CardFooter className="flex justify-end">
      <Button variant="outline" className="mr-2">Cancel</Button>
      <Button>Submit</Button>
    </CardFooter>
  </Card>
  `,
  
  form: `
  <form className="space-y-4 w-full max-w-md mx-auto">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Enter your password" />
    </div>
    <Button className="w-full" type="submit">Submit</Button>
  </form>
  `,
  
  realestate: `
  <div className="w-full max-w-7xl mx-auto">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">Find Your Dream Home</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Discover the perfect property with our extensive listings of homes, apartments, and commercial spaces.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Card className="overflow-hidden">
        <div className="h-48 bg-muted relative">
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
            New Listing
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-lg">Luxury Villa</h3>
            <p className="text-primary font-medium">$1,250,000</p>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            <p>123 Main Street, Anytown</p>
          </div>
          <div className="flex justify-between text-sm">
            <div>4 beds</div>
            <div>3 baths</div>
            <div>2,400 sq ft</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Contact Agent</Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden">
        <div className="h-48 bg-muted relative">
          <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-lg">Modern Apartment</h3>
            <p className="text-primary font-medium">$450,000</p>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            <p>456 Park Avenue, Cityville</p>
          </div>
          <div className="flex justify-between text-sm">
            <div>2 beds</div>
            <div>2 baths</div>
            <div>1,200 sq ft</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Contact Agent</Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden">
        <div className="h-48 bg-muted relative">
          <div className="absolute top-2 right-2 bg-destructive text-white px-2 py-1 rounded text-xs font-medium">
            Price Reduced
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-lg">Cozy Cottage</h3>
            <p className="text-primary font-medium">$295,000</p>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            <p>789 Oak Lane, Villageton</p>
          </div>
          <div className="flex justify-between text-sm">
            <div>3 beds</div>
            <div>1 bath</div>
            <div>1,050 sq ft</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Contact Agent</Button>
        </CardFooter>
      </Card>
    </div>

    <div className="space-y-6 mb-10">
      <div className="bg-secondary/30 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Find Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anytown">Anytown</SelectItem>
                <SelectItem value="cityville">Cityville</SelectItem>
                <SelectItem value="villageton">Villageton</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="property-type">Property Type</Label>
            <Select>
              <SelectTrigger id="property-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price-range">Price Range</Label>
            <Select>
              <SelectTrigger id="price-range">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Under $300,000</SelectItem>
                <SelectItem value="medium">$300,000 - $600,000</SelectItem>
                <SelectItem value="high">Above $600,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-4 w-full">Search Properties</Button>
      </div>
    </div>

    <div className="text-center mt-12 mb-8">
      <h2 className="text-3xl font-bold mb-4">Our Services</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        We provide comprehensive real estate services to help you buy, sell, or rent properties.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Property Buying</h3>
        <p className="text-muted-foreground">Find your dream home with our expert buying services.</p>
      </div>
      
      <div className="text-center">
        <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Property Selling</h3>
        <p className="text-muted-foreground">Get the best price for your property with our selling expertise.</p>
      </div>
      
      <div className="text-center">
        <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 11l2-2-2-2"></path>
            <path d="M19 9H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h9a2 2 0 0 0 1.84-1.22L21 12a2 2 0 0 0-1.84-2.78L19 9z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Property Management</h3>
        <p className="text-muted-foreground">Let us handle your property management needs efficiently.</p>
      </div>
    </div>

    <div className="bg-secondary/20 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Contact our team of real estate experts today and let us help you find your perfect property.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="px-8">Contact Us</Button>
        <Button size="lg" variant="outline" className="px-8">View Listings</Button>
      </div>
    </div>
  </div>
  `,
};

// Common imports needed for components
const componentImports = {
  button: [
    "import { Button } from '@/components/ui/button';",
  ],
  card: [
    "import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';",
    "import { Button } from '@/components/ui/button';",
  ],
  form: [
    "import { Button } from '@/components/ui/button';",
    "import { Input } from '@/components/ui/input';",
    "import { Label } from '@/components/ui/label';",
  ],
  realestate: [
    "import { Button } from '@/components/ui/button';",
    "import { Card, CardContent, CardFooter } from '@/components/ui/card';",
    "import { Label } from '@/components/ui/label';",
    "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';",
  ],
};

// Process voice command and generate UI
export const processCommand = (command: string): { code: string; component: string } => {
  console.log('Processing command:', command);
  
  let componentType = 'default';
  const commandLower = command.toLowerCase();
  let importStatements: string[] = [];
  let componentCode = '';
  
  // Basic component detection
  if (commandLower.includes('button')) {
    componentType = 'button';
  } else if (commandLower.includes('card')) {
    componentType = 'card';
  } else if (commandLower.includes('form') || commandLower.includes('login')) {
    componentType = 'form';
  } else if (commandLower.includes('real estate') || commandLower.includes('property') || commandLower.includes('housing')) {
    componentType = 'realestate';
  }
  
  // Get the component template
  componentCode = componentTemplates[componentType as keyof typeof componentTemplates] || componentTemplates.button;
  importStatements = componentImports[componentType as keyof typeof componentImports] || componentImports.button;
  
  // Generate the full component code
  const fullComponentCode = `
import React from 'react';
${importStatements.join('\n')}

const MyComponent = () => {
  return (
    <div className="w-full space-y-4">
      ${componentCode}
    </div>
  );
};

export default MyComponent;
`;

  toast.success(`Generated ${componentType} component`);
  return {
    code: fullComponentCode,
    component: componentType,
  };
};
