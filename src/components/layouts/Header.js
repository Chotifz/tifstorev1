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
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="TZStore" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-primary">TZStore</span>
          </Link>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-grow mx-8">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r">
                <FaSearch />
              </button>
            </form>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="text-gray-700 hover:text-primary">
              Products
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-primary relative">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary">
                  <FaUser className="mr-1" />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-primary">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r">
                <FaSearch />
              </button>
            </form>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-gray-700 hover:text-primary py-2">
                Products
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-primary py-2 flex items-center">
                <FaShoppingCart className="mr-2" />
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-700 hover:text-primary py-2">
                    Profile
                  </Link>
                  <Link href="/orders" className="text-gray-700 hover:text-primary py-2">
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="text-gray-700 hover:text-primary py-2">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="text-left text-gray-700 hover:text-primary py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-primary py-2">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}