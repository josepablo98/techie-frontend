import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { getChatsByUserId } from "../helpers";
import { NavLink } from "react-router-dom";

const AccountInformationPage = () => {
    const { name, email } = useSelector((state: RootState) => state.auth);
    const { theme } = useSelector((state: RootState) => state.settings); // Obtener el tema
    const [chatCount, setChatCount] = useState<number | null>(null);

    useEffect(() => {
        getChatsByUserId()
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
                <h1 className="text-2xl font-bold mb-4">Información de la Cuenta</h1>
                <div className="mb-4">
                    <label className="block font-semibold">Nombre de Usuario</label>
                    <span>{name || "No disponible"}</span>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Correo Electrónico</label>
                    <span>{email || "No disponible"}</span>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Número de Chats</label>
                    <span>{chatCount !== null ? chatCount : "Cargando..."}</span>
                </div>
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

export default AccountInformationPage;