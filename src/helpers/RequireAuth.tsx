import { useLocation, Navigate } from "react-router-dom";

//@ts-ignore
const RequireAuth = ({ authenticated, children }) => {
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
