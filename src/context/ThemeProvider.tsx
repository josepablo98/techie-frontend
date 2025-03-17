import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSettings } from "../helpers";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getSettings({ token })
        .then((data) => {
          if (data?.settings && data.settings.length > 0) {
            const fetchedTheme = data.settings[0].theme as "light" | "dark";
            setTheme(fetchedTheme);
          }
        })
        .catch(console.error);
    }
  }, [dispatch, token]);

  // Clases globales para fondo y texto, aplicadas a un contenedor que envuelve todo
  const containerClasses =
    theme === "dark"
      ? "min-h-screen bg-gray-900 text-gray-100"
      : "min-h-screen bg-gray-100 text-black";
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={containerClasses}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};