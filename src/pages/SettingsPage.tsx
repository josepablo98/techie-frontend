import { useState, useEffect, ChangeEvent, FormEvent, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { getChatsByUserId, deleteChat, checkToken, getSettings, updateSettings } from "../helpers";
import { useDispatch } from "react-redux";
import { Chat } from "../interfaces";
import { LoadingPage } from "./LoadingPage";
import { ThemeContext } from "../context/ThemeContext";

// Interfaz para nuestros settings
interface SettingsForm {
  theme: string;
  language: string;
  detailLevel: string;
  tempChats: boolean;
}

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [chats, setChats] = useState<Chat[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [formState, setFormState] = useState<SettingsForm | null>(null);
  const [oldSettings, setOldSettings] = useState<SettingsForm | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const initialLoaded = useRef(false);

  // Obtenemos el tema desde el contexto
  const { theme } = useContext(ThemeContext);

  // Cargar settings iniciales (solo una vez)
  useEffect(() => {
    checkToken(dispatch);
    if (token && !initialLoaded.current) {
      getSettings({ token })
        .then((data) => {
          if (data?.settings && data.settings.length > 0) {
            const settings = data.settings[0];
            const initialSettings: SettingsForm = {
              theme: settings.theme,
              language: settings.language,
              detailLevel: settings.detailLevel,
              tempChats: settings.autoSaveChats,
            };
            setFormState(initialSettings);
            setOldSettings(initialSettings);
            initialLoaded.current = true;
          }
        })
        .catch(console.error);
    }
  }, [dispatch, token]);

  // Cargar chats para el accordion
  useEffect(() => {
    checkToken(dispatch);
    if (token) {
      getChatsByUserId({ token })
        .then(setChats)
        .catch(console.error);
    }
  }, [dispatch, token]);

  // Si no se han cargado los settings, mostramos LoadingPage
  if (!formState) {
    return <LoadingPage />;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev!,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const hasChanges = () => {
    if (!oldSettings || !formState) return false;
    return (
      formState.theme !== oldSettings.theme ||
      formState.language !== oldSettings.language ||
      formState.detailLevel !== oldSettings.detailLevel ||
      formState.tempChats !== oldSettings.tempChats
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !oldSettings) return;

    setIsUpdating(true);
    const payload = {
      token,
      theme: formState.theme,
      language: formState.language,
      detailLevel: formState.detailLevel,
      autoSaveChats: formState.tempChats ? 1 : 0,
    };

    const response = await updateSettings(payload);
    if (response?.ok) {
      // Recargamos la página para aplicar el nuevo tema globalmente
      window.location.reload();
    } else {
      setIsUpdating(false);
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    if (token) {
      await deleteChat({ token, chatId });
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    }
  };

  // Clases para el "card" que envuelve el formulario
  const cardClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-100"
      : "bg-white text-black";

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className={`shadow-md rounded p-4 w-full max-w-xl ${cardClasses}`}>
        <h1 className="text-2xl font-bold mb-4">Configuración</h1>

        <NavLink to="/chat" className="block mb-4 text-blue-600 hover:underline">
          ← Atrás
        </NavLink>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tema</label>
            <select
              name="theme"
              className={`border border-gray-300 rounded w-full p-2 ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white text-black"
              }`}
              value={formState.theme}
              onChange={handleInputChange}
              disabled={isUpdating}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Idioma</label>
            <select
              name="language"
              className={`border border-gray-300 rounded w-full p-2 ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white text-black"
              }`}
              value={formState.language}
              onChange={handleInputChange}
              disabled={isUpdating}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nivel de detalle</label>
            <select
              name="detailLevel"
              className={`border border-gray-300 rounded w-full p-2 ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white text-black"
              }`}
              value={formState.detailLevel}
              onChange={handleInputChange}
              disabled={isUpdating}
            >
              <option value="simplified">Simplificado</option>
              <option value="detailed">Extenso</option>
            </select>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="font-semibold">Chats temporales</span>
            <input
              type="checkbox"
              name="tempChats"
              className="h-5 w-5"
              checked={formState.tempChats}
              onChange={handleInputChange}
              disabled={isUpdating}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 ${
                !hasChanges() || isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!hasChanges() || isUpdating}
            >
              Aplicar cambios
            </button>
          </div>
        </form>

        {chats && chats.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <button
              type="button"
              className="flex items-center justify-between w-full font-semibold"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              disabled={isUpdating}
            >
              <span>Eliminar Chats</span>
              <span>{isAccordionOpen ? "▲" : "▼"}</span>
            </button>
            {isAccordionOpen && (
              <ul className="mt-2 space-y-2">
                {chats.map((chat) => (
                  <li key={chat.id} className="flex items-center justify-between border-b py-2">
                    <span>{chat.title}</span>
                    <button
                      className="text-red-600 font-semibold hover:underline"
                      onClick={() => handleDeleteChat(chat.id)}
                      disabled={isUpdating}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
