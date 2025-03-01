import { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import GoogleAuthButton from '../components/GoogleAuthButton';

const apiUrl = import.meta.env.VITE_API_URL;

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({
    server: '',
    email: '',
    password: '',
    fullName: ''
  });

  function handleEmailOnChange(event) {
    setEmail(event.target.value);
    setErrors(prev => ({ ...prev, email: '', server: '' }));
  }

  function handlePasswordOnChange(event) {
    setPassword(event.target.value);
    setErrors(prev => ({ ...prev, password: '', server: '' }));
  }

  function handleFullNameOnChange(event) {
    setFullName(event.target.value);
    setErrors(prev => ({ ...prev, fullName: '', server: '' }));
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setSuccess('');
    setErrors(prev => ({ ...prev, server: '' }));

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, {
        fullName,
        email,
        password
      });
      setSuccess(response.data.message);
      // Clear form
      setEmail('');
      setPassword('');
      setFullName('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data.message || 'Registration failed. Please try again.';
      setErrors(prev => ({
        ...prev,
        ...(error.response?.data.errors || {}),
        server: error.response ? errorMessage : 'Unable to connect to server. Please try again later.'
      }));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-8">Create Account</h1>
            </div>
            {success && (
              <Alert variant="success">{success}</Alert>
            )}
            {errors.server && (
              <Alert variant="error">{errors.server}</Alert>
            )}

            <div className="mb-6">
              <GoogleAuthButton />
            </div>
            
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-sm text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSignUp} className="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input 
                    type="text" 
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600 ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                    placeholder="Full Name"
                    onChange={handleFullNameOnChange}
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Full Name
                  </label>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Email address"
                    onChange={handleEmailOnChange}
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email address
                  </label>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Password"
                    onChange={handlePasswordOnChange}
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password
                  </label>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="relative">
                  <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md px-6 py-2 w-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center text-sm text-gray-600">
              Already have an account? 
              <a href="/login" className="text-purple-600 hover:text-purple-700 ml-1">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;