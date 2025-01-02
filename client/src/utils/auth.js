import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const verifyToken = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/verify-token`, {
      withCredentials: true // Include cookies in the request
    });
    return response.data.valid;
  } catch (error) {
    console.error(error);
    return false;
  }
};
