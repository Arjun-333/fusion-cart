import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('fusioncart_token', response.data.access_token);
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('fusioncart_token');
  },

  async updateProfile(userData) {
    const response = await api.put('/auth/me', userData);
    return response.data;
  },
  
  async addAddress(addressData) {
    const response = await api.post('/auth/me/addresses', addressData);
    return response.data;
  },
  
  async deleteAddress(addressId) {
    await api.delete(`/auth/me/addresses/${addressId}`);
  }
};
