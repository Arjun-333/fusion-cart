import api from './api';

export const productService = {
  async getProducts(params) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getProductBySlug(slug) {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  async getFeaturedProducts(limit = 8) {
    const response = await api.get('/products/featured', { params: { limit } });
    return response.data;
  },

  async getBestsellerProducts(limit = 8) {
    const response = await api.get('/products/bestsellers', { params: { limit } });
    return response.data;
  },

  async getNewArrivals(limit = 8) {
    const response = await api.get('/products/new-arrivals', { params: { limit } });
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/products/categories');
    return response.data;
  }
};
