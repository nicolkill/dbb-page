import React, {useContext} from "react";
import { Outlet } from "react-router-dom";

import {StateContext} from "../../state/global_state/StateProvider";
import DashboardComponent from "../../components/ui/dashboard/Dashboard";
import Dropdown from "../../components/Dropdown";


const DROPDOWN_MENU = [
  {
    text: "Profile",
    path: "/dashboard/profile",
  },
  {
    text: "Sign out",
    path: "/sign_out",
  },
];
const MENU = [
  {
    text: "Products",
    path: "/dashboard/products",
  },
  {
    text: "Search",
    path: "/dashboard/search",
  },
  {
    text: "Profile",
    path: "/dashboard/profile",
  },
  {
    align: "right",
    desktop: true,
    element: (
      <Dropdown key="dropdown"  options={[{
        text: "Nothing to show",
        func: () => { console.log("dummy notification") },
      }]}>
        <span className="material-icons text-lg text-white hover:bg-primary-200 p-1">notifications</span>
      </Dropdown>
    ),
  },
  {
    align: "right",
    mobile: true,
    element: <MobileProfileMini key="notifications" />,
  },
  {
    align: "right",
    desktop: true,
    element: (
      <Dropdown key="dropdown"  options={DROPDOWN_MENU}>
        <span className="material-icons text-lg text-white">person</span>
      </Dropdown>
    ),
  },
  {
    align: "right",
    mobile: true,
    text: "Sign out",
    path: "/sign_out",
  },
];

function MobileProfileMini() {
  const [state, ] = useContext(StateContext);

  return (
    <div className="flex items-center px-5">
      <div className="flex-shrink-0 pt-2">
        <span className="material-icons text-lg text-white">person</span>
      </div>
      <div className="ml-3">
        <div className="text-base font-medium leading-none text-white">{state.profile.attributes.first_name} {state.profile.attributes.last_name}</div>
        <div className="text-sm font-medium leading-none text-gray-400">{state.profile.attributes.email}</div>
      </div>

      <Dropdown
        key="dropdown"
        extraClasses="flex-shrink-0 ml-auto"
        options={[{
        text: "Nothing to show",
        func: () => { console.log("dummy notification") },
      }]}>
        <span className="material-icons text-lg text-white hover:bg-primary-200 p-1">notifications</span>
      </Dropdown>
    </div>
  );
}

function Dashboard() {
  return (
    <DashboardComponent
      menu={MENU}
      showTop={false}>
      <Outlet/>
    </DashboardComponent>
  );
}

export default Dashboard;
