import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Badge } from "@/components/ui/badge";
  import { Alert, AlertDescription } from "@/components/ui/alert";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import Sidebar from '@/components/Sidebar';
  import { Separator } from '@/components/ui/separator';
  
  // Utils
  import { formatPrice } from '@/config/format-price';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Download } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Eye } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Clock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
  
  export default function AdminOrders() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDialog, setShowOrderDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    // Mock data for orders
    const mockOrders = [
      {
        id: 'TRX12345678',
        orderNumber: 'TRX12345678',
        date: '2025-03-10T14:30:00.000Z',
        customer: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          image: null
        },
        game: 'Mobile Legends',
        product: '86 Diamonds',
        price: 19000,
        status: 'SUCCESS',
        paymentMethod: 'DANA',
        gameData: {
          userId: '123456789',
          serverId: '7890',
          productName: '86 Diamonds',
          gameName: 'Mobile Legends'
        }
      },
      {
        id: 'TRX12345679',
        orderNumber: 'TRX12345679',
        date: '2025-03-08T10:15:00.000Z',
        customer: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          image: null
        },
        game: 'PUBG Mobile',
        product: '325 UC',
        price: 79000,
        status: 'PENDING',
        paymentMethod: 'OVO',
        gameData: {
          userId: '567891234',
          serverId: '',
          productName: '325 UC',
          gameName: 'PUBG Mobile'
        }
      },
      {
        id: 'TRX12345680',
        orderNumber: 'TRX12345680',
        date: '2025-03-05T18:45:00.000Z',
        customer: {
          id: '4',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          image: null
        },
        game: 'Genshin Impact',
        product: 'Blessing of the Welkin Moon',
        price: 75000,
        status: 'SUCCESS',
        paymentMethod: 'GoPay',
        gameData: {
          userId: '987654321',
          serverId: '',
          productName: 'Blessing of the Welkin Moon',
          gameName: 'Genshin Impact'
        }
      },
      {
        id: 'TRX12345681',
        orderNumber: 'TRX12345681',
        date: '2025-03-01T09:30:00.000Z',
        customer: {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          image: null
        },
        game: 'Free Fire',
        product: '520 Diamonds',
        price: 75000,
        status: 'FAILED',
        paymentMethod: 'QRIS',
        gameData: {
          userId: '456789123',
          serverId: '',
          productName: '520 Diamonds',
          gameName: 'Free Fire'
        }
      },
      {
        id: 'TRX12345682',
        orderNumber: 'TRX12345682',
        date: '2025-02-28T13:20:00.000Z',
        customer: {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          image: null
        },
        game: 'Call of Duty Mobile',
        product: '400 CP',
        price: 73000,
        status: 'SUCCESS',
        paymentMethod: 'BCA',
        gameData: {
          userId: '123987456',
          serverId: '',
          productName: '400 CP',
          gameName: 'Call of Duty Mobile'
        }
      }
    ];
    
    // Initialize data
    useEffect(() => {
      setTimeout(() => {
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
        setIsLoading(false);
      }, 1000);
    }, []);
    
    // Apply filters when any filter or search changes
    useEffect(() => {
      let result = [...orders];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(order => 
          order.orderNumber.toLowerCase().includes(query) || 
          order.game.toLowerCase().includes(query) || 
          order.product.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query)
        );
      }
      
      // Apply status filter
      if (statusFilter !== 'all') {
        result = result.filter(order => order.status === statusFilter);
      }
      
      // Apply payment filter
      if (paymentFilter !== 'all') {
        result = result.filter(order => order.paymentMethod === paymentFilter);
      }
      
      // Apply date filter
      if (dateFilter !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        
        result = result.filter(order => {
          const orderDate = new Date(order.date);
          
          switch (dateFilter) {
            case 'today':
              return orderDate >= today;
            case 'yesterday':
              return orderDate >= yesterday && orderDate < today;
            case 'this-week':
              return orderDate >= weekAgo;
            case 'this-month':
              return orderDate >= monthAgo;
            default:
              return true;
          }
        });
      }
      
      setFilteredOrders(result);
    }, [searchQuery, statusFilter, paymentFilter, dateFilter, orders]);
    
    // Handle order view
    const handleViewOrder = (order) => {
      setSelectedOrder(order);
      setShowOrderDialog(true);
    };
    
    // Handle order status update
    const handleUpdateStatus = (orderId, newStatus) => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Update order in the state
        setOrders(prev => prev.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              status: newStatus
            };
          }
          return order;
        }));
        
        setSuccessMessage(`Order status successfully updated to ${newStatus}`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
        
        setIsLoading(false);
      }, 800);
    };
    
    // Get status badge/label based on status
    const getStatusBadge = (status) => {
      switch (status) {
        case 'SUCCESS':
          return (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              Success
            </Badge>
          );
        case 'PENDING':
          return (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
              Pending
            </Badge>
          );
        case 'PROCESSING':
          return (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Processing
            </Badge>
          );
        case 'FAILED':
          return (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
              Failed
            </Badge>
          );
        case 'REFUNDED':
          return (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
              Refunded
            </Badge>
          );
        default:
          return (
            <Badge variant="outline">
              {status}
            </Badge>
          );
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
    
    // Helper function to get initials from name
    const getInitials = (name) => {
      if (!name) return 'U';
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    };
    
    return (
      <>
        <Head>
          <title>Order Management | Admin Dashboard</title>
          <meta name="description" content="Manage orders in TIF Store admin dashboard" />
        </Head>
  
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
              <p className="text-muted-foreground">
                Manage and view all orders in the system
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Daily Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Weekly Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Monthly Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Success/Error Messages */}
          {successMessage && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
              <Select 
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={paymentFilter}
                onValueChange={setPaymentFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Payment Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Methods</SelectItem>
                  <SelectItem value="DANA">DANA</SelectItem>
                  <SelectItem value="OVO">OVO</SelectItem>
                  <SelectItem value="GoPay">GoPay</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-grow"></div>
            
            <Button variant="outline" size="icon" title="Refresh" disabled={isLoading}>
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          {/* Orders List */}
          {isLoading ? (
            <OrdersListSkeleton />
          ) : filteredOrders.length > 0 ? (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">
                          {order.orderNumber}
                        </td>
                        <td className="p-4 align-middle">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={order.customer.image} alt={order.customer.name} />
                              <AvatarFallback>{getInitials(order.customer.name)}</AvatarFallback>
                            </Avatar>
                            <span className="whitespace-nowrap">{order.customer.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{order.game}</div>
                            <div className="text-xs text-muted-foreground">{order.product}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle font-medium">
                          {formatPrice(order.price)}
                        </td>
                        <td className="p-4 align-middle">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="p-4 align-middle">
                          {order.paymentMethod}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {order.status === 'PENDING' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'PROCESSING')}>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Mark as Processing
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'SUCCESS')}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Success
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'FAILED')}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Mark as Failed
                                  </DropdownMenuItem>
                                </>
                              )}
                              {order.status === 'PROCESSING' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'SUCCESS')}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Success
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'FAILED')}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Mark as Failed
                                  </DropdownMenuItem>
                                </>
                              )}
                              {order.status === 'SUCCESS' && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'REFUNDED')}>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Mark as Refunded
                                </DropdownMenuItem>
                              )}
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
            <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
              <div className="bg-muted/40 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                {searchQuery || statusFilter !== 'all' || paymentFilter !== 'all' || dateFilter !== 'all'
                  ? "No orders match your search criteria. Try adjusting your filters."
                  : "There are no orders in the system yet."}
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPaymentFilter('all');
                setDateFilter('all');
              }}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {/* Export */}
          {filteredOrders.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Orders
              </Button>
            </div>
          )}
          
          {/* Order Details Dialog */}
          <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  Order #{selectedOrder?.orderNumber}
                </DialogDescription>
              </DialogHeader>
              
              {selectedOrder && (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order Information</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedOrder.date).toLocaleString()}
                      </p>
                    </div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium mb-1">Customer</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedOrder.customer.image} alt={selectedOrder.customer.name} />
                          <AvatarFallback>{getInitials(selectedOrder.customer.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{selectedOrder.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{selectedOrder.customer.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Payment</div>
                      <div>{selectedOrder.paymentMethod}</div>
                      <div className="text-sm font-semibold mt-1">{formatPrice(selectedOrder.price)}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium mb-2">Product Details</div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="font-medium text-base">{selectedOrder.game}</div>
                      <div className="text-sm text-muted-foreground mb-3">{selectedOrder.product}</div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">User ID:</div>
                          <div className="font-mono">{selectedOrder.gameData.userId}</div>
                        </div>
                        
                        {selectedOrder.gameData.serverId && (
                          <div>
                            <div className="text-muted-foreground">Server ID:</div>
                            <div className="font-mono">{selectedOrder.gameData.serverId}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.status === 'PENDING' && (
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, 'FAILED');
                          setShowOrderDialog(false);
                        }}
                        className="text-red-600"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button 
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, 'SUCCESS');
                          setShowOrderDialog(false);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
  
  function OrdersListSkeleton() {
    return (
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array(5).fill(0).map((_, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
//   // Apply a custom layout to include the sidebar
//   AdminOrders.getLayout = function getLayout(page) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 p-8 bg-background">
//           {page}
//         </div>
//       </div>
//     );
//   };import { useState, useEffect } from 'react';
//   import Head from 'next/head';
//   import { useRouter } from 'next/router';
//   import { useSession } from 'next-auth/react';
//   import { 
//     ShoppingCart, 
//     Search, 
//     Filter, 
//     RefreshCcw,
//     MoreHorizontal,
//     Eye,
//     Download,
//     FileText,
//     ChevronDown,
//     CalendarDays,
//     CreditCard,
//     Clock,
//     CheckCircle,
//     XCircle,
//     AlertTriangle
//   } from 'lucide-react';
  
//   // Components
//   import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
//   import { Button } from "@/components/ui/button";
//   import { Input } from "@/components/ui/input";
//   import { 
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from