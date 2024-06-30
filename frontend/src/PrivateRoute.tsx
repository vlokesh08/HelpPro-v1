import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children } : any) => {
  const user = localStorage.getItem("user") || "{}";
  const userObj = JSON.parse(user);
  const email = userObj.email;

  return email ? children : <Navigate to="/landing" />;
};

export default PrivateRoute;
