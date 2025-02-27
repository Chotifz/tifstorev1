import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaShieldAlt, FaTruck, FaBox } from 'react-icons/fa';
import { useCart } from '@/hooks/useCart';

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    // Here you would typically call an API to add/remove from wishlist
  };

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? ((product.price * (100 - product.discount)) / 100).toFixed(2)
    : product.price.toFixed(2);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative h-80 md:h-96 mb-4 rounded-lg overflow-hidden border border-gray-200">
            {product.images && product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            ) : (
              <div className="h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          
          {/* Image gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-16 border cursor-pointer rounded overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < product.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } h-5 w-5`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-4">
            {product.discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-800">
                  ${discountedPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-sm rounded ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 
                ? `In Stock (${product.stock} available)` 
                : 'Out of Stock'}
            </span>
          </div>
          
          {/* Short Description */}
          <div className="mb-6">
            <p className="text-gray-600">{product.shortDescription}</p>
          </div>
          
          {/* Quantity */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border border-gray-300 rounded-l"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="p-2 w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  onClick={incrementQuantity}
                  className="p-2 border border-gray-300 rounded-r"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
          )}
          
          {/* Add to Cart & Wishlist */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex-grow flex items-center justify-center py-3 px-4 rounded-md ${
                product.stock > 0
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            
            <button
              onClick={toggleWishlist}
              className="py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {isWishlist ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
          
          {/* Features */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaShieldAlt className="mr-2 text-primary" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaTruck className="mr-2 text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaBox className="mr-2 text-primary" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Description & Details */}
      <div className="mt-10">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button className="py-3 px-6 border-b-2 border-primary font-medium text-gray-900">
              Description
            </button>
            <button className="py-3 px-6 text-gray-500 hover:text-gray-700">
              Specifications
            </button>
            <button className="py-3 px-6 text-gray-500 hover:text-gray-700">
              Reviews
            </button>
          </div>
        </div>
        
        <div className="py-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>
    </div>
  );
}