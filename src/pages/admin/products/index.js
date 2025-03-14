import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  Filter, 
  Download, 
  Upload, 
  ChevronDown, 
  CheckCircle2,
  XCircle
} from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from '@/components/Sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Data & Utilities
import { gameData } from '@/config/dummy-data';
import { formatPrice } from '@/config/format-price';
import { ProductsListSkeleton } from '@/components/Skeloton';

export default function AdminProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('games');
  const [games, setGames] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Get categories from game data
  const categories = gameData.categories || [];
  
  // Get all products from all games
  const allProducts = [];
  gameData.games.forEach(game => {
    if (game.products && Array.isArray(game.products)) {
      game.products.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          category.items.forEach(item => {
            allProducts.push({
              ...item,
              game: game.name,
              gameId: game.id,
              categoryName: category.category
            });
          });
        }
      });
    }
  });
  
  // Initialize data
  useEffect(() => {
    setGames(gameData.games);
    setProducts(allProducts);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter games based on search and category
  const filteredGames = games.filter(game => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = game.name.toLowerCase().includes(query);
      const matchesDeveloper = game.developer && game.developer.toLowerCase().includes(query);
      
      if (!matchesName && !matchesDeveloper) {
        return false;
      }
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      return game.categories && game.categories.includes(categoryFilter);
    }
    
    return true;
  });
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesGame = product.game.toLowerCase().includes(query);
      
      if (!matchesName && !matchesGame) {
        return false;
      }
    }
    
    // Apply category filter (in this case, by categoryName property)
    if (categoryFilter !== 'all') {
      return product.categoryName && product.categoryName.toLowerCase() === categoryFilter.toLowerCase();
    }
    
    return true;
  });
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    if (activeTab === 'games') {
      // Filter out the game to delete
      setGames(games.filter(game => game.id !== itemToDelete.id));
    } else {
      // Filter out the product to delete
      setProducts(products.filter(product => product.id !== itemToDelete.id));
    }
    
    // Close dialog and reset itemToDelete
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
  
  // Show delete confirmation dialog
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteDialog(true);
  };
  
  // Redirect if not authorized
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  // Show loading state
  if (status === 'loading' || isLoading) {
    return <ProductsListSkeleton />;
  }
  
  // Don't render for non-admins
  if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    return null;
  }
  
  return (
    <div>
      <Head>
        <title>Manage Products | Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your games and in-game products
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'games' ? (
              <Button onClick={() => router.push('/admin/products/add-game')}>
                <Plus className="mr-2 h-4 w-4" /> Add Game
              </Button>
            ) : (
              <Button onClick={() => router.push('/admin/products/add-product')}>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs 
            defaultValue="games" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="games" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>Games</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Products</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="games" className="m-0">
            {filteredGames.length > 0 ? (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Game</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Developer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Categories</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Products</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGames.map((game) => {
                        // Count total products
                        let productCount = 0;
                        if (game.products && Array.isArray(game.products)) {
                          game.products.forEach(category => {
                            if (category.items && Array.isArray(category.items)) {
                              productCount += category.items.length;
                            }
                          });
                        }
                        
                        return (
                          <tr key={game.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 rounded-md">
                                  <AvatarImage src={game.icon} alt={game.name} />
                                  <AvatarFallback className="rounded-md">
                                    {game.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{game.name}</p>
                                  <p className="text-xs text-muted-foreground">{game.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{game.developer || "-"}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {game.categories && game.categories.map((categoryId) => {
                                  const category = categories.find(c => c.id === categoryId);
                                  return category ? (
                                    <Badge key={categoryId} variant="outline" className="text-xs">
                                      {category.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{productCount}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>Active</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => router.push(`/games/${game.slug}`)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => router.push(`/admin/products/edit-game/${game.id}`)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive" onClick={() => confirmDelete(game)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No games found</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  {searchQuery || categoryFilter !== 'all' 
                    ? "No games match your search criteria. Try adjusting your filters."
                    : "You haven't added any games yet. Create your first game to get started."}
                </p>
                <Button onClick={() => router.push('/admin/products/add-game')}>
                  <Plus className="mr-2 h-4 w-4" /> Add Game
                </Button>
              </div>
            )}
            </TabsContent>
           
            <TabsContent value="products" className="m-0">
            {filteredProducts.length > 0 ? (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Game</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Discount</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-start gap-3">
                              <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                  <line x1="9" x2="15" y1="15" y2="15" />
                                  <line x1="9" x2="15" y1="9" y2="9" />
                                  <line x1="15" x2="15" y1="9" y2="15" />
                                  <line x1="9" x2="9" y1="9" y2="15" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description || "-"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{product.game}</td>
                          <td className="p-4 align-middle">{product.categoryName}</td>
                          <td className="p-4 align-middle">{formatPrice(product.price)}</td>
                          <td className="p-4 align-middle">
                            {product.discount && product.discount !== "0%" ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.discount}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/products/edit-product/${product.id}`)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => confirmDelete(product)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  {searchQuery || categoryFilter !== 'all' 
                    ? "No products match your search criteria. Try adjusting your filters."
                    : "You haven't added any products yet. Create your first product to get started."}
                </p>
                <Button onClick={() => router.push('/admin/products/add-product')}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            )}
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select 
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
        
         
        </div>
        
        {/* Export/Import Buttons */}
        <div className="flex justify-between mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <p>
              {activeTab === 'games' 
                ? `Showing ${filteredGames.length} of ${games.length} games`
                : `Showing ${filteredProducts.length} of ${products.length} products`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the{' '}
                {activeTab === 'games' ? 'game' : 'product'} from the database.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center bg-muted p-3 rounded-md">
              {activeTab === 'games' && itemToDelete && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={itemToDelete.icon} alt={itemToDelete.name} />
                    <AvatarFallback className="rounded-md">
                      {itemToDelete.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{itemToDelete.name}</p>
                    <p className="text-xs text-muted-foreground">{itemToDelete.id}</p>
                  </div>
                </div>
              )}
              {activeTab === 'products' && itemToDelete && (
                <div>
                  <p className="font-medium">{itemToDelete.name}</p>
                  <p className="text-xs text-muted-foreground">{itemToDelete.game} - {itemToDelete.id}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}



// Apply a custom layout to include the sidebar
AdminProducts.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};