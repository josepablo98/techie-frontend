// components/Header.tsx
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth";
import { AppDispatch, RootState } from "../store";
import { ChatHistoryModal } from "./ChatHistoryModal";
import { checkToken, getChatByUserIdAndChatId, getChatsByUserId } from "../helpers";
import { toast } from "react-toastify";
import { Chat } from "../interfaces";

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { chatId } = useParams<{ chatId: string }>();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tit, setTit] = useState("TECHIE");
  const [chats, setChats] = useState<Chat[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId && token) {
      getChatByUserIdAndChatId({ token, chatId: Number(chatId) })
        .then((chat) => setTit(chat[0].title))
        .catch(console.error);
    } else {
      setTit("TECHIE");
    }
  }, [chatId, token]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(startLogout());
    setIsMenuOpen(false);
  };

  const openModal = async () => {
    checkToken(dispatch);
    if (token) {
      try {
        const userChats = await getChatsByUserId({ token });
        if (userChats && userChats.length > 0) {
          setChats(userChats);
          setIsModalOpen(true);
        } else {
          toast.info("No hay chats disponibles");
        }
      } catch (error) {
        console.error("Error cargando chats:", error);
        toast.error("Error cargando chats");
      }
    }
    setIsMenuOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleNewChat = () => {
    navigate("/newchat", { replace: true });
    checkToken(dispatch);
    setIsMenuOpen(false);
  };

  // Clases condicionales para el header
  const headerClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-100"
      : "bg-blue-600 text-white";

  const dropdownClasses =
    theme === "dark"
      ? "bg-gray-700 text-gray-100"
      : "bg-blue-500 text-white";

  return (
    <>
      <header className={`${headerClasses} w-full`}>
        <div className="grid grid-cols-3 items-center px-4 py-2">
          <div>
            <span className="text-xl font-semibold">{`Buenas, ${name}`}</span>
          </div>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">{tit}</h1>
          </div>
          <div className="flex justify-end items-center space-x-2">
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
              onClick={handleNewChat}
            >
              Nuevo Chat
            </button>
            <button onClick={handleMenuToggle} className="p-2 hover:bg-blue-500 rounded">
              <MenuIcon />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`${dropdownClasses} py-2`}>
            <ul className="flex flex-col items-start px-4 space-y-2">
              <li>
                <NavLink
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:underline"
                >
                  Información de cuenta
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:underline"
                >
                  Configuración
                </NavLink>
              </li>
              <li>
                <button onClick={openModal} className="hover:underline">
                  Historial de chats
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-200 hover:text-red-300">
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <ChatHistoryModal open={isModalOpen} onClose={closeModal} chats={chats} />
    </>
  );
};
