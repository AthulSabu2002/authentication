import PropTypes from 'prop-types';

const Alert = ({ children, className = '', variant = 'error' }) => {
  const variantClasses = {
    error: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700'
  };

  return (
    <div className={`p-4 mb-4 text-sm rounded-lg ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'success'])
};

Alert.defaultProps = {
  className: '',
  variant: 'error'
};

export default Alert;