import { useRouter } from 'next/router'; 
import Header from './Header'; 
import Footer from './Footer'; 
import Sidebar from './Sidebar'; 
import { Inter, Poppins } from 'next/font/google'; 
import { ThemeProvider } from '../ThemeProvider';  

const inter = Inter({   subsets: ['latin'],   weight: ['400', '700'],   display: 'swap', });  
const poppins = Poppins({   subsets: ['latin'],   weight: ['400', '600'],   display: 'swap', });  

export default function Layout({ children }) {  
  const router = useRouter();  
  const isAdminPage = router.pathname.startsWith('/admin');      
  return (        
    <div className={`min-h-screen flex flex-col ${poppins.className} `}> 
      <Header />       
      <div className="w-full flex-grow flex">   
              {isAdminPage && <Sidebar />}        
               <main className="w-full flex-grow p-4 mx-auto">           {children}        
               </main>       
                 
      </div>      
      <Footer />        
</div>  
)
} 