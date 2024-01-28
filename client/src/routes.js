/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/** 
  All of the routes for the Vision UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Vision UI Dashboard React layouts

import { CreedianCreedians } from "pages/creedian/Creedians"
import { CreedianChargeLog } from "pages/creedian/ChargeLog";
import { CreedianUseLog } from "pages/creedian/UseLog";

// Vision UI Dashboard React icons
import { BsCreditCardFill } from "react-icons/bs";
import {
  IoHome,
} from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { Items } from "pages/Items";
import { Dashboard } from "pages/Dashboard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    elem: Dashboard,
    noCollapse: true,
  },
  { type: "title", title: "Items", key: "items-pages" },
  {
    type: "collapse",
    name: "Items",
    key: "items",
    route: "items",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    elem: Items,
    noCollapse: true,
  },
  { type: "title", title: "Creedian", key: "creedians-pages" },
  {
    type: "collapse",
    name: "Creedians",
    key: "creedians",
    route: "creedians",
    icon: <RiMoneyDollarCircleFill size="15px" color="inherit" />,
    elem: CreedianCreedians,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Charge Log",
    key: "charge-log",
    route: "charge-log",
    icon: <HiTrendingUp size="15px" color="inherit" />,
    elem: CreedianChargeLog,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Use Log",
    key: "use-log",
    route: "use-log",
    icon: <HiTrendingDown size="15px" color="inherit" />,
    elem: CreedianUseLog,
    noCollapse: true,
  },
];

export default routes;
