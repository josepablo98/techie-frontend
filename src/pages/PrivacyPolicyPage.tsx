import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";

const PrivacyPolicyPage = () => {
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
          Política de Privacidad
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          En Techie, tu privacidad es nuestra prioridad. Nos comprometemos a
          recopilar y gestionar tus datos de forma segura y transparente.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Recopilación de datos</h2>
        <p className="text-lg leading-relaxed mb-4">
          Recopilamos únicamente los datos necesarios para proporcionarte una
          experiencia personalizada y mejorar nuestros servicios. Esto incluye
          información como tu nombre, correo electrónico y preferencias de
          configuración.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Seguridad de los datos</h2>
        <p className="text-lg leading-relaxed mb-4">
          Implementamos medidas de seguridad avanzadas para proteger tus datos
          contra accesos no autorizados, pérdida o alteración. Tus datos están
          almacenados en servidores seguros y encriptados.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Uso de los datos</h2>
        <p className="text-lg leading-relaxed mb-4">
          Tus datos serán utilizados exclusivamente para proporcionarte los
          servicios de Techie y mejorar tu experiencia en la plataforma. Bajo
          ninguna circunstancia utilizaremos tus datos para entrenar modelos de
          inteligencia artificial ni los compartiremos con terceros sin tu
          consentimiento explícito.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Transparencia</h2>
        <p className="text-lg leading-relaxed">
          Nos comprometemos a informarte sobre cualquier cambio en nuestra
          política de privacidad y a garantizar que tengas control total sobre
          tus datos en todo momento.
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

export default PrivacyPolicyPage;