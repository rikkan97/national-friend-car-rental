import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "../i18n/LanguageContext";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
        <RouterProvider router={router} />
      </MotionConfig>
    </LanguageProvider>
  );
}
