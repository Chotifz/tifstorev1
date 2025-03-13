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
  Trash2,
  PercentIcon,
  DollarSign
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

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { gameId } = router.query;
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [benefits, setBenefits] = useState(['']);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    gameId: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    discount: '',
    duration: '',
    iconFile: null,
    iconPreview: null,
  });
  
  // Common tags
  const commonTags = [
    { id: 'popular', name: 'Popular' },
    { id: 'terlaris', name: 'Terlaris' },
    { id: 'promo', name: 'Promo' },
    { id: 'hemat', name: 'Hemat' },
    { id: 'limited', name: 'Limited' },
    { id: 'best_value', name: 'Best Value' },
  ];
  
  // Initialize data
  useEffect(() => {
    // Set games from game data
    setGames(gameData.games);
    
    // If gameId is provided in URL, set it in form
    if (gameId) {
      setFormData(prev => ({
        ...prev,
        gameId
      }));
      
      // Find the game and set available categories
      const game = gameData.games.find(g => g.id === gameId);
      if (game && game.products) {
        const gameCategories = game.products.map(category => ({
          id: category.category,
          name: category.category
        }));
        setCategories(gameCategories);
      }
    }
  }, [gameId]);
  
  // Update categories when game changes
  useEffect(() => {
    if (formData.gameId) {
      const game = games.find(g => g.id === formData.gameId);
      if (game && game.products) {
        const gameCategories = game.products.map(category => ({
          id: category.category,
          name: category.category
        }));
        setCategories(gameCategories);
        
        // Reset category if current one is not available
        if (!gameCategories.some(c => c.id === formData.category)) {
          setFormData(prev => ({
            ...prev,
            category: ''
          }));
        }
      }
    }
  }, [formData.gameId, games]);
  
  // Calculate discount percentage
  useEffect(() => {
    if (formData.originalPrice && formData.price) {
      const originalPrice = parseFloat(formData.originalPrice);
      const price = parseFloat(formData.price);
      
      if (originalPrice > price) {
        const discountPercentage = ((originalPrice - price) / originalPrice) * 100;
        setFormData(prev => ({
          ...prev,
          discount: `${Math.round(discountPercentage)}%`
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          discount: '0%'
        }));
      }
    }
  }, [formData.originalPrice, formData.price]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle number input for prices
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers
    if (value === '' || /^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
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
        iconFile: file,
        iconPreview: reader.result
      });
    };
    reader.readAsDataURL(file);
    
    // Clear error if exists
    if (formError) setFormError('');
  };
  
  // Handle tag selection
  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };
  
  // Add new benefit field
  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };
  
  // Remove benefit field
  const removeBenefit = (index) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };
  
  // Handle benefit change
  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name) {
      setFormError('Product name is required');
      return;
    }
    
    if (!formData.gameId) {
      setFormError('Please select a game');
      return;
    }
    
    if (!formData.category) {
      setFormError('Please select a category');
      return;
    }
    
    if (!formData.price) {
      setFormError('Product price is required');
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      // In a real app, we would upload the icon and create the product in the database
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Redirect back to products page
        router.push('/admin/products?tab=products');
      }, 1500);
    } catch (error) {
      console.error('Error creating product:', error);
      setFormError('Failed to create product. Please try again.');
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
        <title>Add New Product | Admin Dashboard</title>
        <meta name="description" content="Add a new product to TIF Store" />
      </Head>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/admin/products?tab=products')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Product
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
                  Enter the product details that will be displayed to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="86 Diamonds"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gameId">Game *</Label>
                  <Select 
                    value={formData.gameId} 
                    onValueChange={(value) => handleSelectChange('gameId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a game" />
                    </SelectTrigger>
                    <SelectContent>
                      {games.map((game) => (
                        <SelectItem key={game.id} value={game.id}>
                          {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                    disabled={!formData.gameId || categories.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        !formData.gameId 
                          ? "Select a game first" 
                          : categories.length === 0 
                            ? "No categories available" 
                            : "Select a category"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Enter a short description of the product"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Pricing & Tags */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Set the pricing details for this product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (IDR) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="price"
                        name="price"
                        placeholder="15000"
                        className="pl-9"
                        value={formData.price}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (IDR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="originalPrice"
                        name="originalPrice"
                        placeholder="Leave blank if no discount"
                        className="pl-9"
                        value={formData.originalPrice}
                        onChange={handlePriceChange}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set this higher than the price to show a discount
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Discount</Label>
                    <div className="relative">
                      <PercentIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="discount"
                        name="discount"
                        value={formData.discount || '0%'}
                        disabled
                        className="pl-9"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Auto-calculated from original price and price
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (Optional)</Label>
                    <Input 
                      id="duration"
                      name="duration"
                      placeholder="e.g., 30 days"
                      value={formData.duration}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      For subscription or time-limited products
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tags & Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags & Benefits</CardTitle>
                  <CardDescription>
                    Add tags and benefits for this product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {commonTags.map((tag) => (
                        <Badge 
                          key={tag.id} 
                          variant={selectedTags.includes(tag.id) ? "default" : "outline"} 
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag.id)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Benefits</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addBenefit}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            placeholder={`Benefit ${index + 1}`}
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                          />
                          {benefits.length > 1 && (
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon"
                              onClick={() => removeBenefit(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Icon Upload */}
                  <div className="space-y-2">
                    <Label>Product Icon (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2 h-32 ${formData.iconPreview ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <div className="bg-muted rounded-full p-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-sm">
                          <label htmlFor="iconUpload" className="cursor-pointer text-primary hover:underline">
                            Click to upload
                          </label>
                        </div>
                        <input
                          id="iconUpload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFileChange}
                        />
                      </div>
                      
                      {formData.iconPreview ? (
                        <div className="relative h-32 rounded-lg overflow-hidden border border-border">
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
                        <div className="border rounded-lg h-32 flex items-center justify-center bg-muted/50">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Product icon is optional. PNG, JPG or WebP (recommended 160x160px)
                    </p>
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
              onClick={() => router.push('/admin/products?tab=products')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

// Apply a custom layout to include the sidebar
AddProductPage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};