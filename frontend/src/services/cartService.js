import api from './api';

export const cartService = {
  async getCart() {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(productId, quantity = 1, selectedVariant = null) {
    const response = await api.post('/cart', {
      product_id: productId,
      quantity,
      selected_variant: selectedVariant
    });
    return response.data;
  },

  async updateCartItem(itemId, quantity) {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  async removeCartItem(itemId) {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  async clearCart() {
    const response = await api.delete('/cart');
    return response.data;
  }
};
