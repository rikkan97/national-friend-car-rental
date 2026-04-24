import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Fleet } from "./pages/Fleet";
import { Thasos } from "./pages/Thasos";
import { Terms } from "./pages/Terms";
import { Contact } from "./pages/Contact";
import { ScrollToTop } from "./components/ScrollToTop";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/fleet",
        Component: Fleet,
      },
      {
        path: "/thasos",
        Component: Thasos,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
]);