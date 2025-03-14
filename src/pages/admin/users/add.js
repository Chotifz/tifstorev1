import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ChevronLeft, UserPlus } from 'lucide-react';

// Components
import { Button } from "@/components/ui/button";

import Sidebar from '@/components/Sidebar';
import UserForm from '@/components/UserForm';

export default function AddUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <title>Add User | Admin Dashboard</title>
        <meta name="description" content="Add a new user to the system" />
      </Head>

      <div className="space-y-6">
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
              <h1 className="text-2xl font-bold tracking-tight">Add New User</h1>
              <p className="text-muted-foreground">Create a new user account</p>
            </div>
          </div>
        </div>

        <UserForm mode="create" />
      </div>
    </>
  );
}

// Apply a custom layout to include the sidebar
AddUserPage.getLayout = function getLayout(page) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-background">
        {page}
      </div>
    </div>
  );
};