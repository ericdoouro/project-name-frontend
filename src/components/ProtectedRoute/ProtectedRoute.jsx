import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({
  isLoggedIn,
  isAuthLoading,
  onUnauthorized,
  ...props
}) {
  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn && onUnauthorized) {
      onUnauthorized();
    }
  }, [isAuthLoading, isLoggedIn, onUnauthorized]);

  if (isAuthLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}

export default ProtectedRoute;
