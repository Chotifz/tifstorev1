import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  ChevronLeft, 
  Save,
  Plus,
  X,
  Upload,
  ImageIcon,
  AlertCircle
} from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Sidebar from '@/components/Sidebar';
import { Separator } from "@/components/ui/separator";

// Data & Utilities
import { gameData } from '@/config/dummy-data';
import { slugify } from '@/lib/utils';

export default function AddGamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    developer: '',
    description: '',
    iconFile: null,
    iconPreview: null,
    bannerFile: null,
    bannerPreview: null,
  });
  
  // Initialize categories from game data
  useEffect(() => {
    if (gameData.categories) {
      setCategories(gameData.categories);
    }
  }, []);
  
  // Generate slug when name changes
  useEffect(() => {
    if (formData.name) {
      setFormData({
        ...formData,
        slug: slugify(formData.name)
      });
    }
  }, [formData.name]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle file upload
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFormError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    // Create file preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [`${fileType}File`]: file,
        [`${fileType}Preview`]: reader.result
      });
    };
    reader.readAsDataURL(file);
    
    // Clear error if exists
    if (formError) setFormError('');
  };
  
  // Handle category selection
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name) {
      setFormError('Game name is required');
      return;
    }
    
    if (!formData.iconFile) {
      setFormError('Game icon is required');
      return;
    }
    
    if (selectedCategories.length === 0) {
      setFormError('Please select at least one category');
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      // In a real app, we would upload the images and create the game in the database
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Redirect back to products page
        router.push('/admin/products');
      }, 1500);
    } catch (error) {
      console.error('Error creating game:', error);
      setFormError('Failed to create game. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Redirect if not authorized
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  // Don't render for non-admins
  if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    return null;
  }
  
  return (
    <>
      <Head>
        <title>Add New Game | Admin Dashboard</title>
        <meta name="description" content="Add a new game to TIF Store" />
      </Head>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/admin/products')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Add New Game</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Game
              </>
            )}
          </Button>
        </div>
        
        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the game details that will be displayed to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Game Name *</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Mobile Legends"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug"
                    name="slug"
                    placeholder="mobile-legends"
                    value={formData.slug}
                    onChange={handleInputChange}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Auto-generated from name, used in URLs
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input 
                    id="developer"
                    name="developer"
                    placeholder="Moonton"
                    value={formData.developer}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Enter a short description of the game"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Media & Categories */}
            <div className="space-y-6">
              {/* Media Uploads */}
              <Card>
                <CardHeader>
                  <CardTitle>Game Media</CardTitle>
                  <CardDescription>
                    Upload images for the game
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Icon Upload */}
                  <div className="space-y-2">
                    <Label>Game Icon *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2 h-40 ${formData.iconPreview ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <div className="bg-muted rounded-full p-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-sm">
                          <label htmlFor="iconUpload" className="cursor-pointer text-primary hover:underline">
                            Click to upload
                          </label>{' '}
                          <span className="text-muted-foreground">
                            or drag and drop
                          </span>
                        </div>
                        <input
                          id="iconUpload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(e) => handleFileChange(e, 'icon')}
                        />
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WebP (recommended 160x160px)
                        </p>
                      </div>
                      
                      {formData.iconPreview ? (
                        <div className="relative h-40 rounded-lg overflow-hidden border border-border">
                          <img 
                            src={formData.iconPreview} 
                            alt="Icon preview" 
                            className="h-full w-full object-cover"
                          />
                          <Button
                            variant="destructive" 
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => setFormData({
                              ...formData,
                              iconFile: null,
                              iconPreview: null
                            })}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border rounded-lg h-40 flex items-center justify-center bg-muted/50">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Banner Upload */}
                  <div className="space-y-2">
                    <Label>Banner Image (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2 h-44">
                      {formData.bannerPreview ? (
                        <div className="relative h-full w-full">
                          <img 
                            src={formData.bannerPreview} 
                            alt="Banner preview" 
                            className="h-full w-full object-cover rounded-md"
                          />
                          <Button
                            variant="destructive" 
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => setFormData({
                              ...formData,
                              bannerFile: null,
                              bannerPreview: null
                            })}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="bg-muted rounded-full p-2">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="text-sm">
                            <label htmlFor="bannerUpload" className="cursor-pointer text-primary hover:underline">
                              Click to upload
                            </label>{' '}
                            <span className="text-muted-foreground">
                              or drag and drop
                            </span>
                          </div>
                          <input
                            id="bannerUpload"
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={(e) => handleFileChange(e, 'banner')}
                          />
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or WebP (recommended 1280x720px)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>
                    Select categories for this game
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {category.name}
                            </Label>
                            {category.description && (
                              <p className="text-xs text-muted-foreground">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedCategories.map((categoryId) => {
                        const category = categories.find(c => c.id === categoryId);
                        return category ? (
                          <Badge key={categoryId} variant="outline" className="flex items-center gap-1">
                            {category.name}
                            <button 
                              type="button"
                              onClick={() => handleCategoryToggle(categoryId)}
                              className="ml-1 h-3 w-3 rounded-full"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ) : null;
                      })}
                      {selectedCategories.length === 0 && (
                        <span className="text-sm text-muted-foreground">No categories selected</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push('/admin/products')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Game'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

// Apply a custom layout to include the sidebar
AddGamePage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};