import { ToastContainer } from 'react-toastify';
import Layout from '../components/layouts/Layout';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/hooks/useAuth';
import { DefaultSeo } from 'next-seo';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tifstore.com';
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  // useEffect(() => {
  //   // Analytic scripts or other global effects can go here
  // }, []);

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | TIF Store"
        defaultTitle="TIF Store | Top Up Game Favorite"
        description="Top up Game dengan harga terbaik. Aman, Mudah dan Terpercaya."
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          locale: 'id_ID',
          url: siteUrl,
          siteName: 'TIF Store',
          title: 'TIF Store | Top Up Aman Dan Mudah',
          description: 'Top up Game dengan harga terbaik.',
          images: [
            {
              url: `${siteUrl}/images/tif-store-og.png`,
              width: 1200,
              height: 630,
              alt: 'TIF Store',
            }
          ],
        }}
      />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <QueryProvider>
            <AuthProvider> 
              {getLayout(<Component {...pageProps} />)}
              <ToastContainer position="top-right" autoClose={3000} />
            </AuthProvider>
            </QueryProvider>
           
          </SessionProvider>
        </ThemeProvider>
      
    </>
  );
}

export default MyApp;