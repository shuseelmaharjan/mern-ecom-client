import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoutes from "./context/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Message from "./pages/Messages/Messages";
import Messages from "./pages/Messages/UserMessages";
import OrderAndDelivery from "./pages/OrderAndDelivery/OrderAndDelivery";
import Stats from "./pages/Stats/Stats";
import Marketing from "./pages/Marketing/Marketing";
import Help from "./pages/Help/Help";
import Settings from "./pages/Settings/Settings";
import Finances from "./pages/Finances/Finances";
import AddProduct from "./pages/Products/AddProduct";
import BeMember from "./pages/BeMember/BeMember";
import HomePage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MyProfile from "./pages/Profile/MyProfile";
import Accounts from "./pages/Profile/Accounts";
import Security from "./pages/Profile/Security";
import PublicProfile from "./pages/Profile/PublicProfile";
import Address from "./pages/Profile/Address";
import CreditCard from "./pages/Profile/CreditCard";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Rewards from "./pages/Rewards/Rewards";
import Header from "./components/Header/Headers";
import DashLoadout from "./components/Layouts/DashLoadout";
import DummyProducts from "./components/Cart/DummyProducts";
import CheckOut from "./components/Cart/Checkout";
import Employee from "./pages/Employee/Employee";
import Site from "./pages/Site/Site";
import { ToastContainer, Flip } from "react-toastify";
import Coupons from "./pages/Coupons/Coupons";
import Categories from "./pages/Categories/Categories";
import Campaign from "./pages/Campaign/Campaign";
import CategoryPage from "./pages/Products/CategoryPage";
import ProductDetails from "./pages/Products/ProductDetails";
import SubCategory from "./pages/Products/SubCategoryPage";
import GrandCategory from "./pages/Products/GrandCategory";

function App() {
  const location = useLocation();

  const routeConfig = [
    { path: "/", element: <HomePage />, showHeader: true, private: false },
    { path: "/login", element: <Login />, showHeader: true, private: false },
    {
      path: "/signup",
      element: <Register />,
      showHeader: true,
      private: false,
    },
    {
      path: "/public-profile",
      element: <PublicProfile />,
      showHeader: true,
      private: false,
    },
    // Dummy route for dummy products API
    {
      path: "/dummy-products",
      element: <DummyProducts />,
      showHeader: true,
      private: false,
    },

    {
      path: "/checkout",
      element: <CheckOut />,
      showHeader: true,
      private: true,
    },

    {
      path: "/category",
      element: <CategoryPage />,
      showHeader: true,
      private: false,
      dashLoadout: false,
    },
    {
      path: "/category/page2.html",
      element: <SubCategory />,
      showHeader: true,
      private: false,
      dashLoadout: false,
    },
    {
      path: "/category/page3.html",
      element: <GrandCategory />,
      showHeader: true,
      private: false,
      dashLoadout: false,
    },
    {
      path: "/product",
      element: <ProductDetails />,
      showHeader: true,
      private: false,
      dashLoadout: false,
    },

    // Private routes with Header (no DashLoadout)
    {
      path: "/profile",
      element: <MyProfile />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/be-a-member",
      element: <BeMember />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/account-settings",
      element: <Accounts />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/account-security",
      element: <Security />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/account-address",
      element: <Address />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/cart",
      element: <Cart />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/myorders",
      element: <OrderHistory />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/rewards",
      element: <Rewards />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/credit-card",
      element: <CreditCard />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/listing?",
      element: <Products />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/listing",
      element: <Products />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/messages",
      element: <Message />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/chat",
      element: <Messages />,
      showHeader: true,
      private: true,
      dashLoadout: false,
    },
    {
      path: "/order-and-delivery",
      element: <OrderAndDelivery />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/statistics",
      element: <Stats />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/marketing",
      element: <Marketing />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/marketing/:tab",
      element: <Marketing />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/campaign?",
      element: <Campaign />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/campaign",
      element: <Campaign />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/finances",
      element: <Finances />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/help",
      element: <Help />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/settings/:tab?",
      element: <Settings />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },

    {
      path: "/listing/create-product",
      element: <AddProduct />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/employee",
      element: <Employee />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/site",
      element: <Site />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/categories",
      element: <Categories />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
    {
      path: "/coupons",
      element: <Coupons />,
      showHeader: false,
      private: true,
      dashLoadout: true,
    },
  ];

  const currentRoute = routeConfig.find(
    (route) => route.path === location.pathname
  );

  const shouldShowHeader =
    currentRoute?.showHeader && !currentRoute?.dashLoadout;

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        {routeConfig.map((route, index) => {
          const { path, element, private: isPrivate, dashLoadout } = route;

          if (isPrivate) {
            if (dashLoadout) {
              // Private route with DashLoadout
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <PrivateRoutes>
                      <DashLoadout>{element}</DashLoadout>
                    </PrivateRoutes>
                  }
                />
              );
            } else {
              // Private route without DashLoadout
              return (
                <Route
                  key={index}
                  path={path}
                  element={<PrivateRoutes>{element}</PrivateRoutes>}
                />
              );
            }
          } else {
            // Public route
            return <Route key={index} path={path} element={element} />;
          }
        })}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </>
  );
}

export default App;
