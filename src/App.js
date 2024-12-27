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
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoutes from './context/PrivateRoutes';
import DashLoadout from './components/Layouts/DashLoadout';
import Products from './pages/Products/Products';
import Message from './pages/Messages/Messages';
import OrderAndDelivery from './pages/OrderAndDelivery/OrderAndDelivery';
import Stats from './pages/Stats/Stats';
import Marketing from './pages/Marketing/Marketing';
import Help from './pages/Help/Help';
import Settings from './pages/Settings/Settings';
import Finances from './pages/Finances/Finances';



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
    "/dashboard",
    "/listing",
    "/messages",
    "/order-and-delivery",
    "/statistics",
    "/marketing",
    "/finances",
    "/help",
    "/settings"
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
      if (isAdminPage) {
        headerComponent = <AdminHeader />;
      } else {
        headerComponent = <Header />;
      }
    } else {
      if (isHeaderPage) {
        headerComponent = <Header />;
      }
    }
  } else {
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
        <Route path="/dashboard" element={<PrivateRoutes><DashLoadout><Dashboard /></DashLoadout></PrivateRoutes>} />
        <Route path="/listing" element={<PrivateRoutes><DashLoadout><Products/></DashLoadout></PrivateRoutes>} />
        <Route path="/messages" element={<PrivateRoutes><DashLoadout><Message/></DashLoadout></PrivateRoutes>} />
        <Route path="/order-and-delivery" element={<PrivateRoutes><DashLoadout><OrderAndDelivery /></DashLoadout></PrivateRoutes>} />
        <Route path="/statistics" element={<PrivateRoutes><DashLoadout><Stats /></DashLoadout></PrivateRoutes>} />
        <Route path="/marketing" element={<PrivateRoutes><DashLoadout><Marketing /></DashLoadout></PrivateRoutes>} />
        <Route path="/finances" element={<PrivateRoutes><DashLoadout><Finances /></DashLoadout></PrivateRoutes>} />
        <Route path="/help" element={<PrivateRoutes><DashLoadout><Help /></DashLoadout></PrivateRoutes>} />
        <Route path="/settings" element={<PrivateRoutes><DashLoadout><Settings /></DashLoadout></PrivateRoutes>} />
      </Routes>
    </>
  );
}

export default App;
