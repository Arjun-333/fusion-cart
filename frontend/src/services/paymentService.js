import api from './api';

export const paymentService = {
  async createOrder(amount, orderId) {
    const response = await api.post('/payments/create-order', {
      amount,
      order_id: orderId
    });
    return response.data;
  },

  async verifyPayment(verificationData) {
    const response = await api.post('/payments/verify', verificationData);
    return response.data;
  }
};
