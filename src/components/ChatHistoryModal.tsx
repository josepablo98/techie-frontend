import { ChatHistoryModalProps } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

  useEffect(() => {
    if (open) {
      dispatch(startCheckingToken());
    }
  }, [open, dispatch]);

  const handleChatClick = (chatId: number) => {
    onClose();
    navigate(`/chat/${chatId}`, { replace: true });
  };

  if (!open) return null;

  // Clases condicionales según el tema para el modal contenedor
  const modalClasses =
    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-black";

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

  console.table(chats)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`w-[28rem] rounded shadow-lg ${modalClasses}`}>
        <div className="p-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold">
            {language === "en" && "Chat History"}
            {language === "es" && "Historial de Chats"}
            {!["en", "es"].includes(language) && "Historial de Chats"}
          </h2>
        </div>
        <ul className="max-h-64 overflow-y-auto divide-y divide-gray-600">
          {sortedChats.length > 0 ? (
            sortedChats.map((chat) => (
              <li key={chat.id}>
                <button
                  className={`w-full text-left p-2 hover:bg-gray-700 ${
                    theme === "dark"
                      ? "text-gray-100"
                      : "hover:bg-gray-100 text-black"
                  }`}
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">{chat.title}</span>
                    <span className="text-sm text-gray-400">
                      <span className="text-sm text-gray-400">
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
                    </span>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="p-2">
              {language === "en" && "No chats available."}
              {language === "es" && "No hay chats disponibles."}
              {!["en", "es"].includes(language) && "No hay chats disponibles."}
            </li>
          )}
        </ul>
        <div className="p-2 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-gray-300 hover:bg-gray-400"
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
