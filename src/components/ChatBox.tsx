import { useForm } from "../hooks";
import { ChatBoxProps, ChatFormProps } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import {
  fetchGeminiApi,
  saveNewChat,
  updateChat,
  updateTitle,
} from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { startCheckingToken } from "../store/auth";

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

export const ChatBox = ({ context = [] }: ChatBoxProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.auth);
  const { theme, detailLevel, language, tempChats, globalContext } = useSelector(
    (state: RootState) => state.settings
  );

  const [messages, setMessages] = useState<ChatFormProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { formState, handleInputChange, handleSubmit } = useForm({
    message: "",
  });

  useEffect(() => {
    setMessages(context || []);
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async () => {
    dispatch(startCheckingToken());

    const userInput = formState.message.trim();
    if (!userInput || isLoading) return;

    setIsLoading(true);
    const cleanInput = userInput.replace(/^Q\$+/, ""); // limpia Q$ si lo tuviera
    const prefixedUserMessage = userInput.startsWith("Q$") ? userInput : `Q$${cleanInput}`;
    const newUserMessage: ChatFormProps = { message: prefixedUserMessage };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    formState.message = "";

    const isFirstUserMessage =
      updatedMessages.filter((m) => m.message.startsWith("Q$")).length === 1;

    const isFirstChatbotMessage =
      updatedMessages.filter((m) => m.message.startsWith("A$")).length === 0;

    let chatId = Number(window.location.pathname.split("/")[2]);

    if (isFirstUserMessage && email && !tempChats) {
      const res = await saveNewChat({ message: prefixedUserMessage, language });
      if (res?.chatId) {
        chatId = res.chatId;
        window.history.pushState(null, "", `/chat/${res.chatId}`);
      }
    } else if (email && !tempChats) {
      await updateChat({ chatId, message: prefixedUserMessage, language });
    }

    const response = await fetchGeminiApi({
      text: prefixedUserMessage,
      detailLevel,
      language,
      context: updatedMessages,
      globalContext,
    });

    const [titlePart, ...rest] = response.response.split("//");
    const title = titlePart.trim();
    const chatReply = rest.join(" ").trim();
    const prefixedBotMessage = `A$${chatReply}`;
    const botMessage: ChatFormProps = { message: prefixedBotMessage };

    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);

    if (isFirstChatbotMessage && email && chatId) {
      await updateTitle({ chatId, title, language });
    }

    if (email && chatId) {
      await updateChat({ chatId, message: prefixedBotMessage, language });
    }

    setIsLoading(false);
  };

  const cleanMessage = (text: string) =>
    text.startsWith("Q$") || text.startsWith("A$") ? text.slice(2) : text;

  const isBotResponse = (text: string) => text.startsWith("A$");

  const containerClasses =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-black";
  const barClasses = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const inputClasses =
    theme === "dark"
      ? "bg-gray-700 text-gray-100 placeholder-gray-400"
      : "bg-white text-black placeholder-gray-500";

  return (
    <div
      className={`flex flex-col h-full max-h-screen overflow-hidden ${containerClasses}`}
    >
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        {messages.map((msg, i) => (
          <Message
            key={i}
            text={cleanMessage(msg.message)}
            isBotResponse={isBotResponse(msg.message)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className={`flex items-center p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] h-14 ${barClasses}`}
      >
        <input
          type="text"
          name="message"
          placeholder={
            language === "es" ? "Escribe un mensaje..." : "Type a message..."
          }
          autoComplete="off"
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
