// Format currency for India by default, but adaptable
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (amount === undefined || amount === null) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const calculateDiscountPercentage = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
