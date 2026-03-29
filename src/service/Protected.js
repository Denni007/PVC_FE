import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.customization.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
// Protected.propTypes = {
//   children: PropTypes.node
// };
export default Protected;
