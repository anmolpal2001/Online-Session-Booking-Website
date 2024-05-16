import React from "react";
import AnimationWrapper from "./PageAnimation";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

const UserNavigationPanel = ({ handleLogout }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
    const handleLogoutClick = async () => {
        handleLogout();
      };


  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-700 dark:text-white" role="none">
            {currentUser.fullname}
          </p>
          <p
            className="text-sm font-medium text-gray-700 truncate dark:text-gray-300"
            role="none"
          >
            {currentUser.email}
          </p>
        <div className="absolute left-0 my-2 top-15 border-t border-grey w-[100%]"></div>
        </div>
        <ul className="py-0">
        <Link to="/profile" className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
        <li><SettingsIcon /> Settings</li>
        </Link>        
        <li>
        <button
          className="text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100  w-full font-medium mb-1"
          onClick={handleLogoutClick}
        >
          <LogoutIcon /> Sign out
        </button>
        </li>
        </ul>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
