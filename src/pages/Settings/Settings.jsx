import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyProfile from "./MyProfile";
import AddressBook from "./AddressBook";
import PaymentOptions from "./PaymentOptions";
import MyReturns from "./MyReturns";
import MyCancellation from "./MyCancellation";
import MyReviews from "./MyReviews";
import MyActivities from "./MyActivities";
import ChangePassword from "./ChangePassword";
import CompanyPolicies from "./CompanyPolicies";
import CompanyReturnPolicies from "./CompanyReturnPolicies";
import CompanyShippingPolicies from "./CompanyShippingPolicies";
// import CompanyVendorsPolicies from './CompanyVendorsPolicies';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Settings = () => {
  const navigate = useNavigate();
  const { tab } = useParams();

  const tabs = {
    "my-profile": <MyProfile />,
    "address-book": <AddressBook />,
    "change-password": <ChangePassword />,
    "my-payment-options": <PaymentOptions />,
    "my-returns": <MyReturns />,
    "my-cancellations": <MyCancellation />,
    "my-reviews": <MyReviews />,
    "my-activities": <MyActivities />,
    "company-policies": <CompanyPolicies />,
    "company-return-policies": <CompanyReturnPolicies />,
    "company-shipping-policies": <CompanyShippingPolicies />,
    // 'default-vendor-policies': <CompanyVendorsPolicies />,
  };

  const tabTitles = {
    "my-profile": "My Profile",
    "address-book": "Address Book",
    "change-password": "Change Password",
    "my-payment-options": "My Payment Options",
    "my-returns": "My Returns",
    "my-cancellations": "My Cancellations",
    "my-reviews": "My Reviews",
    "my-activities": "My Activities",
    "company-policies": "Company Policy",
    "company-return-policies": "Company Return Policy",
    "company-shipping-policies": "Company Shipping Policy",
    // 'default-vendor-policies':'Vendor Policies',
  };

  const defaultTab = "my-profile";
  const activeTab = tabs[tab] ? tab : defaultTab;

  useEffect(() => {
    if (tab !== activeTab) {
      navigate(`/settings/${activeTab}`, { replace: true });
    }
  }, [activeTab, tab, navigate]);

  const handleTabClick = (tabName) => {
    navigate(`/settings/${tabName}`);
  };

  const token = Cookies.get("_r");
  const decodeToken = jwtDecode(token);
  const role = decodeToken.role;

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Left Sidebar */}
      <div className="block w-full lg:w-2/12 border-r border-gray-200 pr-4">
        <h2 className="text-base font-semibold mb-4">Manage My Account</h2>
        <ul className="space-y-2">
          {[
            "my-profile",
            "change-password",
            "address-book",
            "my-payment-options",
          ].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? "font-bold" : "hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick(item)}
            >
              {tabTitles[item]}
            </li>
          ))}
        </ul>
        {role === "admin" && (
          <>
            <h2 className="text-base font-semibold mt-6 mb-4">Site Settings</h2>
            <ul className="space-y-2">
              {[
                "company-policies",
                "company-return-policies",
                "company-shipping-policies",
              ].map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer p-2 rounded-md ${
                    activeTab === item ? "font-bold" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabClick(item)}
                >
                  {tabTitles[item]}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className="text-base font-semibold mt-6 mb-4">My Orders</h2>
        <ul className="space-y-2">
          {["my-returns", "my-cancellations"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? "font-bold" : "hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick(item)}
            >
              {tabTitles[item]}
            </li>
          ))}
        </ul>

        <h2 className="text-base font-semibold mt-6 mb-4">Others</h2>
        <ul className="space-y-2">
          {["my-reviews", "my-activities"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? "font-bold" : "hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick(item)}
            >
              {tabTitles[item]}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full lg:w-10/12">
        <div>
          <h2 className="text-xl font-semibold mb-4">{tabTitles[activeTab]}</h2>
          <div className="text-gray-700">{tabs[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
