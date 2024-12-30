import PropTypes from 'prop-types';

const Alert = ({ children, className = '' }) => (
  <div className={`p-4 mb-4 text-sm rounded-lg bg-red-100 text-red-700 ${className}`}>
    {children}
  </div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Alert;

Alert.defaultProps = {
  className: '',
};