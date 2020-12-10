/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import GroupIcon from '@material-ui/icons/Group';
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import StoreIcon from '@material-ui/icons/Store';
import PaletteIcon from '@material-ui/icons/Palette';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Users from "views/Users/Users.js";
import Shops from "views/Shops/Shops.js";
import Reports from "views/Reports/Report";
import Ads from "views/Ads/Ads";
import AddAdmin from "views/AddAdmin/AddAdmin";
import ChangePassword from "views/ChangePassword/ChangePassword";
import Admins from "views/Admins/Admins";
import Categories from "views/Products/Categories";
import Products from "views/Products/Products.js"
import ShopDetails from "views/Shops/ShopDetails"
import ProductDetails from "views/Products/ProductDetails"
import AddAds from "views/Ads/AddAd";
import Campus from "views/Campus/Campus";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: GroupIcon,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/shops",
    name: "Shops",
    icon: StoreIcon,
    component: Shops,
    layout: "/admin"
  },
  {
    path: "/shop-details",
    name: "Shop",
    icon: StoreIcon,
    invisible:true,
    component: ShopDetails,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Products",
    icon: PaletteIcon,
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: LibraryBooks,
    invisible:true,
    component: Products,
    layout: "/admin"
  }, 
  {
    path: "/product-details",
    name: "Products",
    icon: LibraryBooks,
    invisible:true,
    component: ProductDetails,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: LibraryBooks,
    invisible:true,
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/campuses",
    name: "Campuses",
    icon:Person,
    component: Campus,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: LibraryBooks,
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/manage-ads",
    name: "Ads Control",
    icon: Notifications,
    component: Ads,
    layout: "/admin"
  },
  {
    path: "/add-ads",
    name: "Ads Control",
    icon: Notifications,
    invisible:true,
    component: AddAds,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/create-admin",
    name: "Create Admin",
    icon: Person,
    invisible:true,
    component: AddAdmin,
    layout: "/admin"
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon:Person,
    component: ChangePassword,
    layout: "/admin"
  },
 
];

export default dashboardRoutes;
