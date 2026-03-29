import React from 'react';
import { Navigate } from 'react-router-dom';
import useCan from 'views/permission managenment/checkpermissionvalue';

const ProtectedRoute = ({ element: Component, resource, permissionName }) => {
  const { checkPermission } = useCan();
  const hasPermission = checkPermission(resource, permissionName);
  if (hasPermission) {
    return <Component />;
  } else {
    return <Navigate to="/404" replace />;
  }
};

export default ProtectedRoute;
