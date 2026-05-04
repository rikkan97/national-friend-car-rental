import { createBrowserRouter, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { Fleet } from "./pages/Fleet";
import { Thasos } from "./pages/Thasos";
import { Terms } from "./pages/Terms";
import { Contact } from "./pages/Contact";
import { ScrollToTop } from "./components/ScrollToTop";
import { useT } from "../i18n/LanguageContext";

function Layout() {
  const { lang } = useT();
  const location = useLocation();
  const navigate = useNavigate();

  // Keep URL prefix in sync with selected language
  useEffect(() => {
    const path = location.pathname;
    const other = lang === "el" ? "en" : "el";
    if (path === `/${other}` || path.startsWith(`/${other}/`)) {
      const next = path.replace(new RegExp(`^/${other}`), `/${lang}`);
      navigate(next + location.search + location.hash, { replace: true });
    }
  }, [lang, location.pathname, location.search, location.hash, navigate]);

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
      { path: "/",                       Component: Home },
      { path: "/el",                     Component: Home },
      { path: "/el/our-cars",            Component: Fleet },
      { path: "/el/thassos",             Component: Thasos },
      { path: "/el/rental-conditions",   Component: Terms },
      { path: "/en",                     Component: Home },
      { path: "/en/our-cars",            Component: Fleet },
      { path: "/en/thassos",             Component: Thasos },
      { path: "/en/rental-conditions",   Component: Terms },
      { path: "/contact",                Component: Contact },
    ],
  },
]);