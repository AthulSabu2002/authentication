function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-8">Create Account</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form className="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input 
                    type="text" 
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                    placeholder="Full Name"
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                    placeholder="Email address"
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
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md px-6 py-2 w-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300">
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
  )
}

export default Signup
