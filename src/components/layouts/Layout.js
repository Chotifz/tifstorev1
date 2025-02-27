import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        {isAdminPage && <Sidebar />}
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}