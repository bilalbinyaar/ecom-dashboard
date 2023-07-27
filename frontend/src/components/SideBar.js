import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine } from 'react-icons/ri';
import { PiBowlFoodFill } from 'react-icons/pi';
import { CiViewList, CiBowlNoodles, CiWheat } from 'react-icons/ci';
import { BsFolder } from 'react-icons/bs';
import { BiSolidComponent, BiSolidContact, BiLogOut } from 'react-icons/bi';

const SideBar = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <RiDashboardLine /> },
    { title: 'Categories', path: '/categories', icon: <CiViewList /> },
    { title: 'All Products', path: '/products', icon: <BsFolder /> },
    { title: 'Salt Products', path: '/salt', icon: <PiBowlFoodFill /> },
    { title: 'Pasta Products', path: '/pasta', icon: <CiBowlNoodles /> },
    { title: 'Wheat Products', path: '/wheat', icon: <CiWheat /> },
    { title: 'Components', path: '/components', icon: <BiSolidComponent /> },
    { title: 'Contacts', path: '/contacts', icon: <BiSolidContact /> },
    // { title: 'Logout', path: '/', icon: <BiLogOut /> },
  ];

  // Find the index of the active menu item based on the current path
  const findActiveMenuItem = () => {
    const activeIndex = menuItems.findIndex((item) =>
      location.pathname.includes(item.path)
    );
    setActiveMenuItem(activeIndex >= 0 ? activeIndex : 0);
  };

  // Call the findActiveMenuItem function on initial render and when the location changes
  React.useEffect(() => {
    findActiveMenuItem();
  });

  const handleClearLocalStorage = () => {
    localStorage.clear();
    // Any other logic you want to execute after clearing local storage
  };
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-title">
          <h2>Admin Panel</h2>
        </div>
        <div className="menu">
          <ul className="menu-ul">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={index === activeMenuItem ? 'active' : ''}
                onClick={() => setActiveMenuItem(index)}
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
            <li onClick={handleClearLocalStorage}>
              <Link to="/">
                <BiLogOut />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
