import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCcw,
  MoreHorizontal,
  Edit,
  Trash2,
  EyeOff,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Download,
  ChevronDown,
  Mail,
  Clock,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function AdminUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data for users
  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      isVerified: true,
      joinDate: '2025-01-15T10:30:45.000Z',
      lastLoginDate: '2025-03-12T08:15:22.000Z',
      image: null,
      status: 'active',
      ordersCount: 12,
      phone: '08123456789',
      address: 'Jl. Sudirman No. 123, Jakarta'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'ADMIN',
      isVerified: true,
      joinDate: '2025-01-20T14:22:33.000Z',
      lastLoginDate: '2025-03-13T09:45:12.000Z',
      image: null,
      status: 'active',
      ordersCount: 3,
      phone: '08567891234',
      address: 'Jl. Gatot Subroto No. 45, Jakarta'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'USER',
      isVerified: false,
      joinDate: '2025-02-05T09:15:27.000Z',
      lastLoginDate: null,
      image: null,
      status: 'pending',
      ordersCount: 0,
      phone: null,
      address: null
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'USER',
      isVerified: true,
      joinDate: '2025-02-10T16:48:19.000Z',
      lastLoginDate: '2025-03-10T12:33:45.000Z',
      image: null,
      status: 'active',
      ordersCount: 5,
      phone: '08123987456',
      address: 'Jl. Thamrin No. 88, Jakarta'
    },
    {
      id: '5',
      name: 'David Lee',
      email: 'david@example.com',
      role: 'USER',
      isVerified: true,
      joinDate: '2025-01-12T08:22:15.000Z',
      lastLoginDate: '2025-03-01T17:11:33.000Z',
      image: null,
      status: 'suspended',
      ordersCount: 8,
      phone: '08789456123',
      address: 'Jl. Asia Afrika No. 15, Bandung'
    }
  ];
  
  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Apply filters when any filter or search changes
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query) ||
        (user.phone && user.phone.includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [searchQuery, statusFilter, roleFilter, users]);
  
  // Handle user deletion
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };
  
  // Confirm user deletion
  const confirmDelete = () => {
    if (!userToDelete) return;
    
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      // Remove the user from the state
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      setShowDeleteDialog(false);
      setUserToDelete(null);
      setSuccessMessage('User successfully deleted');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsLoading(false);
    }, 800);
  };
  
  // Open edit user dialog
  const handleEditUser = (user) => {
    setUserToEdit({
      ...user,
      newRole: user.role,
      newStatus: user.status
    });
    setShowEditDialog(true);
  };
  
  // Handle edit user form changes
  const handleEditChange = (field, value) => {
    setUserToEdit({
      ...userToEdit,
      [field]: value
    });
  };
  
  // Save user changes
  const saveUserChanges = () => {
    if (!userToEdit) return;
    
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      // Update user in the state
      setUsers(prev => prev.map(u => {
        if (u.id === userToEdit.id) {
          return {
            ...u,
            role: userToEdit.newRole,
            status: userToEdit.newStatus
          };
        }
        return u;
      }));
      
      setShowEditDialog(false);
      setUserToEdit(null);
      setSuccessMessage('User successfully updated');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsLoading(false);
    }, 800);
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
        <title>User Management | Admin Dashboard</title>
        <meta name="description" content="Manage users in TIF Store admin dashboard" />
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage and view all users in the system
            </p>
          </div>
          <Button onClick={() => router.push('/admin/users/add')}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
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
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-grow"></div>
          
          <Button variant="outline" size="icon" title="Refresh" disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {/* Users List */}
        {isLoading ? (
          <UsersListSkeleton />
        ) : filteredUsers.length > 0 ? (
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-1">
                              {user.name}
                              {user.isVerified && (
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.ordersCount} orders
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">
                        {user.role === 'ADMIN' ? (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
                        ) : (
                          <Badge variant="outline">User</Badge>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        {user.status === 'active' && (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Active</span>
                          </div>
                        )}
                        {user.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span>Pending</span>
                          </div>
                        )}
                        {user.status === 'suspended' && (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span>Suspended</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(user.joinDate).toLocaleDateString()}
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
                            <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}>
                              <Users className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem onClick={() => handleEditChange('newStatus', 'suspended')}>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleEditChange('newStatus', 'active')}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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
          <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
            <div className="rounded-full bg-muted/40 p-3 mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No users found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                ? "No users match your search criteria. Try adjusting your filters."
                : "You haven't added any users yet."}
            </p>
            <Button onClick={() => router.push('/admin/users/add')}>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        )}
        
        {/* Export */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        )}
        
        {/* Delete User Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the user
                account and all associated data.
              </DialogDescription>
            </DialogHeader>
            
            {userToDelete && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userToDelete.image} alt={userToDelete.name} />
                  <AvatarFallback>{getInitials(userToDelete.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{userToDelete.name}</div>
                  <div className="text-sm text-muted-foreground">{userToDelete.email}</div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit User Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user role and status
              </DialogDescription>
            </DialogHeader>
            
            {userToEdit && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userToEdit.image} alt={userToEdit.name} />
                    <AvatarFallback>{getInitials(userToEdit.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{userToEdit.name}</div>
                    <div className="text-sm text-muted-foreground">{userToEdit.email}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select 
                    value={userToEdit.newRole} 
                    onValueChange={(value) => handleEditChange('newRole', value)}
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
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={userToEdit.newStatus} 
                    onValueChange={(value) => handleEditChange('newStatus', value)}
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
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveUserChanges}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

function UsersListSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16 mt-1" />
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-24" />
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

// Apply a custom layout to include the sidebar
AdminUsers.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};