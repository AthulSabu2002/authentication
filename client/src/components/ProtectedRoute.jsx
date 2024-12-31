import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { verifyToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const valid = await verifyToken();
      setIsValid(valid);
      setIsValidating(false);
    };
    validateToken();
  }, []);

  if (isValidating) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
