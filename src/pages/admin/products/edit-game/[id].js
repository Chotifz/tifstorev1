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
  AlertCircle,
  Check
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Sidebar from '@/components/Sidebar';
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Data & Utilities
import { gameData } from '@/config/dummy-data';
import { slugify } from '@/lib/utils';
import { formatPrice } from '@/config/format-price';

export default function EditGamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [game, setGame] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    developer: '',
    description: '',
    iconFile: null,
    iconPreview: null,
    iconUrl: '',
    bannerFile: null,
    bannerPreview: null,
    bannerUrl: '',
  });
  
  // Initialize categories from game data and fetch game by ID
  useEffect(() => {
    if (gameData.categories) {
      setCategories(gameData.categories);
    }
    
    if (id) {
      // Find game by ID
      const foundGame = gameData.games.find(g => g.id === id);
      
      if (foundGame) {
        setGame(foundGame);
        setFormData({
          name: foundGame.name || '',
          slug: foundGame.slug || slugify(foundGame.name) || '',
          developer: foundGame.developer || '',
          description: foundGame.description || '',
          iconFile: null,
          iconPreview: null,
          iconUrl: foundGame.icon || '',
          bannerFile: null,
          bannerPreview: null,
          bannerUrl: foundGame.banner || '',
        });
        
        // Set selected categories
        if (foundGame.categories) {
          setSelectedCategories(foundGame.categories);
        }
        
        // Get products for this game
        const gameProducts = [];
        if (foundGame.products && Array.isArray(foundGame.products)) {
          foundGame.products.forEach(category => {
            if (category.items && Array.isArray(category.items)) {
              category.items.forEach(item => {
                gameProducts.push({
                  ...item,
                  categoryName: category.category
                });
              });
            }
          });
        }
        setProducts(gameProducts);
      } else {
        // Game not found, redirect to products page
        router.push('/admin/products');
      }
    }
  }, [id, router]);
  
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
    
    if (!formData.iconUrl && !formData.iconFile) {
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
      // In a real app, we would upload the images and update the game in the database
      // For now, simulate API call with timeout
      setTimeout(() => {
        setSuccessMessage('Game updated successfully');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error updating game:', error);
      setFormError('Failed to update game. Please try again.');
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
  
  // Show loading state if game not loaded yet
  if (!game) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Edit Game | Admin Dashboard</title>
        <meta name="description" content="Edit game in TIF Store admin dashboard" />
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/admin/products')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Edit Game</h1>
              <p className="text-muted-foreground">{game.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => router.push(`/games/${game.slug}`)}
            >
              View Game
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
        
        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        {successMessage && (
          <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="promos">Promos</TabsTrigger>
          </TabsList>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 pt-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Edit the game details that will be displayed to users
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
                        Update images for the game
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Icon Upload */}
                      <div className="space-y-2">
                        <Label>Game Icon *</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div 
                            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2 h-40 ${(formData.iconPreview || formData.iconUrl) ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50'}`}
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
                          
                          <div className="relative h-40 rounded-lg overflow-hidden border border-border">
                            {formData.iconPreview ? (
                              <>
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
                              </>
                            ) : formData.iconUrl ? (
                              <>
                                <img 
                                  src={formData.iconUrl} 
                                  alt="Current icon" 
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                  Current Icon
                                </div>
                              </>
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-muted/50">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
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
                          ) : formData.bannerUrl ? (
                            <div className="relative h-full w-full">
                              <img 
                                src={formData.bannerUrl} 
                                alt="Current banner" 
                                className="h-full w-full object-cover rounded-md"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                Current Banner
                              </div>
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
                        Update categories for this game
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
                  {isLoading ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Game Products</h2>
              <Button 
                onClick={() => router.push(`/admin/products/add-product?gameId=${id}`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
            
            {products.length > 0 ? (
              <Table>
                <TableCaption>A list of products for {game.name}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        {product.discount !== "0%" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.discount}</Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                          <span>Active</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push(`/admin/products/edit-product/${product.id}`)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
                <div className="bg-muted/40 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  This game doesn't have any products yet. Add your first product to start selling.
                </p>
                <Button 
                  onClick={() => router.push(`/admin/products/add-product?gameId=${id}`)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Promos Tab */}
          <TabsContent value="promos" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Game Promotions</h2>
              <Button 
                onClick={() => router.push(`/admin/promos/add?gameId=${id}`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Promotion
              </Button>
            </div>
            
            {game.promos && game.promos.length > 0 ? (
              <Table>
                <TableCaption>A list of promotions for {game.name}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {game.promos.map((promo) => {
                    const now = new Date();
                    const startDate = new Date(promo.startDate);
                    const endDate = new Date(promo.endDate);
                    const isActive = now >= startDate && now <= endDate;
                    const isUpcoming = now < startDate;
                    const isExpired = now > endDate;
                    
                    return (
                      <TableRow key={promo.id}>
                        <TableCell className="font-medium">{promo.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{promo.discount}</Badge>
                        </TableCell>
                        <TableCell>{new Date(promo.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(promo.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {isActive && (
                            <div className="flex items-center">
                              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                              <span>Active</span>
                            </div>
                          )}
                          {isUpcoming && (
                            <div className="flex items-center">
                              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                              <span>Upcoming</span>
                            </div>
                          )}
                          {isExpired && (
                            <div className="flex items-center">
                              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                              <span>Expired</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => router.push(`/admin/promos/edit/${promo.id}`)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
                <div className="bg-muted/40 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M11 1L1 12l10 11 10-11L11 1Z" />
                    <path d="M11 5v18" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No promotions found</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  This game doesn't have any active promotions. Create a promotion to boost sales.
                </p>
                <Button 
                  onClick={() => router.push(`/admin/promos/add?gameId=${id}`)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Promotion
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Apply a custom layout to include the sidebar
EditGamePage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};