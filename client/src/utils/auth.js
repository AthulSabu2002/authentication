import axios from 'axios';

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return false;
  
  try {
    const response = await axios.get('http://localhost:3000/api/users/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.valid;
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    crossOriginIsolated.log(error);
    return false;
  }
};
