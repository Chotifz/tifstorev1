import { useRouter } from 'next/router';
import { gameData } from '@/config/dummy-data';
import { formatPrice } from '@/config/format-price';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, AlertTriangle, User, Hash } from 'lucide-react';

// ShadCN Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GameDetail() {
  const router = useRouter();
  const { gameId } = router.query;
  const [game, setGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Checkout form state
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (gameId) {
      // Find game based on ID or slug
      const foundGame = gameData.games.find(
        g => g.id.toLowerCase() === gameId.toLowerCase() || 
             g.name.toLowerCase().replace(/\s+/g, '-') === gameId.toLowerCase()
      );
      
      if (foundGame) {
        setGame(foundGame);
        if (foundGame.products && foundGame.products.length > 0) {
          setActiveCategory(foundGame.products[0].category);
        }
      } else {
        router.push('/games');
      }
      
      setLoading(false);
    }
  }, [gameId, router]);

  // Helper function to format category names nicely
  const formatCategoryName = (categoryId) => {
    return categoryId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Check if product is selected
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Payment methods
  const paymentMethods = [
    { id: 'dana', name: 'DANA', icon: '/images/method/dana2.png' },
    { id: 'ovo', name: 'OVO', icon: '/images/method/ovo2.png' },
    { id: 'gopay', name: 'GoPay', icon: '/images/method/gopay.png' },
    { id: 'qris', name: 'QRIS', icon: '/images/method/qris.png' },
    
    { id: 'alfamart', name: 'ALFAMART', icon: '/images/method/alfamart.png' },
    { id: 'shopeepay', name: 'SHOPEEPAY', icon: '/images/method/shoppepay2.png' },
    { id: 'linkaja', name: 'LINKAJA', icon: '/images/method/linkaja2.png' },
    { id: 'bri', name: 'BRI', icon: '/images/method/bri.png' },
  ];

  // Proceed to payment
  const handleProceedPayment = () => {
    // Here you would integrate with Midtrans
    alert('Proceeding to Midtrans payment gateway...');
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Skeleton className="h-8 w-8 rounded-full mr-2" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-full max-w-md mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 text-center">
        <Alert variant="destructive" className="mx-auto max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Game tidak ditemukan</AlertTitle>
          <AlertDescription>
            Game yang Anda cari tidak ditemukan atau telah dihapus.
          </AlertDescription>
        </Alert>
        <Button 
          variant="outline" 
          onClick={() => router.push('/games')}
          className="mt-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Game
        </Button>
      </div>
    );
  }

  // Product categories for this game
  const categories = game.products.map(category => ({
    id: category.category,
    name: formatCategoryName(category.category)
  }));

  return (
    <>
      <Head>
        <title>{`${game.name} - Top Up | TIF Store`}</title>
        <meta name="description" content={`Top up ${game.name} dengan harga terbaik. ${game.description}`} />
        <meta property="og:title" content={`${game.name} - Top Up | TIF Store`} />
        <meta property="og:description" content={`Top up ${game.name} dengan harga terbaik. ${game.description}`} />
        <meta property="og:image" content={game.banner} />
      </Head>
      
      <main className="max-w-7xl mx-auto py-6 px-4 text-sm">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0 text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Kembali
          </Button>
        </div>

        {/* Game header card */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Avatar className="h-16 w-16 rounded-lg border-2 border-primary-foreground/20 shadow-lg">
              <AvatarImage src={game.icon} alt={game.name} />
              <AvatarFallback className="rounded-lg bg-primary-foreground/10 text-primary-foreground font-bold text-lg">
                {game.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <span className="text-lg font-bold flex items-center">
                {game.name}
                <Badge 
                  variant="outline" 
                  className="ml-3 border-primary-foreground/30 text-primary-foreground/90 "
                >
                  {game.developer}
                </Badge>
              </span>
              <p className="opacity-90 max-w-xl text-sm">{game.description}</p>
              
              {/* Game categories */}
              <div className="flex flex-wrap gap-2 pt-1">
                {game.categories.map((catId) => {
                  const category = gameData.categories.find(c => c.id === catId);
                  return (
                    <Badge key={catId} variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                      {category ? category.name : catId}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        
       {/* Main content - Two columns layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Left Column - User ID, Server ID, Product Selection */}
  <div className="lg:col-span-2">
      {/* How to top up */}
  <Card className="border-border/40 mb-6">
  <CardContent className="p-4">
    <h2 className="font-semibold text-lg mb-4 flex items-center">
      <Info className="h-4 w-4 mr-2" />
      Cara Top Up {game.name}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="flex">
        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 mt-0.5 shrink-0">1</div>
        <div>
          <p className="font-medium text-foreground">Masukkan ID</p>
          <p className="text-muted-foreground">Masukkan User ID dan Server ID (jika diperlukan)</p>
        </div>
      </div>
      <div className="flex">
        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 mt-0.5 shrink-0">2</div>
        <div>
          <p className="font-medium text-foreground">Pilih Nominal</p>
          <p className="text-muted-foreground">Pilih nominal top up yang diinginkan</p>
        </div>
      </div>
      <div className="flex">
        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 mt-0.5 shrink-0">3</div>
        <div>
          <p className="font-medium text-foreground">Pilih Pembayaran</p>
          <p className="text-muted-foreground">Pilih metode pembayaran yang tersedia</p>
        </div>
      </div>
      <div className="flex">
        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 mt-0.5 shrink-0">4</div>
        <div>
          <p className="font-medium text-foreground">Selesaikan Pembayaran</p>
          <p className="text-muted-foreground">Produk akan masuk otomatis ke akun</p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

    <Card className="border-border/40 mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">1. Masukkan ID Game</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">
              <div className="flex items-center mb-1">
                <User className="h-4 w-4 mr-2" />
                User ID
              </div>
            </Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Masukkan User ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serverId">
              <div className="flex items-center mb-1">  
                <Hash className="h-4 w-4 mr-2" />
                Server ID
              </div>
            </Label>
            <Input
              id="serverId"
              value={serverId} 
              onChange={(e) => setServerId(e.target.value)}
              placeholder="Masukkan Server ID "
            />
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card className="border-border/40 mb-6">  
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">2. Pilih Nominal Top Up</h2>
        {/* Product categories tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory} 
          className="w-full"
        >
          <TabsList className="bg-muted/50 p-1 h-auto w-full mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex-1">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Products for each category */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="m-0 p-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {game.products
                  .find((cat) => cat.category === category.id)
                  ?.items.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-pointer relative"
                      onClick={() => handleProductSelect(item)}
                    >
                      <Card
                        className={`h-full border ${
                          selectedProduct?.id === item.id
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:border-primary/40"
                        } transition-all hover:shadow-sm`}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          {/* Badges for promo/tags */}
                          {item.tags && (
                            <div className="absolute -top-2 -right-2 flex space-x-1">
                              {item.tags.includes("promo") && (
                                <Badge variant="destructive" className="text-[10px] font-medium">
                                  Promo
                                </Badge>
                              )}
                              {item.tags.includes("terlaris") && (
                                <Badge variant="warning" className="text-[10px] font-medium">
                                  Terlaris 
                                </Badge>
                              )}
                              {item.tags.includes("limited") && (
                                <Badge variant="outline" className="text-[10px] font-medium">
                                  Limited
                                </Badge>
                              )}
                            </div>
                          )}

                          <h3 className="font-medium text-foreground mb-2">{item.name}</h3>

                          {/* Price with discount */}
                          <div className="mt-auto">
                            {item.discount !== "0%" && (
                              <div className="text-sm line-through text-muted-foreground mb-1">
                                {formatPrice(item.originalPrice)}
                              </div>
                            )}
                            <div className="font-bold text-base text-foreground">
                              {formatPrice(item.price)} 
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Selection indicator */}
                      {selectedProduct?.id === item.id && (
                        <div className="absolute top-0 right-0 h-5 w-5 bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>

    <Card className="border-border/40 mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">3. Pilih Metode Pembayaran</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id} 
              onClick={() => setPaymentMethod(method.id)}
              className={`cursor-pointer p-2 border rounded-md flex items-center justify-center ${
                paymentMethod === method.id 
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <img src={method.icon} alt={method.name} className="h-6 object-contain" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Right Column - Payment Method, Checkout */}
  <div>
    
    
    <Card className="border-border/40 sticky top-24">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">4. Checkout</h2>
        
        {/* Selected product */}
        {selectedProduct ? (
          <div className="bg-muted/40 p-3 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{game.name}</p>  
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(selectedProduct.price)}</p>
                {selectedProduct.discount !== "0%" && (
                  <div className="flex items-center text-xs">
                    <span className="line-through text-muted-foreground mr-1">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                    <Badge variant="success" className="text-[10px]">
                      {selectedProduct.discount}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Alert variant="default" className="bg-muted/40 border-muted mb-4">
            <AlertDescription>Silakan pilih produk terlebih dahulu</AlertDescription>
          </Alert>  
        )}
        
        {/* Email input */}
        <div className="space-y-2 mb-4">
          <Label htmlFor="email">Email (Opsional)</Label>
          <Input
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email Anda"
          />
          <p className="text-xs text-muted-foreground">
            Email digunakan untuk mengirim bukti pembayaran
          </p>
        </div>
        
        {/* Checkout button */}
        <Button 
          className="w-full" 
          size="lg"
          disabled={!selectedProduct || !userId || !paymentMethod}
          onClick={handleProceedPayment}
        >
          Bayar Sekarang
        </Button>

        {/* Security notice */}
        <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          Pembayaran aman &amp; terenkripsi
        </p>
      </CardContent>
    </Card>
  </div>
</div>
      </main>
    </>
  );
}



