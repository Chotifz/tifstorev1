// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';


// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

    
//     useEffect(() => {
//       // Log untuk debugging
//       console.log('Session status:', status);
//       console.log('Session data:', session);

//       if (status == 'unauthenticated') {
//         router.replace('/login');
//       }
//     }, [status, router, session]);

//     // Tambahkan log tambahan
//     console.log('Current render status:', status);

//     if (status == 'loading') {
//       return (
//         <div className="flex justify-center items-center h-screen">
//           <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
//         </div>
//       );
//     }

//     if (status == 'authenticated') {
//       return <WrappedComponent {...props} />;
//     }

//     return null;
//   };
// };

// export default withAuth;


import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return (
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center mb-6">
            <Skeleton className="h-8 w-8 rounded-full mr-2" />
            <Skeleton className="h-6 w-24" />
          </div>
          
          <Skeleton className="h-64 w-full rounded-lg mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Skeleton className="h-10 w-full mb-6" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-10 w-full max-w-md mb-6" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>
      );
    }

    if (status === 'unauthenticated') {
      router.push(`/login?redirect=${router.asPath}`);
      return null;
    }

    return <Component {...props} />;
  };
}