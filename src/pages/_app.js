import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '../components/layouts/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';



function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    // Analytic scripts or other global effects can go here
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;