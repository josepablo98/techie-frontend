import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const { theme, language } = useSelector((state: RootState) => state.settings);

  const footerClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-200"
      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";

  return (
    <footer className={`${footerClasses} mt-1 py-2 shadow-lg`}>
      <div className="w-full flex justify-center px-4">
        <nav className="flex space-x-6">
          <NavLink to="/about" className="hover:underline">
            {language === "en" && "About"}
            {language === "es" && "Acerca de"}
            {!["en", "es"].includes(language) && "Acerca de"}
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            {language === "en" && "Contact"}
            {language === "es" && "Contacto"}
            {!["en", "es"].includes(language) && "Contacto"}
          </NavLink>
          <NavLink to="/privacy" className="hover:underline">
            {language === "en" && "Privacy Policy"}
            {language === "es" && "Política de Privacidad"}
            {!["en", "es"].includes(language) && "Política de Privacidad"}
          </NavLink>
        </nav>
      </div>
      <div className="border-t border-white mt-2 opacity-20"></div>
      <p className="text-center text-sm opacity-75 mt-1">
        &copy; {new Date().getFullYear()} Techie. {language === "en" ? "All rights reserved." : "Todos los derechos reservados."}
      </p>
    </footer>
  );
};
