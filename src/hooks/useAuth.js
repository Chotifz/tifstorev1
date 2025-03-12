import { useState, useEffect, createContext, useContext } from 'react'; 
import { useRouter } from 'next/router'; 
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const { data: session, status } = useSession();
   const router = useRouter();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Sinkronkan data sesi dengan lebih baik
   useEffect(() => {
     if (status == 'authenticated') {
       setUser(session?.user);
       setLoading(false);
       
       // Redirect dari halaman login jika sudah terautentikasi
       if (router.pathname === '/login') {
         router.push('/');
       }
     } else if (status === 'unauthenticated') {
       setUser(null);
       setLoading(false);
     } else if (status === 'loading') {
       setLoading(true);
     }
   }, [session, status, router]);

   const login = async (email, password) => {
     try {
       const result = await signIn('credentials', {
         redirect: false,
         email,
         password
       });
       
       if (result?.error) {
         return {
           success: false,
           error: result.error
         };
       }
       
       return { success: true };
     } catch (error) {
       return {
         success: false,
         error: error.message
       };
     }
   };

   const register = async ({ name, email, password, phone }) => {
     try {
       const response = await fetch('/api/auth/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ name, email, password, phone })
       });
       
       const data = await response.json();
       
       if (!response.ok) {
         return {
           success: false,
           error: data.message
         };
       }
       
       // Lakukan login otomatis setelah registrasi
       const loginResult = await signIn('credentials', {
         redirect: false,
         email,
         password
       });
       
       if (loginResult?.error) {
         return {
           success: false,
           error: loginResult.error
         };
       }
       
       return {
         success: true,
         user: data.user
       };
     } catch (error) {
       return {
         success: false,
         error: error.message
       };
     }
   };

   const logout = async () => {
     await signOut({
       redirect: false
     });
     router.push('/login');
   };

   // Nilai context
   const value = {
     user,
     loading,
     login,
     logout,
     register,
     isAuthenticated: !!user
   };

   return (
     <AuthContext.Provider value={value}>
       {children}
     </AuthContext.Provider>
   );
}

// Hook kustom untuk mengakses context autentikasi
export function useAuth() {
   const context = useContext(AuthContext);
   
   if (!context) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   
   return context;
}