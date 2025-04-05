import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatBox } from "../components";
import { Layout } from "../layout/Layout";
import { checkToken, getChatByUserIdAndChatId } from "../helpers";
import { ChatFormProps } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [context, setContext] = useState<ChatFormProps[]>([]);
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken({ dispatch });
  }, [dispatch]);

  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        try {
          const chat = await getChatByUserIdAndChatId({ chatId: Number(chatId), language });
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
  }, [chatId]);

  return (
    <Layout>
      <ChatBox context={context} />
    </Layout>
  );
};