import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Package, Users, Settings, BarChart } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();
  
  const isActive = (path) => {
    return router.pathname === path;
  };
  
  return (
    <div className="w-64 h-full border-r border-border/60 bg-background flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <Link href="/admin">
          <div className={`flex items-center p-2 rounded-md ${isActive('/admin') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <Home className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </div>
        </Link>
        
        <Link href="/admin/products">
          <div className={`flex items-center p-2 rounded-md ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <Package className="h-5 w-5 mr-3" />
            <span>Products</span>
          </div>
        </Link>
        
        <Link href="/admin/users">
          <div className={`flex items-center p-2 rounded-md ${isActive('/admin/users') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <Users className="h-5 w-5 mr-3" />
            <span>Users</span>
          </div>
        </Link>
        
        <Link href="/admin/orders">
          <div className={`flex items-center p-2 rounded-md ${isActive('/admin/orders') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <BarChart className="h-5 w-5 mr-3" />
            <span>Orders</span>
          </div>
        </Link>
        
        <Link href="/admin/settings">
          <div className={`flex items-center p-2 rounded-md ${isActive('/admin/settings') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </div>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-border/60">
        <div className="text-xs text-muted-foreground">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;