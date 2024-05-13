/* eslint-disable react-refresh/only-export-components */
import {
  HomeOutlined,
  AudioOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Loading from "../components/Loading/Loading";
import { LABEL, TEXT } from "../localization/en";
import { getLocalStorage } from "../utils/storage";

const delayRoute = (ms = 500) => {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        })
    );
};

// eslint-disable-next-line react/prop-types
const RequiredAuth = ({ children, path }) => {
  const location = useLocation();
  return getLocalStorage("tempUser") ? (
    children
  ) : (
    <Navigate to={path} state={{ from: location }} />
  );
};

//Auth Route
// const registerPage = {
//   path: "auth/register",
//   component: lazy(() =>
//     delayRoute()(import("../modules/auth/features/register"))
//   ),
// };
const loginPage = {
  path: "auth/login",
  component: lazy(() => delayRoute()(import("../modules/auth/features/login"))),
};

const registerPage = {
  path: "auth/register",
  component: lazy(() => delayRoute()(import("../modules/auth/features/register"))),
};

//Private Route
const homePage = {
  path: "/",
  component: lazy(() => delayRoute()(import("../modules/home/features/home"))),
  title: LABEL.dashBoard,
  icon: <HomeOutlined />,
};
const driverPage = {
  path: "/profile",
  component: lazy(() =>
    delayRoute()(import("../modules/driver/features/driverPage"))
  ),
  title: TEXT.driver.driver,
  icon: <UserOutlined />,
};
const audioPage = {
  path: "/audio-management",
  component: lazy(() =>
    delayRoute()(import("../modules/audio/features/audio"))
  ),
  title: LABEL.audio,
  icon: <AudioOutlined />,
};
const playlistPage = {
  path: "/playlist-management",
  component: lazy(() =>
    delayRoute()(import("../modules/playlist/features/playlistPage"))
  ),
  title: TEXT.playlist.playlist,
  icon: <UnorderedListOutlined />,
};
const assignmentPage = {
  path: "/assignment-management",
  component: lazy(() =>
    delayRoute()(import("../modules/assignment/features/assignment"))
  ),
  title: LABEL.assignment,
  icon: <AudioOutlined />,
};

export const publicRoutesData = [loginPage, registerPage];
export const privateRouteData = [assignmentPage];

const publicRoutes = () => {
  return publicRoutesData.map((route, index) => {
    const { component: Component, path, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`public-route-${index}`}
        path={path}
        element={
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        }
        exact
      />
    );
  });
};

const privateRoutes = () => {
  return privateRouteData.map((route, index) => {
    const { component: Component, path, title, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`private-route-${index}`}
        path={path}
        element={
          <AppLayout title={title}>
            <RequiredAuth path={"/auth/login"}>
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </RequiredAuth>
          </AppLayout>
        }
      />
    );
  });
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes()}
        {privateRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
