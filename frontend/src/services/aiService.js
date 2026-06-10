import api from './api';

export const aiService = {
  async getRecommendations(interests = [], limit = 6) {
    const response = await api.post('/ai/recommend', { interests, limit });
    return response.data;
  },

  async chat(message, history = []) {
    const response = await api.post('/ai/chat', { message, history });
    return response.data;
  }
};
