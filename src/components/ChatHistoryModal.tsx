import { ChatHistoryModalProps } from "../interfaces";
import { checkToken } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../store";

export const ChatHistoryModal = ({ open, onClose, chats }: ChatHistoryModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, language } = useSelector((state : RootState) => state.settings);

  useEffect(() => {
    if (open) {
      checkToken({ dispatch });
    }
  }, [open, dispatch]);

  const handleChatClick = (chatId: number) => {
    onClose();
    navigate(`/chat/${chatId}`, { replace: true });
  };

  if (!open) return null;

  // Clases condicionales según el tema para el modal contenedor
  const modalClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-100"
      : "bg-white text-black";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`w-80 rounded shadow-lg ${modalClasses}`}>
        <div className="p-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold">
            {language === "en" && "Chat History"}
            {language === "es" && "Historial de Chats"}
            {!["en", "es"].includes(language) && "Historial de Chats"}
          </h2>
        </div>
        <ul className="max-h-64 overflow-y-auto">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li key={chat.id} className="border-b border-gray-600">
                <button
                  className={`w-full text-left p-2 hover:bg-gray-700 ${
                    theme === "dark" ? "text-gray-100" : "hover:bg-gray-100 text-black"
                  }`}
                  onClick={() => handleChatClick(chat.id)}
                >
                  {chat.title}
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
              theme === "dark" ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"
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
