import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Homepage from '../pages/Homepage/Homepage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MyProfile from '../pages/Profile/MyProfile';
import Accounts from '../pages/Profile/Accounts';
import Security from '../pages/Profile/Security';
import PublicProfile from '../pages/Profile/PublicProfile';
import Address from '../pages/Profile/Address';
import CreditCard from '../pages/Profile/CreditCard';
import Wishlist from '../pages/Wishlist/Wishlist';
import Cart from '../components/Cart/Cart';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import Rewards from '../pages/Rewards/Rewards';

const publicRoutes = [
  { path: '/', component: Homepage, exact: true },
  { path: '/login', component: Login },
  { path: '/signup', component: Register },
  { path: '/profile', component: MyProfile },
  { path: '/account-settings', component: Accounts },
  { path: '/account-security', component: Security },
  { path: '/public-profile', component: PublicProfile },
  { path: '/account-address', component: Address },
  { path: '/credit-card', component: CreditCard },
  { path: '/wishlist', component: Wishlist },
  { path: '/cart', component: Cart },
  { path: '/myorders', component: OrderHistory },
  { path: '/rewards', component: Rewards },
];

const PublicRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default PublicRoutes;
