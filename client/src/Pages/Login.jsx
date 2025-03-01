import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';
import ForgotPassword from '../components/ForgotPassword';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password
      }, { withCredentials: true });
      
      if (response.data.user) {
        Cookies.set('user', JSON.stringify(response.data.user));
      }
      navigate('/users/dashboard', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during sign in');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-8">
              {isForgotPassword ? 'Reset Password' : 'Welcome Back'}
            </h1>

            {!isForgotPassword ? (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <GoogleAuthButton />
                </div>
                
                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="mx-4 text-sm text-gray-500">or</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <form onSubmit={handleSignIn} className="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input 
                      type="email" 
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                      placeholder="Email address"
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email address
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md px-6 py-2 w-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                  >
                    Sign in
                  </button>
                </form>
                <div className="text-center text-sm text-gray-600">
                  <button 
                    onClick={() => setIsForgotPassword(true)}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              <ForgotPassword onBack={() => setIsForgotPassword(false)} />
            )}
            
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account? 
              <a href="/signup" className="text-purple-600 hover:text-purple-700 ml-1">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;