import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatBox } from "../components";
import { Layout } from "../layout/Layout";
import { checkToken, getChatByUserIdAndChatId } from "../helpers";
import { ChatFormProps } from "../interfaces";
import { useDispatch } from "react-redux";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [context, setContext] = useState<ChatFormProps[]>([]);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    checkToken(dispatch);
  }, [])

  useEffect(() => {
    if (chatId && token) {
      getChatByUserIdAndChatId({ token, chatId: Number(chatId) })
        .then((chat) => {
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
          }
        })
        .catch((error) => console.error("Error cargando chat:", error));
    }
  }, [chatId, token]);

  return (
    <Layout>
      <ChatBox context={context} />
    </Layout>
  );
};
