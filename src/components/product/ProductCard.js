import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  
  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlist(!isWishlist);
    // Here you would typically call an API to add/remove from wishlist
  };
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };
  
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="h-48 sm:h-56 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            {isWishlist ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 text-gray-800">{product.name}</h3>
          
          <div className="text-sm text-gray-500 mb-2">{product.category}</div>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < product.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } h-4 w-4`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div>
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">${((product.price * (100 - product.discount)) / 100).toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="p-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}