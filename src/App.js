import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import AdminHeader from './components/Header/AdminHeader';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MyProfile from './pages/Profile/MyProfile';
import Accounts from './pages/Profile/Accounts';
import Security from './pages/Profile/Security';
import CreditCard from './pages/Profile/CreditCard';
import Address from './pages/Profile/Address';
import PublicProfile from './pages/Profile/PublicProfile';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import Rewards from './pages/Rewards/Rewards';
import Messages from './components/Messages/Messages';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoutes from './context/PrivateRoutes';
import DashLoadout from './components/Layouts/DashLoadout';

function App() {
  const { role, isLoggedIn } = useAuth();
  const location = useLocation();

  // Define paths for header and admin header
  const adminPaths = [
    "/profile",
    "/account-settings",
    "/account-security",
    "/public-profile",
    "/account-address",
    "/credit-card",
    "/myorders",
    "/rewards",
    "/messages",
    "/dashboard"
  ];

  const headerPaths = [
    "/",
    "/login",
    "/signup",
    "/wishlist",
    "/cart"
  ];

  // Determine if we should show AdminHeader or Header based on role and current path
  const isAdminPage = adminPaths.includes(location.pathname);
  const isHeaderPage = headerPaths.includes(location.pathname);

  // Render AdminHeader if logged in and admin, otherwise render Header based on conditions
  let headerComponent = null;

  if (isLoggedIn) {
    if (role === 'admin' || role === 'vendor') {
      // Show AdminHeader on admin paths
      if (isAdminPage) {
        headerComponent = <AdminHeader />;
      } else {
        // Show Header on non-admin pages for admin or vendor
        headerComponent = <Header />;
      }
    } else {
      // Regular user, show Header for headerPaths
      if (isHeaderPage) {
        headerComponent = <Header />;
      }
    }
  } else {
    // For public pages (logged-out users), show Header
    if (isHeaderPage) {
      headerComponent = <Header />;
    }
  }

  return (
    <>
      {/* Render Header or AdminHeader based on user role */}
      {headerComponent}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Private Routes */}
        <Route path="/profile" element={<PrivateRoutes><MyProfile /></PrivateRoutes>} />
        <Route path="/account-settings" element={<PrivateRoutes><Accounts /></PrivateRoutes>} />
        <Route path="/account-security" element={<PrivateRoutes><Security /></PrivateRoutes>} />
        <Route path="/public-profile" element={<PrivateRoutes><PublicProfile /></PrivateRoutes>} />
        <Route path="/account-address" element={<PrivateRoutes><Address /></PrivateRoutes>} />
        <Route path="/credit-card" element={<PrivateRoutes><CreditCard /></PrivateRoutes>} />
        <Route path="/wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
        <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
        <Route path="/myorders" element={<PrivateRoutes><OrderHistory /></PrivateRoutes>} />
        <Route path="/rewards" element={<PrivateRoutes><Rewards /></PrivateRoutes>} />
        <Route path="/messages" element={<PrivateRoutes><Messages /></PrivateRoutes>} />
        <Route path="/dashboard" element={<PrivateRoutes><DashLoadout><Dashboard /></DashLoadout></PrivateRoutes>} />
      </Routes>
    </>
  );
}

export default App;
