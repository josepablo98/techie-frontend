import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const { theme, language } = useSelector((state: RootState) => state.settings);

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
          {language === "es" && "Política de Privacidad"}
          {language === "en" && "Privacy Policy"}
          {!["en", "es"].includes(language) && "Política de Privacidad"}
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          {language === "es" && `En Techie, tu privacidad es nuestra prioridad. Nos comprometemos a
          recopilar y gestionar tus datos de forma segura y transparente.`}
          {language === "en" && `At Techie, your privacy is our priority. We are committed to
          collecting and managing your data securely and transparently.`}
          {!["en", "es"].includes(language) && `En Techie, tu privacidad es nuestra prioridad. Nos comprometemos a
          recopilar y gestionar tus datos de forma segura y transparente.`}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          {language === "es" && "1. Recopilación de datos"}
          {language === "en" && "1. Data Collection"}
          {!["en", "es"].includes(language) && "1. Recopilación de datos"}
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          {language === "es" && `Recopilamos únicamente los datos necesarios para proporcionarte una
          experiencia personalizada y mejorar nuestros servicios. Esto incluye
          información como tu nombre, correo electrónico y preferencias de
          configuración.`}
          {language === "en" && `We only collect the data necessary to provide you with a
          personalized experience and improve our services. This includes
          information such as your name, email address, and configuration
          preferences.`}
          {!["en", "es"].includes(language) && `Recopilamos únicamente los datos necesarios para proporcionarte una
          experiencia personalizada y mejorar nuestros servicios. Esto incluye
          información como tu nombre, correo electrónico y preferencias de
          configuración.`}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          {language === "es" && "2. Seguridad de los datos"}
          {language === "en" && "2. Data Security"}
          {!["en", "es"].includes(language) && "2. Seguridad de los datos"}
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          {language === "es" && `Implementamos medidas de seguridad avanzadas para proteger tus datos
          contra accesos no autorizados, pérdida o alteración. Tus datos están
          almacenados en servidores seguros y encriptados.`}
          {language === "en" && `We implement advanced security measures to protect your data
          against unauthorized access, loss, or alteration. Your data is stored
          on secure and encrypted servers.`}
          {!["en", "es"].includes(language) && `Implementamos medidas de seguridad avanzadas para proteger tus datos
          contra accesos no autorizados, pérdida o alteración. Tus datos están
          almacenados en servidores seguros y encriptados.`}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          {language === "es" && "3. Uso de los datos"}
          {language === "en" && "3. Use of Data"}
          {!["en", "es"].includes(language) && "3. Uso de los datos"}
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          {language === "es" && `Tus datos serán utilizados exclusivamente para proporcionarte los
          servicios de Techie y mejorar tu experiencia en la plataforma. Bajo
          ninguna circunstancia utilizaremos tus datos para entrenar modelos de
          inteligencia artificial ni los compartiremos con terceros sin tu
          consentimiento explícito.`}
          {language === "en" && `Your data will be used exclusively to provide you with Techie's
          services and improve your experience on the platform. Under no
          circumstances will we use your data to train artificial intelligence
          models or share it with third parties without your explicit
          consent.`}
          {!["en", "es"].includes(language) && `Tus datos serán utilizados exclusivamente para proporcionarte los
          servicios de Techie y mejorar tu experiencia en la plataforma. Bajo
          ninguna circunstancia utilizaremos tus datos para entrenar modelos de
          inteligencia artificial ni los compartiremos con terceros sin tu
          consentimiento explícito.`}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          {language === "es" && "4. Transparencia"}
          {language === "en" && "4. Transparency"}
          {!["en", "es"].includes(language) && "4. Transparencia"}
        </h2>
        <p className="text-lg leading-relaxed">
          {language === "es" && `Nos comprometemos a informarte sobre cualquier cambio en nuestra
          política de privacidad y a garantizar que tengas control total sobre
          tus datos en todo momento.`}
          {language === "en" && `We are committed to informing you about any changes to our
          privacy policy and ensuring that you have full control over your data
          at all times.`}
          {!["en", "es"].includes(language) && `Nos comprometemos a informarte sobre cualquier cambio en nuestra
          política de privacidad y a garantizar que tengas control total sobre
          tus datos en todo momento.`}
        </p>
        <div className="mt-6 text-center">
            <NavLink
                to="/chat"
                className="text-blue-600 dark:text-blue-400 hover:underline text-xl font-semibold"
            >
                {language === "es" && "← Atrás"}
                {language === "en" && "← Back"}
                {!["en", "es"].includes(language) && "← Atrás"}
            </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;