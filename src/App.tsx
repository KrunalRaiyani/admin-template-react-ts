import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import Products from './pages/products/Products';
import { ToastContainer } from 'react-toastify';
import AddProduct from './pages/products/AddProduct';
import Users from './pages/users/Users';
import UserDetail from './pages/users/UserDetail';
import ProfilePage from './pages/setting/ProfilePage';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const PrivateRoute = () => {
    const token = localStorage.getItem('adminToken');
    return <Outlet />;
    // return token ? <Outlet /> : <Navigate to="/login" />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin | Admin" />
              <SignIn />
            </>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Dashboard | Admin" />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <PageTitle title="Products | Admin" />
                <Products />
              </>
            }
          />

          <Route
            path="/products/add"
            element={
              <>
                <PageTitle title="Add Product | Admin" />
                <AddProduct />
              </>
            }
          />

          <Route
            path="/users"
            element={
              <>
                <PageTitle title="Users | Admin" />
                <Users />
              </>
            }
          />

          <Route
            path="/users/view/:id"
            element={
              <>
                <PageTitle title="User Details | Admin" />
                <UserDetail />
              </>
            }
          />

          <Route
            path="/setting"
            element={
              <>
                <PageTitle title="Setting | Admin" />
                <ProfilePage />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
