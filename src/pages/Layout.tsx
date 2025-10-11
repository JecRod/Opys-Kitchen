import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Dnav from "../components/Dnav";
import Mnav from "../components/Mnav";




const Layout = () => {
  // const location = useLocation();
//   const hideHeaderRoutes = ['/login']; // add other routes as needed
//   const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/* {!shouldHideHeader && <Header appData={appData} />} */}
      
      <Toaster />
        <Dnav />
        <Mnav />
        <ScrollRestoration />
        <Outlet />
   
      <Footer />
    </>
  );
};

export default Layout;
