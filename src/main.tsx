import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import Layout from './pages/Layout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoPage from './pages/404Page.tsx';
import MenuPage from './pages/MenuPage.tsx';
import ChatbotPage from './pages/ChatbotPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import CartPage from './pages/CartPage.tsx';
import OfferPage from './pages/OfferPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import HallPage from './pages/HallPage.tsx';
import { CartProvider } from "./context/CartContext";
import ReceiptPage from './pages/ReceiptPage.tsx';
import FeedbackPage from './pages/FeedbackPage.tsx';



const router = createBrowserRouter([
  {
    path: "/receipt",
    element: <ReceiptPage />,
  },
  // {
  //       path: "feedback",
  //       element: <FeedbackPage />,
  // },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "chat",
        element: <ChatbotPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "offers",
        element: <OfferPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "hall",
        element: <HallPage />,
      },
        {
        path: "feedback",
        element: <FeedbackPage />,
  },
      
      
    ],
  },
]);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
