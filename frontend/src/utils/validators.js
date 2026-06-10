export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validatePhone = (phone) => {
  // Basic validation for numbers and some special characters like + - ( )
  const re = /^[\d\+\-\(\)\s]{10,15}$/;
  return re.test(phone);
};
