import { lazy } from "react";

const Home = lazy(() => import("business/home/Home"));
const About = lazy(() => import("business/about/About"));
const UserAdmin = lazy(() => import("business/admin/user/UserAdmin"));

interface RouteItem {
  label: string;
  path: string;
  exact?: boolean;
  component: any;
  routes?: [RouteItem];
}
const routes: RouteItem[] = [
  {
    label: "A propos",
    path: "/about",
    component: About
  },
  {
    label: "User Admin",
    path: "/admin/user",
    exact: true,
    component: UserAdmin
  },
  {
    label: "Home",
    path: "/",
    exact: true,
    component: Home
  },
 
];

export default routes;
