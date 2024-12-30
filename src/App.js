import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './context/PrivateRoutes';
import Layout from './components/Layouts/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Message from './pages/Messages/Messages';
import OrderAndDelivery from './pages/OrderAndDelivery/OrderAndDelivery';
import Stats from './pages/Stats/Stats';
import Marketing from './pages/Marketing/Marketing';
import Help from './pages/Help/Help';
import Settings from './pages/Settings/Settings';
import Finances from './pages/Finances/Finances';
import AddProduct from './pages/Products/AddProduct';
import BeMember from './pages/BeMember/BeMember';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MyProfile from './pages/Profile/MyProfile';
import Accounts from './pages/Profile/Accounts';
import Security from './pages/Profile/Security';
import PublicProfile from './pages/Profile/PublicProfile';
import Address from './pages/Profile/Address';
import CreditCard from './pages/Profile/CreditCard';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import Rewards from './pages/Rewards/Rewards';

function App() {


  const publicRoutes = [
    { path: '/', component: Homepage, showHeader: true },
    { path: '/login', component: Login, showHeader: true },
    { path: '/signup', component: Register, showHeader: true },
    { path: '/profile', component: MyProfile, showHeader: true },
    { path: '/account-settings', component: Accounts, showHeader: true },
    { path: '/account-security', component: Security, showHeader: true },
    { path: '/public-profile', component: PublicProfile, showHeader: true },
    { path: '/account-address', component: Address, showHeader: true },
    { path: '/credit-card', component: CreditCard, showHeader: true },
    { path: '/wishlist', component: Wishlist, showHeader: true },
    { path: '/cart', component: Cart, showHeader: true },
    { path: '/myorders', component: OrderHistory, showHeader: true },
    { path: '/rewards', component: Rewards, showHeader: true },
  ];


  const privateRoutes = [
    { path: '/dashboard', component: Dashboard, showDashLoadout: true },
    { path: '/listing', component: Products, showDashLoadout: true },
    { path: '/messages', component: Message, showDashLoadout: true },
    { path: '/order-and-delivery', component: OrderAndDelivery, showDashLoadout: true },
    { path: '/statistics', component: Stats, showDashLoadout: true },
    { path: '/marketing', component: Marketing, showDashLoadout: true },
    { path: '/finances', component: Finances, showDashLoadout: true },
    { path: '/help', component: Help, showDashLoadout: true },
    { path: '/settings', component: Settings, showDashLoadout: true },
    { path: '/listing/create-product', component: AddProduct, showDashLoadout: true },
    { path: '/be-a-member', component: BeMember, showDashLoadout: false }, 
  ];

  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={
            <Layout showHeader={route.showHeader}>
              <route.component />
            </Layout>
          }
        />
      ))}

      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={
            <PrivateRoutes>
              {route.showDashLoadout ? (
                <Layout showDashLoadout={route.showDashLoadout}>
                  <route.component />
                </Layout>
              ) : (
                <route.component />
              )}
            </PrivateRoutes>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
