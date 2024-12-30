import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import DashLoadout from '../../components/Layouts/DashLoadout';

const Layout = ({ showHeader = false, showDashLoadout = false }) => {
  return (
    <>
      {showHeader && <Header />}
      {showDashLoadout ? (
        <DashLoadout>
          <Outlet />
        </DashLoadout>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
