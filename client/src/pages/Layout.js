import { Bars3Icon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { itemTypeHeader, itemTypeItem, itemTypeSeparate, mainRouteItems } from "./Routes";

const SidebarItem = (item, index) => {
  const location = useLocation();
  const [curLink, setCurLink] = useState('');

  useEffect(() => {
    setCurLink(location.pathname.split('/')[1]);
  }, [location]);

  return (
    item.type === itemTypeItem
      ? (<Link key={item.link} to={item.link}>
        <li className={"menu-item " + (curLink === item.link ? 'menu-active' : '')}>
          <span>{item.label}</span>
        </li>
      </Link>)
      : (item.type === itemTypeHeader
        ? <span key={item.label} className="menu-title">{item.label}</span>
        : (item.type === itemTypeSeparate
          ? <div key={index} className="my-0 divider"></div>
          : null))
  );
}

export const MainLayout = () => {
  const [curRouteItem, setCurRouteItem] = useState({});
  const location = useLocation();
  const [curLink, setCurLink] = useState('');

  useEffect(() => {
    setCurLink(location.pathname.split('/')[1]);
  }, [location]);

  useEffect(() => {
    mainRouteItems.map((routeItem) => {
      if (routeItem.link && routeItem.link === curLink) {
        setCurRouteItem(routeItem);
      }
      return null;
    });
  }, [curLink]);

  return (
    <div className="h-[100vh] w-full bg-[url('./assets/bg-main.jpg')] bg-cover bg-center blend-hard-light">
      <div className='flex flex-row size-full backdrop-blur-sm bg-black/30'>
        <div className="flex-none sm:w-full sm:max-w-[12rem]">
          <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
          <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
          <aside className="justify-start h-[100vh] -translate-x-full sidebar sidebar-fixed-left sidebar-mobile max-sm:fixed sm:translate-x-0 w-[12rem] bg-gray-900/70 backdrop-blur-sm border-r border-gray-800">
            <section className="items-center p-4 sidebar-title">
              <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
                <rect height="100%" rx="16" width="100%"></rect>
                <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
              <div className="flex flex-col">
                <span>Admin Page</span>
                <span className="text-xs font-normal text-content2">Dekaron</span>
              </div>
            </section>
            <section className="sidebar-content">
              <nav className="rounded-md menu">
                <section className="px-4 menu-section">
                  <ul className="menu-items">
                    {mainRouteItems.map((item, index) => SidebarItem(item, index))}
                  </ul>
                </section>
              </nav>
            </section>
          </aside>
        </div>
        <div className="flex flex-col w-full px-4 pt-4">
          <div className="w-full h-auto">
            <div className="sticky mb-4 border border-gray-800 rounded-lg bg-black/50 navbar navbar-glass navbar-sticky">
              <div className="navbar-start">
                <label htmlFor="sidebar-mobile-fixed" className="p-4 bg-gray-700 rounded-md btn-primary btn sm:hidden">
                  <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                </label>
              </div>
              <div className="navbar-end">
                <span className="navbar-item">{curRouteItem.label}</span>
              </div>
            </div>
            <div className='bg-black/50 h-[calc(100vh-6.6rem)] rounded-lg p-4 border-gray-800'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
