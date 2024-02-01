import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "./SignInPage";
import { SignoutPage } from "./SignOutPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashboardPage } from "./DashboardPage";
import { ItemsPage } from "./ItemPage";
import { CreediansPage } from "./creedian/CreediansPage";
import { ChargeLogPage } from "./creedian/ChargeLogPage";
import { UseLogPage } from "./creedian/UseLogPage";
import { MainLayout } from "./Layout";

export const itemTypeRoute = 'route';
export const itemTypeItem = 'item';
export const itemTypeHeader = 'header';
export const itemTypeSeparate = 'separate';

const genRouteItem = (type, label = '', link = '', elem = null, isPriv = true) => {
  var ret = null;
  if (type === itemTypeItem) {
    ret = {
      type,
      label,
      link,
      elem,
      isPriv,
    };
  } else if (type === itemTypeRoute) {
    ret = {
      type,
      link,
      elem,
    };
  } else if (type === itemTypeHeader) {
    ret = {
      type,
      label,
    }
  } else if (type === itemTypeSeparate) {
    ret = {
      type,
    };
  } else {
    ret = null;
  }
  return ret;
}

export const mainRouteItems = [
  genRouteItem(
    itemTypeSeparate,
  ),
  genRouteItem(
    itemTypeHeader,
    'Main Menu',
  ),
  genRouteItem(
    itemTypeItem,
    'Dashboard',
    'dashboard',
    DashboardPage,
  ),
  genRouteItem(
    itemTypeItem,
    'Items',
    'items',
    ItemsPage,
  ),
  genRouteItem(
    itemTypeSeparate,
  ),
  genRouteItem(
    itemTypeHeader,
    'Creedians',
  ),
  genRouteItem(
    itemTypeItem,
    'Creedians',
    'creedians',
    CreediansPage,
  ),
  genRouteItem(
    itemTypeItem,
    'Charge Log',
    'charge-log',
    ChargeLogPage,
  ),
  genRouteItem(
    itemTypeItem,
    'Use Log',
    'use-log',
    UseLogPage,
  ),
  genRouteItem(
    itemTypeSeparate,
  ),
  genRouteItem(
    itemTypeItem,
    'Sign Out',
    'sign-out',
    SignoutPage,
    false,
  ),
];

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path='sign-in' element={<SignInPage />} />
      <Route path='' element={<MainLayout />} >
        {mainRouteItems.map((route) => (
          (route.type === itemTypeRoute || route.type === itemTypeItem)
            ? (
              <Route key={route.link} path={route.link} element={
                route.isPriv
                  ? <ProtectedRoute><route.elem /></ProtectedRoute>
                  : <route.elem />
              } />)
            : null
        ))}
        <Route path='' element={<Navigate to='dashboard' />} />
        <Route path='*' element={<Navigate to='dashboard' />} />
      </Route>
    </Routes>
  );
}
