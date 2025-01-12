import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyProfile from './MyProfile';
import AddressBook from './AddressBook';
import PaymentOptions from './PaymentOptions';
import MyReturns from './MyReturns';
import MyCancellation from './MyCancellation';
import MyReviews from './MyReviews';
import MyActivities from './MyActivities';
import ChangePassword from './ChangePassword';

const Settings = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const defaultTab = 'My Profile'; 
  const tabs = {
    'My Profile': <MyProfile/>,
    'Address Book': <AddressBook/>,
    'Change Password':<ChangePassword/>,
    'My Payment Options': <PaymentOptions/>,
    'My Returns': <MyReturns/>,
    'My Cancellations': <MyCancellation/>,
    'My Reviews': <MyReviews/>,
    'My Activities': <MyActivities/>,

  };

  const activeTab = tabs[tab] ? tab : defaultTab;

  useEffect(() => {
    if (tab !== activeTab) {
      navigate(`/settings/${activeTab}`, { replace: true });
    }
  }, [activeTab, tab, navigate]);

  const handleTabClick = (tabName) => {
    navigate(`/settings/${tabName}`);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Left Sidebar */}
      <div className="block w-full lg:w-2/12 border-r border-gray-200 pr-4">
        <h2 className="text-base font-semibold mb-4">Manage My Account</h2>
        <ul className="space-y-2">
          {['My Profile', 'Change Password', 'Address Book', 'My Payment Options'].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? 'font-bold' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-base font-semibold mt-6 mb-4">My Orders</h2>
        <ul className="space-y-2">
          {['My Returns', 'My Cancellations'].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? 'font-bold' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-base font-semibold mt-6 mb-4">Others</h2>
        <ul className="space-y-2">
          {['My Reviews', 'Wishlist & Followed Stores', 'My Activities'].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === item ? 'font-bold' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="w-full lg:w-10/12">
        <div>
          <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>
          <div className="text-gray-700">{tabs[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
