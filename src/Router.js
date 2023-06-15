import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React, { useContext, useEffect } from 'react';

import uListApi from "./services/uListApi";
import { StateProvider, StateContext } from "./state/global_state/StateProvider";
import { ClockProvider, ClockContext } from "./state/single_thread_clock/ClockProvider";

import Index from "./screens/landing/index/Index";
import Login from "./screens/landing/sessions/login/Login";
import Register from "./screens/landing/sessions/register/Register";
import Logout from "./screens/landing/sessions/logout/Logout";
import Landing from "./screens/landing/Landing";
import ProductCrawl from "./screens/landing/product_crawl/ProductCrawl";
import NotFound from "./screens/not_found/NotFound";
import Dashboard from "./screens/dashboard/Dashboard";
import Profile from "./screens/dashboard/profile/Profile";
import Products from "./screens/dashboard/products/Products";
import Search from "./screens/dashboard/search/Search";
import Redirect from "./screens/redirect/Redirect";
import NotificationDisplay from "./components/notifications/NotificationDisplay";

function Router() {
  return (
    <StateProvider>
      <StateInitializer>
        <ClockProvider>
          <ClockInitializer>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} >
                  <Route index element={<Index />} />
                  <Route path="products" element={<ProductCrawl />} />
                  <Route path="login" element={<AuthRoute element={Login} not />} />
                  <Route path="register" element={<AuthRoute element={Register} not />} />
                </Route>

                <Route path="/dashboard" element={<AuthRoute element={Dashboard} />} >
                  <Route index element={<Products />} />
                  <Route path="products" element={<Products />} />
                  <Route path="search" element={<Search />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="sign_out" element={<AuthRoute element={Logout} />} />
                <Route path="redirect" element={<Redirect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ClockInitializer>
        </ClockProvider>
      </StateInitializer>
    </StateProvider>
  );
}

function AuthRoute(props) {
  const [ state, ] = useContext(StateContext)

  if (state.session === null) {
    return;
  }
  if (props.not ? !state.session : state.session) {
    return React.createElement(props.element, props);
  }
  return <NotFound />;
}

function StateInitializer({ children }) {
  const [state, dispatch] = useContext(StateContext);

  const checkRemoteData = async () => {
    let response = await uListApi.profile();
    const profile = response.status === 200 ? response.body.data : null;
    dispatch({ type: "update_profile", newValue: profile });
  };

  useEffect(() => {
    if (!state.firstLoad) {
      checkRemoteData();
    }
  });

  return (
    <div>
      <NotificationDisplay />
      { children }
    </div>
  );
}

function ClockInitializer({children}) {
  const [state, dispatch] = useContext(ClockContext);

  useEffect(() => {
    if (!state.firstLoad) {
      setTimeout(() => {
        dispatch({ type: "update" });
      }, 100);
    }
  });

  return (
    <div>
      {children}
    </div>
  );
}

export default Router;
