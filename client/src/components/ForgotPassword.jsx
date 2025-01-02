import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/users/forgot-password`, {
        email
      });
      setResetMessage(response.data.message || 'Password reset link has been sent to your email');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while processing your request');
    }
  }

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {resetMessage && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
          <p className="text-sm text-green-700">{resetMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleForgotPassword} className="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
        <div className="relative">
          <input 
            type="email" 
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
            Email address
          </label>
        </div>
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md px-6 py-2 w-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
        >
          Send Reset Link
        </button>
        <div className="text-center text-sm text-gray-600">
          <button 
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
}
ForgotPassword.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ForgotPassword;
