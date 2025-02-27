import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProducts(category = null, search = null, limit = 10) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = { page, limit };
        if (category) params.category = category;
        if (search) params.search = search;

        const response = await axios.get('/api/products', { params });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, page, limit]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    goToPage,
    setPage
  };
}