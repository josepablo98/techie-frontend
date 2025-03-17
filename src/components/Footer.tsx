// components/Footer.tsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-200"
      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";

  return (
    <footer className={`${footerClasses} mt-1 py-2 shadow-lg`}>
      <div className="w-full flex justify-center px-4">
        <nav className="flex space-x-6">
          <a href="/about" className="hover:underline">
            Acerca de
          </a>
          <a href="/contact" className="hover:underline">
            Contacto
          </a>
          <a href="/privacy" className="hover:underline">
            Política de privacidad
          </a>
        </nav>
      </div>
      <div className="border-t border-white mt-2 opacity-20"></div>
      <p className="text-center text-sm opacity-75 mt-1">
        &copy; {new Date().getFullYear()} Techie. Todos los derechos reservados.
      </p>
    </footer>
  );
};
