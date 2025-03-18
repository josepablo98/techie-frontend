import { useForm } from "../hooks";
import { ChatBoxProps, ChatFormProps } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { checkToken, fetchGeminiApi, saveNewChat, updateChat, updateTitle } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const SendIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75L3 12l6.75 2.25m0-4.5l10.5-4.5-4.5 10.5m-6 2.25l10.5-4.5"
    />
  </svg>
);

const initialState: ChatFormProps = {
  message: "",
  index: -1,
};

export const ChatBox = ({ context = [] }: ChatBoxProps) => {
  const { email } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<ChatFormProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { formState, handleInputChange, handleSubmit } = useForm(initialState);
  const dispatch = useDispatch();



  const { theme, detailLevel, language, tempChats } = useSelector((state: RootState) => state.settings);

  

  useEffect(() => {
    if (context.length > 0) {
      setMessages(context);
      formState.index = context[context.length - 1].index;
    } else {
      setMessages([]);
      formState.index = -1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async () => {
    checkToken(dispatch);
    if (formState.message === "") return;

    setIsLoading(true);
    const newMessage: ChatFormProps = {
      message: formState.message,
      index: messages.length,
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    formState.message = "";

    const token = localStorage.getItem("token");
    if (newMessage.index === 0 && email && token) {
      const data = await saveNewChat({ token, message: newMessage.message });
      if (data && data.chatId) {
        window.history.pushState(null, "", `/chat/${data.chatId}`);
      }
    } else if (email && token) {
      await updateChat({
        chatId: Number(window.location.pathname.split("/")[2]),
        token,
        message: newMessage.message,
      });
    }

    let response;
    if (newMessage.index === 0) {
      response = await fetchGeminiApi({ text: newMessage.message, detailLevel, language });
    } else {
      response = await fetchGeminiApi({ text: newMessage.message, detailLevel, language, context: newMessages });
    }
    const chatTitle = response.response.split("//")[0].trim();
    const chatMessage = response.response.split("//").slice(1).join(" ").trim();
    const aiMessage: ChatFormProps = {
      message: chatMessage,
      index: newMessages.length,
    };

    if (newMessage.index === 0 && email && token) {
      await updateTitle({
        chatId: Number(window.location.pathname.split("/")[2]),
        token,
        title: chatTitle,
      });
    }
    if (email && token) {
      await updateChat({
        chatId: Number(window.location.pathname.split("/")[2]),
        token,
        message: chatMessage,
      });
    }

    const finalMessages = [...newMessages, aiMessage];
    setMessages(finalMessages);
    setIsLoading(false);
  };

  // Contenedor principal (opcional, si quieres un color distinto que el global)
  const containerClasses =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-black";

  // Barra inferior donde va el input
  const barClasses =
    theme === "dark"
      ? "bg-gray-800"  // FONDO OSCURO
      : "bg-gray-100"; // FONDO CLARO (o blanco si prefieres)

  // Clases para el input en modo oscuro
  const inputClasses =
    theme === "dark"
      ? "bg-gray-700 text-gray-100 placeholder-gray-400"
      : "bg-white text-black placeholder-gray-500";

  return (
    <div className={`flex flex-col h-full max-h-screen overflow-hidden ${containerClasses}`}>
      {/* Contenedor de mensajes */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        {messages.map((message, index) => (
          <Message key={index} text={message.message} isBotResponse={index % 2 !== 0} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Barra de envío */}
      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className={`flex items-center p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] h-14 ${barClasses}`}
      >
        <input
          type="text"
          name="message"
          placeholder="Escribe un mensaje..."
          className={`flex-1 mr-2 h-10 border border-gray-300 rounded px-2 disabled:bg-gray-100 ${inputClasses}`}
          value={formState.message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={isLoading}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
