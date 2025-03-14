import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ShoppingBag,
  Edit,
  Check,
  X,
  CheckCircle,
} from 'lucide-react';

// API & Hooks
import { useUser } from '@/hooks/queries/useUsers';
import { useUpdateUser } from '@/hooks/mutations/useUserMutations';
import { useToast } from "@/hooks/useToast";

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from '@/components/Sidebar';
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

export default function UserDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Fetch user data with TanStack Query
  const { 
    data: user, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useUser(id);
  
  // User update mutation
  const updateUserMutation = useUpdateUser();
  
  // Set initial form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || 'USER',
        status: user.status || 'active',
        emailNotifications: user.emailNotifications || false,
        smsNotifications: user.smsNotifications || false
      });
    }
  }, [user]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle toggle changes
  const handleToggleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Handle select changes
  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Save changes
  const handleSaveChanges = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id,
        ...formData
      });
      
      setIsEditing(false);
      refetch(); // Refresh user data
      
      toast({
        title: "Success",
        description: "User information updated successfully",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update user",
        variant: "destructive",
      });
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || 'USER',
        status: user.status || 'active',
        emailNotifications: user.emailNotifications || false,
        smsNotifications: user.smsNotifications || false
      });
    }
    setIsEditing(false);
  };
  
  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
  if (isLoading || !user) {
    return <UserDetailSkeleton />;
  }
  
  // Show error state
  if (isError) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            {error?.message || "Failed to load user details. Please try again."}
          </AlertDescription>
        </Alert>
        <Button 
          className="mt-4" 
          variant="outline" 
          onClick={() => router.push('/admin/users')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to User List
        </Button>
      </div>
    );
  }
  
  // Extract recent orders and login activity
  const recentOrders = user.recentOrders || [];
  const loginActivity = user.loginActivity || [];
  
  return (
    <>
      <Head>
        <title>User Details | Admin Dashboard</title>
        <meta name="description" content="User details in Admin dashboard" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/admin/users')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">User Details</h1>
              <p className="text-muted-foreground">View and manage user information</p>
            </div>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit User
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancelEdit}
                disabled={updateUserMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveChanges}
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column - User Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="text-xl font-semibold flex items-center justify-center">
                    {user.name}
                    {user.isVerified && (
                      <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                    )}
                    </h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="flex flex-col items-center gap-1 w-full">
                  {user.status === 'active' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                  )}
                  {user.status === 'pending' && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      Pending
                    </Badge>
                  )}
                  {user.status === 'suspended' && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      Suspended
                    </Badge>
                  )}
                  
                  {user.role === 'ADMIN' ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mt-1">Admin</Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1">User</Badge>
                  )}
                </div>
                
                <Separator />
                
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="ml-auto">{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Orders:</span>
                    <span className="ml-auto">{user.ordersCount || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Login:</span>
                    <span className="ml-auto">{user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : '-'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Column - Main Content */}
          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="activity">Login Activity</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>
                      {isEditing ? 'Edit user details' : 'Personal details and preferences'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="font-medium">{user.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="font-medium">{user.address || '-'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <>
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="role">User Role</Label>
                            <Select 
                              value={formData.role} 
                              onValueChange={(value) => handleSelectChange('role', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="status">Account Status</Label>
                            <Select 
                              value={formData.status} 
                              onValueChange={(value) => handleSelectChange('status', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="font-medium">{user.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="e.g., 08123456789"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="font-medium">{user.phone || '-'}</span>
                          </div>
                        )}
                      </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how the user receives notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about orders and promotions via email
                        </p>
                      </div>
                      {isEditing ? (
                        <Switch 
                          checked={formData.emailNotifications}
                          onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
                        />
                      ) : (
                        formData?.emailNotifications ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS text messages
                        </p>
                      </div>
                      {isEditing ? (
                        <Switch 
                          checked={formData.smsNotifications}
                          onCheckedChange={(checked) => handleToggleChange('smsNotifications', checked)}
                        />
                      ) : (
                        formData?.smsNotifications ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      Recent orders placed by this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                  <td className="p-2 align-middle font-medium">{order.orderNumber}</td>
                                  <td className="p-2 align-middle">{new Date(order.date).toLocaleDateString()}</td>
                                  <td className="p-2 align-middle">
                                    {order.items.map((item, idx) => (
                                      <div key={idx}>
                                        <div className="font-medium">{item.game}</div>
                                        <div className="text-xs text-muted-foreground">{item.product}</div>
                                      </div>
                                    ))}
                                  </td>
                                  <td className="p-2 align-middle">
                                    {new Intl.NumberFormat('id-ID', {
                                      style: 'currency',
                                      currency: 'IDR',
                                      minimumFractionDigits: 0
                                    }).format(order.totalAmount)}
                                  </td>
                                  <td className="p-2 align-middle">{getStatusBadge(order.status.toLowerCase())}</td>
                                  <td className="p-2 align-middle">{order.paymentMethod || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">This user hasn't placed any orders yet.</p>
                      </div>
                    )}
                  </CardContent>
                  {recentOrders.length > 0 && (
                    <CardFooter className="justify-between border-t pt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {recentOrders.length} recent orders
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/orders?userId=${id}`)}>
                        View All Orders
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Login Activity</CardTitle>
                    <CardDescription>
                      Recent login attempts and activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loginActivity.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date & Time</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">IP Address</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Device</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loginActivity.map((activity) => (
                                <tr key={activity.id} className="border-b transition-colors hover:bg-muted/50">
                                  <td className="p-2 align-middle">
                                    {new Date(activity.date).toLocaleDateString()}{' '}
                                    {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </td>
                                  <td className="p-2 align-middle font-mono text-xs">{activity.ipAddress}</td>
                                  <td className="p-2 align-middle">
                                    <div>
                                      <div>{activity.browser}</div>
                                      <div className="text-xs text-muted-foreground">{activity.device}</div>
                                    </div>
                                  </td>
                                  <td className="p-2 align-middle">{activity.location}</td>
                                  <td className="p-2 align-middle">
                                    {activity.status === 'success' ? (
                                      <div className="flex items-center">
                                        <Check className="mr-1 h-4 w-4 text-green-500" />
                                        <span>Success</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center">
                                        <X className="mr-1 h-4 w-4 text-red-500" />
                                        <span>Failed</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No login activity recorded for this user.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage account security and options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base font-medium">Reset Password</div>
                        <p className="text-sm text-muted-foreground">
                          Send a password reset link to the user's email
                        </p>
                      </div>
                      <Button variant="outline">Send Reset Link</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base font-medium text-destructive flex items-center">
                          <X className="h-4 w-4 mr-1" />
                          {user.status === 'suspended' ? 'Unsuspend Account' : 'Suspend Account'}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.status === 'suspended' ? 
                            'Restore user access to the platform' : 
                            'Temporarily block user access to the platform'}
                        </p>
                      </div>
                      {user.status === 'suspended' ? (
                        <Button 
                          variant="outline"
                          onClick={() => {
                            handleSelectChange('status', 'active');
                            handleSaveChanges();
                          }}
                        >
                          Unsuspend
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="text-destructive"
                          onClick={() => {
                            handleSelectChange('status', 'suspended');
                            handleSaveChanges();
                          }}
                        >
                          Suspend
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to get initials from name
function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// User Detail Skeleton loader
function UserDetailSkeleton() {
  return (
    <div className="p-8 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div>
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-40 mt-1" />
          </div>
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-md" />
        </div>
        
        {/* Right Column */}
        <div className="md:col-span-3 space-y-6">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-[300px] w-full rounded-md" />
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Apply a custom layout to include the sidebar
UserDetailPage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
}; 

