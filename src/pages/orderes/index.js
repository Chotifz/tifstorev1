import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  User,
  Bell,
  Shield,
  LogOut,
  ChevronLeft,
  Search,
  Calendar,
  Download,
  Copy,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Info
} from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all-time");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock orders data
  const orders = [
    {
      id: "TRX12345678",
      date: "10 Mar 2025, 14:30",
      game: "Mobile Legends",
      product: "86 Diamonds",
      price: 19000,
      status: "success",
      paymentMethod: "DANA",
      userId: "123456789",
      serverId: "7890",
      email: "john.doe@example.com"
    },
    {
      id: "TRX12345679",
      date: "8 Mar 2025, 10:15",
      game: "PUBG Mobile",
      product: "325 UC",
      price: 79000,
      status: "pending",
      paymentMethod: "OVO",
      userId: "567891234",
      serverId: "",
      email: "john.doe@example.com"
    },
    {
      id: "TRX12345680",
      date: "5 Mar 2025, 18:45",
      game: "Genshin Impact",
      product: "Blessing of the Welkin Moon",
      price: 75000,
      status: "success",
      paymentMethod: "GoPay",
      userId: "987654321",
      serverId: "",
      email: "john.doe@example.com"
    },
    {
      id: "TRX12345681",
      date: "1 Mar 2025, 09:30",
      game: "Free Fire",
      product: "520 Diamonds",
      price: 75000,
      status: "failed",
      paymentMethod: "QRIS",
      userId: "456789123",
      serverId: "",
      email: "john.doe@example.com"
    }
  ];

  // Filter orders based on current filters
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.game.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Handle order selection
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return <Badge variant="success" className="capitalize">Sukses</Badge>;
      case "pending":
        return <Badge variant="warning" className="capitalize">Menunggu</Badge>;
      case "failed":
        return <Badge variant="destructive" className="capitalize">Gagal</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "pending":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <>
      <Head>
        <title>Riwayat Pesanan | TIF Store</title>
        <meta name="description" content="Lihat riwayat pesanan Anda di TIF Store" />
      </Head>
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="pl-0 mr-4"
            onClick={() => router.push("/profile")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
          <Card className="overflow-hidden">
  <div className="flex flex-col">
    <Button 
      variant="ghost" 
      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
      onClick={() => router.push("/profile")}
    >
      <User className="mr-2 h-4 w-4" />
      Profil
    </Button>
    <Button 
      variant="default" 
      className="justify-start rounded-none border-l-2 px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
      Pesanan
    </Button>
    <Button 
      variant="ghost" 
      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
      onClick={() => router.push("/profile?tab=notifications")}
    >
      <Bell className="mr-2 h-4 w-4" />
      Notifikasi
    </Button>
    <Button 
      variant="ghost" 
      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
      onClick={() => router.push("/profile?tab=security")}
    >
      <Shield className="mr-2 h-4 w-4" />
      Keamanan
    </Button>
    <Separator />
    <Button 
      variant="ghost" 
      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 h-auto font-normal text-base hover:bg-muted/50 text-destructive hover:text-destructive"
      onClick={() => router.push("/login")}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  </div>
</Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Filter Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Status</div>
                  <Select 
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Semua status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="success">Sukses</SelectItem>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="failed">Gagal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Rentang Waktu</div>
                  <Select 
                    value={dateRange}
                    onValueChange={setDateRange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rentang waktu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">Semua</SelectItem>
                      <SelectItem value="today">Hari ini</SelectItem>
                      <SelectItem value="this-week">Minggu ini</SelectItem>
                      <SelectItem value="this-month">Bulan ini</SelectItem>
                      <SelectItem value="last-month">Bulan lalu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <CardTitle>Riwayat Transaksi</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cari ID transaksi atau game..."
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredOrders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-primary/40 hover:bg-muted/20 transition-all cursor-pointer"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        <div className="flex-1 mb-3 md:mb-0">
                          <div className="flex items-center">
                            <div className="font-medium">{order.id}</div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1" onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(order.id);
                            }}>
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="text-sm mt-1">
                            <span className="text-muted-foreground">{order.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 mb-3 md:mb-0">
                          <div className="font-medium">{order.game}</div>
                          <div className="text-sm text-muted-foreground">{order.product}</div>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                          <div className="font-semibold">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(order.price)}
                          </div>
                          <Dialog>
                            <DialogTrigger asChild onClick={(e) => {
                              e.stopPropagation();
                              handleViewOrderDetails(order);
                            }}>
                              <Button variant="ghost" size="icon" className="ml-4">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle className="flex items-center">
                                  Detail Transaksi
                                  <span className="ml-2">{getStatusBadge(selectedOrder?.status)}</span>
                                </DialogTitle>
                                <DialogDescription>
                                  ID Transaksi: {selectedOrder?.id}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-4 py-4">
                                <div className="flex justify-center mb-4">
                                  {selectedOrder && getStatusIcon(selectedOrder.status)}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-muted-foreground">Game:</div>
                                  <div className="font-medium">{selectedOrder?.game}</div>
                                  
                                  <div className="text-muted-foreground">Produk:</div>
                                  <div className="font-medium">{selectedOrder?.product}</div>
                                  
                                  <div className="text-muted-foreground">Harga:</div>
                                  <div className="font-medium">
                                    {selectedOrder && new Intl.NumberFormat('id-ID', {
                                      style: 'currency',
                                      currency: 'IDR',
                                      minimumFractionDigits: 0
                                    }).format(selectedOrder.price)}
                                  </div>
                                  
                                  <div className="text-muted-foreground">Metode Pembayaran:</div>
                                  <div className="font-medium">{selectedOrder?.paymentMethod}</div>
                                  
                                  <div className="text-muted-foreground">Tanggal:</div>
                                  <div className="font-medium">{selectedOrder?.date}</div>
                                  
                                  <div className="text-muted-foreground">User ID:</div>
                                  <div className="font-medium">{selectedOrder?.userId}</div>
                                  
                                  {selectedOrder?.serverId && (
                                    <>
                                      <div className="text-muted-foreground">Server ID:</div>
                                      <div className="font-medium">{selectedOrder?.serverId}</div>
                                    </>
                                  )}
                                  
                                  <div className="text-muted-foreground">Email:</div>
                                  <div className="font-medium">{selectedOrder?.email}</div>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" className="w-full sm:w-auto">
                                  <Download className="mr-2 h-4 w-4" />
                                  Invoice
                                </Button>
                                {selectedOrder?.status === "failed" && (
                                  <Button className="w-full sm:w-auto">
                                    Coba Lagi
                                  </Button>
                                )}
                                {selectedOrder?.status === "pending" && (
                                  <Button className="w-full sm:w-auto">
                                    Bayar Sekarang
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Tidak ada pesanan</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      {searchQuery
                        ? `Tidak ada pesanan yang cocok dengan pencarian "${searchQuery}"`
                        : filterStatus !== "all"
                        ? `Tidak ada pesanan dengan status "${filterStatus}"`
                        : "Anda belum memiliki pesanan"}
                    </p>
                    {searchQuery || filterStatus !== "all" ? (
                      <Button variant="outline" onClick={() => {
                        setSearchQuery("");
                        setFilterStatus("all");
                      }}>
                        Reset Filter
                      </Button>
                    ) : (
                      <Button onClick={() => router.push("/")}>
                        Mulai Belanja
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
              {filteredOrders.length > 0 && (
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Menampilkan {filteredOrders.length} dari {orders.length} transaksi
                  </div>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Download className="mr-2 h-4 w-4" />
                    Download Semua
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            {/* Additional helpful card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Bantuan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                    <div className="text-sm">
                      <p className="font-medium">Masalah dengan pesanan?</p>
                      <p className="text-muted-foreground">Jika pesanan Anda belum masuk setelah 15 menit, silakan hubungi customer service kami.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                    <div className="text-sm">
                      <p className="font-medium">Harga berbeda?</p>
                      <p className="text-muted-foreground">Harga dapat berubah sewaktu-waktu berdasarkan kebijakan dari pihak game.</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Hubungi Customer Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}