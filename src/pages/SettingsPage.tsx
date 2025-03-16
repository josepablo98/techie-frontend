import { useState, useEffect } from "react";
import { getChatsByUserId, deleteChat, checkToken } from "../helpers";
import { useDispatch } from "react-redux";
import { Chat } from "../interfaces";

/**
 * Simulación de un "Accordion" con Tailwind:
 * - Usa un estado local `isAccordionOpen` para mostrar/ocultar la lista.
 */
export const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("es");
  const [detailLevel, setDetailLevel] = useState("simplified");
  const [tempChats, setTempChats] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    checkToken(dispatch);
    const token = localStorage.getItem("token");
    if (token) {
      getChatsByUserId({ token })
        .then(setChats)
        .catch(console.error);
    }
  }, [dispatch]);

  const handleDeleteChat = async (chatId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      await deleteChat({ token, chatId });
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Configuración</h1>

        {/* Campo: Tema */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tema</label>
          <select
            className="border border-gray-300 rounded w-full p-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>

        {/* Campo: Idioma */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Idioma</label>
          <select
            className="border border-gray-300 rounded w-full p-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>

        {/* Campo: Nivel de detalle */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nivel de detalle</label>
          <select
            className="border border-gray-300 rounded w-full p-2"
            value={detailLevel}
            onChange={(e) => setDetailLevel(e.target.value)}
          >
            <option value="simplified">Simplificado</option>
            <option value="detailed">Extenso</option>
          </select>
        </div>

        {/* Chats temporales */}
        <div className="flex items-center justify-between my-4">
          <span className="font-semibold">Chats temporales</span>
          <input
            type="checkbox"
            className="toggle-checkbox h-5 w-5"
            checked={tempChats}
            onChange={(e) => setTempChats(e.target.checked)}
          />
        </div>

        {/* "Accordion" para Eliminar Chats */}
        {
          chats && chats.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <button
                type="button"
                className="flex items-center justify-between w-full font-semibold"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              >
                <span>Eliminar Chats</span>
                <span>{isAccordionOpen ? "▲" : "▼"}</span>
              </button>
              {isAccordionOpen && (
                <ul className="mt-2 space-y-2">
                  {chats.map((chat) => (
                    <li
                      key={chat.id}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <span>{chat.title}</span>
                      <button
                        className="text-red-600 font-semibold hover:underline"
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};
