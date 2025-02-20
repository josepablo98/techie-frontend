import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatBox } from "../components";
import { Layout } from "../layout/Layout";
import { getChatByUserIdAndChatId } from "../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChatFormProps } from "../interfaces";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [context, setContext] = useState<ChatFormProps[]>([]);
  const { email } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("ChatPage useEffect: chatId =", chatId, "email =", email);
    if (chatId && email) {
      getChatByUserIdAndChatId({ email, chatId: Number(chatId) })
        .then((chat) => {
          console.log("ChatPage: recibido chat =", chat);
          if (chat && chat[0] && chat[0].messages) {
            let messages = chat[0].messages;
            if (typeof messages === "string") {
              try {
                messages = JSON.parse(messages);
                console.log("ChatPage: mensajes parseados =", messages);
              } catch (error) {
                console.error("Error parseando mensajes:", error);
              }
            }
            setContext(messages);
          }
        })
        .catch((error) => console.error("Error cargando chat:", error));
    }
  }, [chatId, email]);

  return (
    <Layout>
      <ChatBox context={context} />
    </Layout>
  );
};
