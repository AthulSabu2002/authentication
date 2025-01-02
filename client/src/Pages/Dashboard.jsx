import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : { fullName: 'guest' };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
      Cookies.remove('user');
      Cookies.remove('token');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Welcome, {user.fullName}!
        </h1>
        <button 
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
