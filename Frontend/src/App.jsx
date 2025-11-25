import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Donors from "./pages/Donors";
import Prospect from "./pages/Prospect";
import Prospects from "./pages/Prospects";
import Menu from "./components/Menu";
import NewDonor from "./pages/NewDonor";
import Donor from "./pages/Donor";
import PublicLayout from "./pages/PublicLayout";
import Featured from "./components/Featured";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PendingUsers from "./pages/PendingUsers";
import Notifications from "./pages/Notifications";   
import ProtectedRoute from "./components/ProtectedRoute";
import ContactUs from "./components/ContactUs";

import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex">
    <Menu />
    <div className="flex-1 p-7">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "featured", element: <Featured /> },
      { path: "contact", element: <Contact /> },
      { path: '/contact2', element: <ContactUs /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Prospect /> },         
      { path: "notifications", element: <Notifications /> },  
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Admin /> },
      { path: "donors", element: <Donors /> },
      { path: "prospects", element: <Prospects /> },
      { path: "prospect/:id", element: <Prospect /> },
      { path: "newdonor", element: <NewDonor /> },
      { path: "donor/:id", element: <Donor /> },
      { path: "pending-users", element: <PendingUsers /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;