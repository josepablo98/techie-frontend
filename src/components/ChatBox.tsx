import { useForm } from "../hooks";
import { ChatBoxProps, ChatFormProps } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { checkToken, fetchGeminiApi, saveNewChat, updateChat, updateTitle } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

/**
 * Ejemplo de un icono "Send" con un simple SVG. 
 * Si prefieres usar Heroicons, instala y usa la librería correspondiente.
 */
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

  useEffect(() => {
    // Si context cambia y tiene mensajes nuevos, actualizamos messages
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

    // Crear el mensaje del usuario
    const newMessage: ChatFormProps = {
      message: formState.message,
      index: messages.length,
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    formState.message = "";

    const token = localStorage.getItem("token");
    // Guardar o actualizar el chat en BD (lógica original)
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

    // Llamar a la API
    let response;
    if (newMessage.index === 0) {
      response = await fetchGeminiApi({ text: newMessage.message });
    } else {
      response = await fetchGeminiApi({ text: newMessage.message, context: newMessages });
    }
    const chatTitle = response.response.split("//")[0].trim();
    const chatMessage = response.response.split("//").slice(1).join(" ").trim();
    const aiMessage: ChatFormProps = {
      message: chatMessage,
      index: newMessages.length,
    };

    // Actualizar título del chat (si es el primer mensaje)
    if (newMessage.index === 0 && email && token) {
      await updateTitle({
        chatId: Number(window.location.pathname.split("/")[2]),
        token,
        title: chatTitle,
      });
    }
    // Guardar respuesta de la IA en BD
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

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
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
        className="flex items-center p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bg-white h-14"
      >
        <input
          type="text"
          name="message"
          placeholder="Escribe un mensaje..."
          className="flex-1 mr-2 h-10 border border-gray-300 rounded px-2 disabled:bg-gray-100"
          value={formState.message}
          onChange={handleInputChange}
          disabled={isLoading}
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
