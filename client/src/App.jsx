import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from './components/ProtectedRoute'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import NotFound from './Pages/NotFound'
import GoogleAuthSuccess from './Pages/GoogleAuthSuccess'
import ResetPassword from './Pages/ResetPassword'

function App() {
  const user = useMemo(() => Cookies.get('user'), []);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!user);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route 
          path="/users/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={isUserLoggedIn ? <Navigate to="/users/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={isUserLoggedIn ? <Navigate to="/users/dashboard" replace /> : <Signup />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
