import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/knowhub.png";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet } from "react-router-dom";
import UserNavigationPanel from "../UserNavigation";
import AuthLayout from "../AuthLayout";

const StudentLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/auth/logout");
      const data = await response.json();
      if(data.success){
        dispatch(logout());
        navigate("/signin");
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const toggleIcon = () => {
    setIsOpenIcon(!isOpenIcon);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleUserNavPanel = () => {
    setUserNavPanel((currVal) => !currVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    },200);
  };
  return (
    <>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  onClick={toggleSidebar}
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="logo-sidebar"
                  type="button"
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon />
                </button>
                <Link to="/" className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
                    Knowledge <span className="text-yellow-400">Hub</span>
                  </span>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3 relative">
                <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                    <button className="w-10 h-10">
                        <img src={currentUser.profilePic} alt="" className="w-full h-full object-cover rounded-full"/>
                    </button>
                    {userNavPanel && <UserNavigationPanel handleLogout={handleLogout} />}
                </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group ${
                    isActive ? "bg-blue-600 text-white hover:bg-blue-500" : "text-gray-900"
                  }`
                }
                end
                onClick={toggleSidebar}
              >
                <li>
                  <DashboardIcon />
                  <span className="ms-3">Dashboard</span>
                </li>
              </NavLink>

              <NavLink
                to="/booked-sessions"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group ${
                    isActive ? "bg-blue-600 text-white hover:bg-blue-500" : "text-gray-900"
                  }`
                }
                end
                onClick={toggleSidebar}
              >
                <li>
                  <OfflinePinIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Booked Sessions
                  </span>
                </li>
              </NavLink>

              <NavLink
                to="/pending-requests"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group ${
                    isActive ? "bg-blue-600 text-white hover:bg-blue-500" : "text-gray-900"
                  }`
                }
                end
                onClick={toggleSidebar}
              >
                <li>
                  <PendingIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Pending Requests
                  </span>
                </li>
              </NavLink>

              <NavLink
                to="/rejected-sessions"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group ${
                    isActive ? "bg-blue-600 text-white hover:bg-blue-500" : "text-gray-900"
                  }`
                }
                end
                onClick={toggleSidebar}
              >
                <li>
                  <CancelIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Rejected Slots
                  </span>
                </li>
              </NavLink>
            </ul>
          </div>
        </aside>

        <div className="md:ml-64 mt-24">{children}</div>
        <Outlet />
      </div>
    </>
  );
};

export default StudentLayout;
