import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";

const AboutPage = () => {
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
                    Acerca de Techie
                </h1>
                <p className="text-lg leading-relaxed mb-4">
                    Techie es una plataforma diseñada para ayudarte a aprender y explorar
                    conceptos de programación de manera interactiva y personalizada.
                    Nuestro objetivo es proporcionar una experiencia educativa
                    enriquecedora mediante el uso de tecnologías modernas como chatbots
                    impulsados por modelos de lenguaje avanzado.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    Con Techie, puedes:
                </p>
                <ul className="list-disc list-inside text-lg mb-4">
                    <li>Iniciar chats interactivos con un chatbot especializado en programación de Python.</li>
                    <li>Guardar y revisar tus conversaciones para futuras referencias.</li>
                    <li>Personalizar la experiencia según tus preferencias, como idioma, nivel de detalle y más.</li>
                </ul>
                <p className="text-lg leading-relaxed">
                    Estamos comprometidos con la seguridad, accesibilidad y usabilidad
                    para garantizar que tengas la mejor experiencia posible. ¡Gracias por
                    elegir Techie como tu compañero de aprendizaje!
                </p>
                <div className="mt-4 text-center">
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

export default AboutPage;