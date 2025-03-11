import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';



export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">
              <span className="tracking-wider font-bold text-blue-400">TIF</span> Store
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">Top up game favorit kamu dengan mudah, aman, dan harga terjangkau</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Kategori</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="hover:text-gray-300 cursor-pointer">Mobile Games</li>
                <li className="hover:text-gray-300 cursor-pointer">PC Games</li>
                <li className="hover:text-gray-300 cursor-pointer">Voucher</li>
                <li className="hover:text-gray-300 cursor-pointer">Konsol Games</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Metode Pembayaran</h4>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {/* Placeholder untuk logo pembayaran */}
                
                <img src="/images/method/dana.png" alt="DANA" className="h-6 object-contain" />
                <img src="/images/method/ovo.png" alt="OVO" className="h-6 object-contain" />
                <img src="/images/method/gopay.png" alt="GoPay" className="h-6 object-contain" />
                <img src="/images/method/qbri2.png" alt="BRI" className="h-6 object-contain" />
                <img src="/images/method/qqris.jpg" alt="QRIS" className="h-6 object-contain" />
                <img src="/images/method/bca.png" alt="BCA" className="h-6 object-contain" />
                <img src="/images/method/mandiri.png" alt="Mandiri" className="h-6 object-contain" />
                <img src="/images/method/linkaja2.png" alt="LinkAja" className="h-6 object-contain" />
                <img src="/images/method/shopeepay.png" alt="ShopeePay" className="h-6 object-contain" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Bantuan</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="hover:text-gray-300 cursor-pointer">FAQ</li>
                <li className="hover:text-gray-300 cursor-pointer">Syarat & Ketentuan</li>
                <li className="hover:text-gray-300 cursor-pointer">Kontak</li>
                <li className="hover:text-gray-300 cursor-pointer">Cara Pembayaran</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>© 2025 TIFz Store. Semua hak dilindungi.</div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}