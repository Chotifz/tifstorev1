
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Combines multiple class names using clsx and merges Tailwind CSS classes using twMerge
 * @param  {...any} inputs - Class names to combine and merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date object to a localized string
 * @param {Date} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return new Date(date).toLocaleDateString(
    'id-ID', 
    { ...defaultOptions, ...options }
  );
}

/**
 * Format a price number to a currency string
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted price string
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage between two prices
 * @param {number} originalPrice - The original price
 * @param {number} currentPrice - The current price (after discount)
 * @returns {string} - Discount percentage with % symbol
 */
export function calculateDiscount(originalPrice, currentPrice) {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return "0%";
  }
  
  const discountPercent = ((originalPrice - currentPrice) / originalPrice) * 100;
  return `${Math.round(discountPercent)}%`;
}

/**
 * Truncate a string if it exceeds a maximum length
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated string with ellipsis if needed
 */
export function truncateString(str, maxLength = 50) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength) + '...';
}

/**
 * Generate a random order ID with a given prefix
 * @param {string} prefix - Prefix for the order ID
 * @returns {string} - Generated order ID
 */
export function generateOrderId(prefix = 'TRX') {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}${timestamp}${random}`;
}

/**
 * Get a readable status label based on status code
 * @param {string} status - Status code
 * @returns {string} - Human-readable status label
 */
export function getStatusLabel(status) {
  const statusMap = {
    'PENDING': 'Menunggu Pembayaran',
    'PROCESSING': 'Diproses',
    'SUCCESS': 'Berhasil',
    'FAILED': 'Gagal',
    'REFUNDED': 'Dikembalikan'
  };
  
  return statusMap[status] || status;
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}