import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Welcome, {username}!
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
