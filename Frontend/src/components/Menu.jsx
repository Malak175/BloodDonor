import React, { useState } from 'react';
import { 
  FaHome, 
  FaUser, 
  FaHeart, 
  FaBell, 
  FaSignOutAlt, 
  FaArrowLeft, 
  FaUsers, 
  FaBox, 
  FaUserCheck 
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { persistor } from "../redux/store";

function Menu({ onNavigate }) {
  
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge().then(() => {
      navigate("/");
    });
  };

  const handleActiveLink = (link) => {
    setActiveLink(link);
    if (typeof onNavigate === "function") onNavigate();
  };

  if (!currentUser) {
    return null;
  }

  const unreadCount = currentUser.notifications?.filter(n => !n.read).length || 0;

  return (
    <nav
      className="w-full md:w-72 bg-white md:bg-white/90 shadow-sm md:shadow-none min-h-screen
                 p-4 md:p-6 flex flex-col"
      aria-label="Main sidebar"
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-red-600">
          {currentUser.role === "admin" ? "Admin Panel" : "Donor Dashboard"}
        </h2>
      </div>

      <ul className="flex-1 flex flex-col gap-3">
        <li>
          <Link
            to={currentUser.role === "admin" ? "/admin" : "/dashboard"}
            onClick={() => handleActiveLink(currentUser.role === "admin" ? "/admin" : "/dashboard")}
            className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
              ${activeLink === (currentUser.role === "admin" ? "/admin" : "/dashboard") ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
          >
            <FaHome className="mr-3" /> Home
          </Link>
        </li>

        {currentUser.role === "admin" && (
          <>
            <li>
              <Link
                to="/admin/donors"
                onClick={() => handleActiveLink("/admin/donors")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/admin/donors" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaBox className="mr-3" /> Donors
              </Link>
            </li>

            <li>
              <Link
                to="/admin/prospects"
                onClick={() => handleActiveLink("/admin/prospects")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/admin/prospects" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaUsers className="mr-3" /> Prospects
              </Link>
            </li>

            <li>
              <Link
                to="/admin/pending-users"
                onClick={() => handleActiveLink("/admin/pending-users")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/admin/pending-users" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaUserCheck className="mr-3" /> Pending Registrations
              </Link>
            </li>
          </>
        )}

        {currentUser.role !== "admin" && (
          <>
            <li>
              <Link
                to="/dashboard/profile"
                onClick={() => handleActiveLink("/dashboard/profile")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/dashboard/profile" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaUser className="mr-3" /> My Profile
              </Link>
            </li>

            <li className="relative">
              <Link
                to="/dashboard/notifications"
                onClick={() => handleActiveLink("/dashboard/notifications")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/dashboard/notifications" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaBell className="mr-3" /> Notifications
                {unreadCount > 0 && (
                  
                  <span className="ml-2 md:ml-3 inline-flex items-center justify-center text-xs md:text-sm font-bold
                                   bg-red-600 text-white rounded-full h-5 w-5 md:h-6 md:w-6">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/donations"
                onClick={() => handleActiveLink("/dashboard/donations")}
                className={`flex items-center text-base md:text-lg font-semibold px-3 py-2 rounded-lg transition-colors
                  ${activeLink === "/dashboard/donations" ? "bg-red-500 text-white" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}
              >
                <FaHeart className="mr-3" /> My Donations
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold py-2 rounded-lg
                     bg-red-50 hover:bg-red-100 text-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold py-2 rounded-lg
                     bg-gray-50 hover:bg-gray-100 text-gray-700"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    </nav>
  );
}

export default Menu;
