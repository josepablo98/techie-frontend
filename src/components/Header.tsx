// components/Header.tsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startCheckingToken, startLogout } from "../store/auth";
import { AppDispatch, RootState } from "../store";
import { ChatHistoryModal } from "./ChatHistoryModal";
import { getChatByUserIdAndChatId, getChatsByUserId } from "../helpers";
import { toast } from "react-toastify";
import { Chat } from "../interfaces";

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Header = () => {
  const { theme, language } = useSelector((state: RootState) => state.settings);
  const { chatId } = useParams<{ chatId: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tit, setTit] = useState("TECHIE");
  const [chats, setChats] = useState<Chat[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId) {
      getChatByUserIdAndChatId({ chatId: Number(chatId), language })
        .then((chat) => setTit(chat[0].title))
        .catch(console.error);
    } else {
      setTit("TECHIE");
    }
  }, [chatId]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(startLogout());

    setIsMenuOpen(false);
  };

  const openModal = async () => {
    dispatch(startCheckingToken());
      try {
        const userChats = await getChatsByUserId({ language });
        if (userChats && userChats.length > 0) {
          setChats(userChats);
          setIsModalOpen(true);
        } else {
          switch (language) {
            case "en":
              toast.info("You have no saved chats");
              break;
            case "es":
              toast.info("No tienes chats guardados");
              break;
          }
        }
      } catch (error) {
        console.error("Error cargando chats:", error);
        switch (language) {
          case "en":
            toast.error("Error loading chats");
            break;
          case "es":
            toast.error("Error al cargar los chats");
            break;
        }
      }
    setIsMenuOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleNewChat = () => {
    navigate("/newchat", { replace: true });
    dispatch(startCheckingToken());
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
            {language === "en" && <span className="text-xl font-semibold">Welcome, {name}</span>}
            {language === "es" && <span className="text-xl font-semibold">Bienvenido, {name}</span>}
            {!["en", "es"].includes(language) && <span className="text-xl font-semibold">Bienvenido, {name}!</span>}
          </div>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">{tit}</h1>
          </div>
          <div className="flex justify-end items-center space-x-2">
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
              onClick={handleNewChat}
            >
              {language === "en" && "New Chat"}
              {language === "es" && "Nuevo Chat"}
              {!["en", "es"].includes(language) && "Nuevo Chat"}
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
                  {language === "en" && "Account Information"}
                  {language === "es" && "Información de cuenta"}
                  {!["en", "es"].includes(language) && "Información de cuenta"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:underline"
                >
                  {language === "en" && "Settings"}
                  {language === "es" && "Configuración"}
                  {!["en", "es"].includes(language) && "Configuración"}
                </NavLink>
              </li>
              <li>
                <button onClick={openModal} className="hover:underline">
                  {language === "en" && "Chat History"}
                  {language === "es" && "Historial de Chats"}
                  {!["en", "es"].includes(language) && "Historial de Chats"}
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-200 hover:text-red-300">
                  {language === "en" && "Logout"}
                  {language === "es" && "Cerrar sesión"}
                  {!["en", "es"].includes(language) && "Cerrar sesión"}
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
