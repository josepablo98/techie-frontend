import { MessageComponentProps } from "../interfaces";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const Message = ({ text, isBotResponse }: MessageComponentProps) => {
  const { theme } = useContext(ThemeContext);

  // Para el bot: un gris en claro, y un gris oscuro en modo oscuro
  const botBg = theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-black";
  // Para el usuario: azul en claro, azul oscuro en modo oscuro
  const userBg = theme === "dark" ? "bg-blue-700 text-gray-100" : "bg-blue-500 text-white";

  const bubbleClasses = isBotResponse ? botBg : userBg;
  const containerJustify = isBotResponse ? "justify-start" : "justify-end";

  return (
    <div className={`my-2 flex ${containerJustify}`}>
      <div className={`p-2 rounded-xl max-w-[60%] ${bubbleClasses}`}>
        {text}
      </div>
    </div>
  );
};
