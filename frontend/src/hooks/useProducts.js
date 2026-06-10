import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  const [meta, setMeta] = useState({ total: 0, page: 1, total_pages: 1 });

  const fetchProducts = async (currentParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(currentParams);
      setProducts(data.items || []);
      setMeta({
        total: data.total || 0,
        page: data.page || 1,
        total_pages: data.total_pages || 1,
      });
    } catch (err) {
      setError(err);
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(params);
  }, [params]);

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams, page: 1 })); // reset page on filter change
  };

  const setPage = (page) => {
    setParams(prev => ({ ...prev, page }));
  };

  return { products, loading, error, meta, updateParams, setPage, params };
};
