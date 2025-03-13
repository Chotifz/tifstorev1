import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  ChevronLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShoppingBag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  Download,
  RefreshCcw,
  Send,
  ExternalLink
} from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Sidebar from '@/components/Sidebar';

// Utils
import { formatPrice } from '@/config/format-price';

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [newStatus, setNewStatus] = useState('');
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSendEmailDialog, setShowSendEmailDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  // Mock order data
  const mockOrder = {
    id: 'TRX12345678',
    orderNumber: 'TRX12345678',
    date: '2025-03-10T14:30:00.000Z',
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '08123456789',
      image: null
    },
    game: 'Mobile Legends',
    product: '86 Diamonds',
    price: 19000,
    status: 'SUCCESS',
    paymentMethod: 'DANA',
    paymentId: 'PAY123456789',
    gameData: {
      userId: '123456789',
      serverId: '7890',
      productName: '86 Diamonds',
      gameName: 'Mobile Legends'
    },
    timeline: [
      {
        status: 'PENDING',
        date: '2025-03-10T14:25:00.000Z',
        note: 'Order created'
      },
      {
        status: 'PROCESSING',
        date: '2025-03-10T14:27:00.000Z',
        note: 'Payment received, processing order'
      },
      {
        status: 'SUCCESS',
        date: '2025-03-10T14:30:00.000Z',
        note: 'Order completed successfully'
      }
    ]
  };
  
  // Load order data
  useEffect(() => {
    if (id) {
      // In a real app, you'd fetch order data from API
      setTimeout(() => {
        setOrder(mockOrder);
        setNewStatus(mockOrder.status);
        setIsLoading(false);
      }, 800);
    }
  }, [id]);
  
  // Handle status update
  const handleUpdateStatus = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add to timeline
      const updatedTimeline = [
        ...order.timeline,
        {
          status: newStatus,
          date: new Date().toISOString(),
          note: statusNote || `Status updated to ${newStatus}`
        }
      ];
      
      // Update order
      setOrder({
        ...order,
        status: newStatus,
        timeline: updatedTimeline
      });
      
      setShowStatusDialog(false);
      setStatusNote('');
      setSuccessMessage(`Order status successfully updated to ${newStatus}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsLoading(false);
    }, 800);
  };
  
  // Handle sending email
  const handleSendEmail = () => {
    if (!emailSubject || !emailBody) {
      setErrorMessage('Please fill in both subject and message');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowSendEmailDialog(false);
      setSuccessMessage(`Email sent to ${order.customer.email}`);
      setEmailSubject('');
      setEmailBody('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsLoading(false);
    }, 800);
  };
  
  // Auto-populate email fields based on status
  useEffect(() => {
    if (showSendEmailDialog && order) {
      // Different templates based on status
      let subject = '';
      let body = '';
      
      switch (order.status) {
        case 'SUCCESS':
          subject = `Your TIF Store order ${order.orderNumber} has been completed`;
          body = `Dear ${order.customer.name},\n\nThank you for your purchase. Your order #${order.orderNumber} for ${order.product} (${order.game}) has been successfully processed and delivered to your account.\n\nIf you have any questions or concerns, please don't hesitate to contact us.\n\nBest regards,\nTIF Store Team`;
          break;
        case 'PENDING':
          subject = `Action required for your TIF Store order ${order.orderNumber}`;
          body = `Dear ${order.customer.name},\n\nThank you for your order #${order.orderNumber} for ${order.product} (${order.game}).\n\nYour order is currently pending. Please complete the payment as soon as possible to avoid delays in processing.\n\nBest regards,\nTIF Store Team`;
          break;
        case 'FAILED':
          subject = `Issue with your TIF Store order ${order.orderNumber}`;
          body = `Dear ${order.customer.name},\n\nUnfortunately, there was an issue with your order #${order.orderNumber} for ${order.product} (${order.game}).\n\nPlease contact our support team for assistance.\n\nBest regards,\nTIF Store Team`;
          break;
        default:
          subject = `Update on your TIF Store order ${order.orderNumber}`;
          body = `Dear ${order.customer.name},\n\nThis is an update regarding your order #${order.orderNumber} for ${order.product} (${order.game}).\n\nBest regards,\nTIF Store Team`;
      }
      
      setEmailSubject(subject);
      setEmailBody(body);
    }
  }, [showSendEmailDialog, order]);
  
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
  
  // Show loading state
  if (isLoading && !order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
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
        <title>Order Details | Admin Dashboard</title>
        <meta name="description" content="Order details in TIF Store admin dashboard" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/admin/orders')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
              <p className="text-muted-foreground">Order #{order.orderNumber}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSendEmailDialog(true)}>
              <Send className="mr-2 h-4 w-4" />
              Email Customer
            </Button>
            <Button onClick={() => setShowStatusDialog(true)}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Update Status
            </Button>
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
        
        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Status and Customer */}
          <div className="space-y-6">
            {/* Order Status Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Status</span>
                  {getStatusBadge(order.status)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm text-muted-foreground">Order Date</dt>
                    <dd className="text-sm font-medium">
                      {new Date(order.date).toLocaleString()}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm text-muted-foreground">Payment Method</dt>
                    <dd className="text-sm font-medium">{order.paymentMethod}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm text-muted-foreground">Payment ID</dt>
                    <dd className="text-sm font-medium font-mono">{order.paymentId}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm text-muted-foreground">Total</dt>
                    <dd className="text-base font-bold">{formatPrice(order.price)}</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              </CardFooter>
            </Card>
            
            {/* Customer Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={order.customer.image} alt={order.customer.name} />
                    <AvatarFallback>{getInitials(order.customer.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                  </div>
                </div>
                
                <dl className="divide-y">
                  <div className="py-3 flex gap-2">
                    <dt className="text-sm text-muted-foreground"><Mail className="h-4 w-4" /></dt>
                    <dd className="text-sm">{order.customer.email}</dd>
                  </div>
                  {order.customer.phone && (
                    <div className="py-3 flex gap-2">
                      <dt className="text-sm text-muted-foreground"><Phone className="h-4 w-4" /></dt>
                      <dd className="text-sm">{order.customer.phone}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => router.push(`/admin/users/${order.customer.id}`)}
                >
                  <User className="mr-2 h-4 w-4" />
                  View Customer
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right Column - Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Order Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>
                      Details about the purchased product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-md space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.game}</h3>
                        <p className="text-muted-foreground">{order.product}</p>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">User ID</div>
                          <div className="font-mono text-sm bg-background border rounded-md px-3 py-2">
                            {order.gameData.userId}
                          </div>
                        </div>
                        
                        {order.gameData.serverId && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Server ID</div>
                            <div className="font-mono text-sm bg-background border rounded-md px-3 py-2">
                              {order.gameData.serverId}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Game
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>
                      Information about the payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Amount</div>
                        <div className="font-semibold text-lg">{formatPrice(order.price)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Method</div>
                        <div className="font-medium">{order.paymentMethod}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <div>{getStatusBadge(order.status)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Payment ID</div>
                        <div className="font-mono text-sm">{order.paymentId}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Action Buttons for Different Statuses */}
                {order.status === 'PENDING' && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setNewStatus('FAILED');
                        setShowStatusDialog(true);
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Order
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setNewStatus('SUCCESS');
                        setShowStatusDialog(true);
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Order
                    </Button>
                  </div>
                )}
                
                {order.status === 'PROCESSING' && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setNewStatus('FAILED');
                        setShowStatusDialog(true);
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Mark as Failed
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setNewStatus('SUCCESS');
                        setShowStatusDialog(true);
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Complete
                    </Button>
                  </div>
                )}
                
                {order.status === 'SUCCESS' && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setNewStatus('REFUNDED');
                      setShowStatusDialog(true);
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Refund
                  </Button>
                )}
              </TabsContent>
              
              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                    <CardDescription>
                      History of order status changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="relative border-l border-muted">
                      {order.timeline.map((item, index) => (
                        <li className="mb-6 ml-6" key={index}>
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-background">
                            {item.status === 'SUCCESS' && <CheckCircle className="w-3 h-3 text-green-500" />}
                            {item.status === 'FAILED' && <XCircle className="w-3 h-3 text-red-500" />}
                            {item.status === 'PENDING' && <Clock className="w-3 h-3 text-yellow-500" />}
                            {item.status === 'PROCESSING' && <RefreshCcw className="w-3 h-3 text-blue-500" />}
                            {item.status === 'REFUNDED' && <CreditCard className="w-3 h-3 text-gray-500" />}
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            <time className="block text-xs font-normal leading-none text-muted-foreground">
                              {new Date(item.date).toLocaleString()}
                            </time>
                          </div>
                          <p className="text-sm font-normal text-muted-foreground mt-1">
                            {item.note}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Add Note</CardTitle>
                    <CardDescription>
                      Add a note to the order timeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Enter a note about this order..." 
                      className="resize-none"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      Add Note
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Update Status Dialog */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>
                Change the status of order #{order.orderNumber}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={setNewStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SUCCESS">Success</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add a note about this status change"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Send Email Dialog */}
        <Dialog open={showSendEmailDialog} onOpenChange={setShowSendEmailDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Email Customer</DialogTitle>
              <DialogDescription>
                Send an email to {order.customer.email}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Email message"
                  rows={10}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSendEmailDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

// Apply a custom layout to include the sidebar
OrderDetailPage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};