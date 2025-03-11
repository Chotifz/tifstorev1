import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser, FaSearch, FaBars } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
 <header className="bg-white shadow-md border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center">
      <svg className="h-8 w-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21,6H3A2,2 0 0,0 1,8V16A2,2 0 0,0 3,18H21A2,2 0 0,0 23,16V8A2,2 0 0,0 21,6M21,16H3V8H21M6,15H8V13H10V11H8V9H6V11H4V13H6M14,15H19V13H14V11H19V9H14A2,2 0 0,0 12,11V13A2,2 0 0,0 14,15Z" />
      </svg>
      <span className="font-semibold text-lg text-gray-800">
        <span className="tracking-wider font-bold  text-blue-600">TIF</span> Store
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
        Masuk
      </button>
      <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium border border-blue-200 shadow-sm hover:shadow transition-all">
        Daftar
      </button>
    </div>
  </div>
</header>
  );
}