import { ChatHistoryModalProps } from "../interfaces";
import { checkToken } from "../helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ChatHistoryModal = ({ open, onClose, chats }: ChatHistoryModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cuando se abra el modal, por ejemplo, podemos verificar el token
  useEffect(() => {
    if (open) {
      checkToken(dispatch);
    }
  }, [open, dispatch]);

  const handleChatClick = (chatId: number) => {
    onClose();
    navigate(`/chat/${chatId}`, { replace: true });
  };

  if (!open) return null; // Si no está abierto, no renderiza nada

  return (
    // Contenedor principal del modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenedor interno (caja blanca) */}
      <div className="bg-white w-80 rounded shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Historial de Chats</h2>
        </div>
        <ul className="max-h-64 overflow-y-auto">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li key={chat.id} className="border-b">
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={() => handleChatClick(chat.id)}
                >
                  {chat.title}
                </button>
              </li>
            ))
          ) : (
            <li className="p-2">No hay chats disponibles</li>
          )}
        </ul>
        <div className="p-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
