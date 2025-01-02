const apiUrl = import.meta.env.VITE_API_URL;

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/api/users/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors duration-300"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
