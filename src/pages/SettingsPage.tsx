// pages/SettingsPage.tsx
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { getChatsByUserId, deleteChat, checkToken, deleteAllChats } from "../helpers";
import { updateSettingsThunk } from "../store/settings/thunks";
import { Chat } from "../interfaces";
import { NavLink } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Leemos los ajustes actuales desde Redux
  const { theme, language, detailLevel, tempChats } = useSelector(
    (state: RootState) => state.settings
  );

  // Para manejar el formulario localmente (si quieres)
  const [localForm, setLocalForm] = useState({
    theme: theme ?? "light",
    language: language ?? "es",
    detailLevel: detailLevel ?? "simplified",
    tempChats: tempChats ?? false,
  });

  // Cargar chats
  useEffect(() => {
    checkToken(dispatch);
    setIsLoading(true);
    getChatsByUserId()
      .then((data) => {
        setChats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

  }, []);

  // Sincronizar el store -> formulario si se cambia en otra parte
  useEffect(() => {
    setLocalForm({
      theme: theme ?? "light",
      language: language ?? "es",
      detailLevel: detailLevel ?? "simplified",
      tempChats: tempChats ?? false,
    });
  }, [theme, language, detailLevel, tempChats]);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Manejador de inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    setLocalForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const hasChanges = () => {
    return (
      localForm.theme !== (theme ?? "light") ||
      localForm.language !== (language ?? "es") ||
      localForm.detailLevel !== (detailLevel ?? "simplified") ||
      localForm.tempChats !== (tempChats ?? false)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviamos la actualización al backend y al store
    dispatch(
      updateSettingsThunk({
        theme: localForm.theme,
        language: localForm.language,
        detailLevel: localForm.detailLevel,
        autoSaveChats: localForm.tempChats ? 0 : 1,
      })
    );
  };

  const handleDeleteChat = async (chatId: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el chat permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const resp = await deleteChat({ chatId });
      if (resp.ok) {
        setChats((prev) => prev.filter((chat) => chat.id !== chatId));
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }

    }
  };

  const handleDeleteAllChats = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará todos los chats permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar todos",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const resp = await deleteAllChats();
      if (resp.ok) {
        setChats([]);
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }
    }
  };

  // Clases en base al theme
  const cardClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-100"
      : "bg-white text-black";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
              className={`border border-gray-300 rounded w-full p-2 ${theme === "dark"
                ? "bg-gray-700 text-gray-100 border-gray-600"
                : "bg-white text-black border-gray-300"
                }`}
              value={localForm.theme}
              onChange={handleInputChange}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Idioma</label>
            <select
              name="language"
              className={`border border-gray-300 rounded w-full p-2 ${theme === "dark"
                ? "bg-gray-700 text-gray-100 border-gray-600"
                : "bg-white text-black border-gray-300"
                }`}
              value={localForm.language}
              onChange={handleInputChange}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nivel de detalle</label>
            <select
              name="detailLevel"
              className={`border border-gray-300 rounded w-full p-2 ${theme === "dark"
                ? "bg-gray-700 text-gray-100 border-gray-600"
                : "bg-white text-black border-gray-300"
                }`}
              value={localForm.detailLevel}
              onChange={handleInputChange}
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
              checked={localForm.tempChats}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 ${!hasChanges() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={!hasChanges()}
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
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
                <li className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    onClick={handleDeleteAllChats}
                  >
                    Eliminar todos los chats
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;