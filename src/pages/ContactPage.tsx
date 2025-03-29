import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";

const ContactPage = () => {
  const { theme } = useSelector((state: RootState) => state.settings);

  // Clases condicionales según el tema
  const containerClasses =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-black";

  const cardClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-200 shadow-lg"
      : "bg-white text-gray-800 shadow-md";

  return (
    <div
      className={`flex items-center justify-center h-screen ${containerClasses}`}
    >
      <div className={`max-w-4xl w-full rounded-lg p-8 ${cardClasses}`}>
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Contacto
        </h1>
        <p className="text-lg leading-relaxed text-center">
          Si necesitas ponerte en contacto con nosotros, puedes escribirnos a:
        </p>
        <p className="text-lg leading-relaxed text-center mt-4">
          <a
            href="mailto:josruiper5@alum.us.es"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            josruiper5@alum.us.es
          </a>
        </p>
        <div className="mt-6 text-center">
          <NavLink
            to="/chat"
            className="text-blue-600 dark:text-blue-400 hover:underline text-xl font-semibold"
          >
            ← Atrás
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;