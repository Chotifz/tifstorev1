import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart4,
  Clock
} from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from '@/components/Sidebar';

// Utils
import { formatPrice } from '@/config/format-price';
import { AdminSkeleton } from '@/components/Skeloton';


// Sample data for the dashboard
const mockRecentOrders = [
  {
    id: 'TRX12345678',
    customer: 'John Doe',
    game: 'Mobile Legends',
    product: '86 Diamonds',
    price: 19000,
    status: 'success',
    date: '10 Mar 2025, 14:30'
  },
  {
    id: 'TRX12345679',
    customer: 'Jane Smith',
    game: 'PUBG Mobile',
    product: '325 UC',
    price: 79000,
    status: 'pending',
    date: '8 Mar 2025, 10:15'
  },
  {
    id: 'TRX12345680',
    customer: 'Mike Johnson',
    game: 'Genshin Impact',
    product: 'Blessing of the Welkin Moon',
    price: 75000,
    status: 'success',
    date: '5 Mar 2025, 18:45'
  },
  {
    id: 'TRX12345681',
    customer: 'Sarah Williams',
    game: 'Free Fire',
    product: '520 Diamonds',
    price: 75000,
    status: 'failed',
    date: '1 Mar 2025, 09:30'
  }
];

const mockUsers = [
  { name: 'John Doe', email: 'john@example.com', date: '10 Mar 2025', status: 'active' },
  { name: 'Jane Smith', email: 'jane@example.com', date: '8 Mar 2025', status: 'active' },
  { name: 'Mike Johnson', email: 'mike@example.com', date: '5 Mar 2025', status: 'pending' },
];

const mockTopProducts = [
  { name: 'Mobile Legends - 86 Diamonds', sales: 152, revenue: 2888000 },
  { name: 'PUBG Mobile - 325 UC', sales: 98, revenue: 7742000 },
  { name: 'Genshin Impact - Welkin Moon', sales: 76, revenue: 5700000 },
  { name: 'Free Fire - 520 Diamonds', sales: 65, revenue: 4875000 },
  { name: 'Call of Duty Mobile - 400 CP', sales: 54, revenue: 3942000 },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authorized
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading' || isLoading) {
    return <AdminDashboardSkeleton />;
  }

  // Don't render the dashboard for non-admins
  if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    return null;
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize">Sukses</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 capitalize">Menunggu</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 capitalize">Gagal</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | TIF Store</title>
        <meta name="description" content="Admin dashboard for TIF Store" />
      </Head>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Hi, {session?.user?.name || 'Admin'}</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>{session?.user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pendapatan</p>
                  <h3 className="text-2xl font-bold">{formatPrice(25227000)}</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    12% dari bulan lalu
                  </p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pesanan</p>
                  <h3 className="text-2xl font-bold">445</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    8% dari bulan lalu
                  </p>
                </div>
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pengguna</p>
                  <h3 className="text-2xl font-bold">1,250</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15% dari bulan lalu
                  </p>
                </div>
                <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sukses Rate</p>
                  <h3 className="text-2xl font-bold">94.7%</h3>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    2.1% dari bulan lalu
                  </p>
                </div>
                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Pendapatan</CardTitle>
                <CardDescription>Pendapatan bulanan tahun 2025</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Placeholder for chart - in a real app, use recharts or other chart library */}
                <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full flex">
                    {['Jan', 'Feb', 'Mar'].map((month, i) => {
                      const heights = ['h-1/2', 'h-3/4', 'h-2/3'];
                      const bars = [50, 75, 66]; // percentages
                      return (
                        <div key={month} className="flex-1 flex flex-col justify-end items-center p-1">
                          <div 
                            className={`w-4/5 bg-primary/80 rounded-t-sm`} 
                            style={{ height: `${bars[i]}%` }}
                          ></div>
                          <div className="text-xs mt-2 text-muted-foreground">{month}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pesanan Terbaru</CardTitle>
                    <CardDescription>Pesanan yang masuk 7 hari terakhir</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Lihat Semua
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Game</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Pengguna</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Harga</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {mockRecentOrders.map((order) => (
                          <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">
                              <span className="font-medium">{order.id.slice(-6)}</span>
                            </td>
                            <td className="p-4 align-middle">
                              <div>
                                <p className="font-medium">{order.game}</p>
                                <p className="text-xs text-muted-foreground">{order.product}</p>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{order.customer}</td>
                            <td className="p-4 align-middle">{formatPrice(order.price)}</td>
                            <td className="p-4 align-middle">{getStatusBadge(order.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Produk</CardTitle>
                <CardDescription>Berdasarkan penjualan bulan ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-muted-foreground w-5">{index + 1}.</span>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Terjual: {product.sales}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(product.revenue)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

      
          
          </div>
        </div>
      </div>
    </>
  );
}

function AdminDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array(4).fill(null).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

     <AdminSkeleton />
    </div>
  );
}

// Apply a custom layout to include the sidebar
AdminDashboard.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};