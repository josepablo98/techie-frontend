import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { getChatsByUserId } from "../helpers";
import { NavLink } from "react-router-dom";

const AccountInformationPage = () => {
    const { name, email } = useSelector((state: RootState) => state.auth);
    const { theme, language } = useSelector((state: RootState) => state.settings); // Obtener el tema
    const [chatCount, setChatCount] = useState<number | null>(null);

    useEffect(() => {
        getChatsByUserId({ language })
            .then((chats) => setChatCount(chats.length))
            .catch((error) => {
                console.error("Error al obtener los chats:", error);
                setChatCount(null);
            });
    }, []);

    // Clases dinámicas basadas en el tema
    const containerClasses =
        theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-100 text-black";

    const cardClasses =
        theme === "dark"
            ? "bg-gray-800 text-gray-100 shadow-md"
            : "bg-white text-black shadow-md";

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${containerClasses}`}>
            <div className={`rounded p-6 w-full max-w-md ${cardClasses}`}>
                <h1 className="text-2xl font-bold mb-4">
                    {language === "es" && "Información de la Cuenta"}
                    {language === "en" && "Account Information"}
                    {!["es", "en"].includes(language) && "Account Information"}
                </h1>
                <div className="mb-4">
                    <label className="block font-semibold">
                        {language === "es" && "Nombre de Usuario"}
                        {language === "en" && "Username"}
                        {!["es", "en"].includes(language) && "Username"}
                    </label>
                    <span>{name || "No disponible"}</span>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">
                        {language === "es" && "Correo Electrónico"}
                        {language === "en" && "Email"}
                        {!["es", "en"].includes(language) && "Email"}
                    </label>
                    <span>{email || (language === "es" ? "No disponible" : "Unavailable")}</span>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">
                        {language === "es" && "Número de Chats"}
                        {language === "en" && "Number of Chats"}
                        {!["es", "en"].includes(language) && "Number of Chats"}
                    </label>
                    <span>{chatCount !== null ? chatCount : (language === "es" ? "Cargando..." : "Loading...")}</span>
                </div>
                <div className="mt-6 text-center">
                    <NavLink
                        to="/chat"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xl font-semibold"
                    >
                        {language === "es" && "← Atrás"}
                        {language === "en" && "← Back"}
                        {!["es", "en"].includes(language) && "← Back"}
                    </NavLink>
                </div>
            </div>
        </div>

    );
};

export default AccountInformationPage;