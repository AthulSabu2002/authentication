import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return false;
  
  try {
    const response = await axios.get(`${apiUrl}/api/users/verify-token`, {
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
