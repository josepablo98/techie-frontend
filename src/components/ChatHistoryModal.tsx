import { ChatHistoryModalProps } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AppDispatch, RootState } from "../store";
import { startCheckingToken } from "../store/auth";

export const ChatHistoryModal = ({
  open,
  onClose,
  chats,
}: ChatHistoryModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, language } = useSelector((state: RootState) => state.settings);

  const [searchTerm, setSearchTerm] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      dispatch(startCheckingToken());
    }
  }, [open, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const handleChatClick = (chatId: number) => {
    onClose();
    navigate(`/chat/${chatId}`, { replace: true });
  };

  if (!open) return null;

  // Clases condicionales según el tema para el modal contenedor
  const modalClasses = `w-[28rem] rounded-2xl shadow-xl border transition-all duration-300 ${
    theme === "dark"
      ? "bg-zinc-800 border-zinc-700 text-zinc-100"
      : "bg-white border-zinc-300 text-zinc-900"
  }`;

  // Ordenar los chats por fecha descendente
  const sortedChats = [...chats].sort((a, b) => {
    const dateA = a.lastDate
      ? new Date(a.lastDate.replace(" ", "T")).getTime()
      : 0;
    const dateB = b.lastDate
      ? new Date(b.lastDate.replace(" ", "T")).getTime()
      : 0;
    return dateB - dateA;
  });

  // Filtrar los chats según el término de búsqueda
  const filteredChats = sortedChats.filter(
    (chat) =>
      chat.title && chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={modalClasses} ref={modalRef}>
        <div
          className={`p-5 border-b ${
            theme === "dark" ? "border-zinc-600" : "border-zinc-200"
          }`}
        >
          <h2 className="text-2xl font-semibold tracking-wide">
            {language === "en" && "Chat History"}
            {language === "es" && "Historial de Chats"}
            {!["en", "es"].includes(language) && "Historial de Chats"}
          </h2>
          <input
            type="text"
            placeholder={
              language === "en"
                ? "Search chats..."
                : language === "es"
                ? "Buscar chats..."
                : "Buscar chats..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mt-4 w-full p-2.5 rounded-lg border text-sm outline-none transition ${
              theme === "dark"
                ? "bg-zinc-700 text-zinc-100 border-zinc-600 focus:ring-2 focus:ring-zinc-500"
                : "bg-zinc-100 text-zinc-900 border-zinc-400 focus:ring-2 focus:ring-zinc-300"
            }`}
          />
        </div>
        <ul
          className={`max-h-64 overflow-y-auto ${
            theme === "dark"
              ? "divide-y divide-zinc-600 custom-scrollbar-dark"
              : "divide-y divide-zinc-100 custom-scrollbar-light"
          }`}
        >
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <li key={chat.id}>
                <button
                  className={`w-full text-left px-4 py-3 transition-colors duration-150 ${
                    theme === "dark"
                      ? "hover:bg-zinc-700 text-zinc-100"
                      : "hover:bg-zinc-100 text-zinc-900"
                  }`}
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-medium truncate">{chat.title}</span>
                    <span className="text-sm text-zinc-400">
                      {chat.lastDate
                        ? new Date(
                            chat.lastDate.replace(" ", "T")
                          ).toLocaleString(
                            language === "es" ? "es-ES" : "en-US"
                          )
                        : language === "es"
                        ? "Sin fecha"
                        : "No date"}
                    </span>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-zinc-400">
              {language === "en" && "No chats available."}
              {language === "es" && "No hay chats disponibles."}
              {!["en", "es"].includes(language) && "No hay chats disponibles."}
            </li>
          )}
        </ul>
        <div
          className={`p-4 flex justify-end border-t ${
            theme === "dark" ? "border-zinc-600" : "border-zinc-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              theme === "dark"
                ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
                : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
            }`}
          >
            {language === "en" && "Close"}
            {language === "es" && "Cerrar"}
            {!["en", "es"].includes(language) && "Cerrar"}
          </button>
        </div>
      </div>
    </div>
  );
};
