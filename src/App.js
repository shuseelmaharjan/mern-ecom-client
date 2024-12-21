import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
    <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/profile' element={<MyProfile/>}/>
          <Route path='/account-settings' element={<Accounts/>}/>
          <Route path='/account-security' element={<Security/>}/>
          <Route path='/public-profile' element={<PublicProfile/>}/>
          <Route path='/account-address' element={<Address/>}/>
          <Route path='/credit-card' element={<CreditCard/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/myorders' element={<OrderHistory/>}/>
          <Route path='/rewards' element={<Rewards/>}/>
          <Route path='/messages' element={<Messages/>}/>
        </Routes>
    </>    
  );
}

export default App;
