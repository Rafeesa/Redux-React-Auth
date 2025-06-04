import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/login" />;
  if (!currentUser.isAdmin) return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoute;
