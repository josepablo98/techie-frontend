import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatBox } from "../components";
import { Layout } from "../layout/Layout";
import { checkToken, getChatByUserIdAndChatId } from "../helpers";
import { ChatFormProps } from "../interfaces";
import { useDispatch } from "react-redux";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [context, setContext] = useState<ChatFormProps[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(dispatch);
  }, [dispatch]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChat = async () => {
      if (chatId && token) {
        try {
          const chat = await getChatByUserIdAndChatId({ token, chatId: Number(chatId) });
          if (chat && chat[0] && chat[0].messages) {
            let messages = chat[0].messages;
            if (typeof messages === "string") {
              try {
                messages = JSON.parse(messages);
              } catch (error) {
                console.error("Error parseando mensajes:", error);
              }
            }
            setContext(messages);
          } else {
            setContext([]);
            navigate("/chat", { replace: true });
          }
        } catch (error) {
          console.error("Error getting chat", error);
          setContext([]);
          navigate("/chat", { replace: true });
        }
      } else {
        setContext([]);
        navigate("/chat", { replace: true });
      }
    };

    fetchChat();
  }, [chatId, token]);

  return (
    <Layout>
      <ChatBox context={context} />
    </Layout>
  );
};