import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { verify } from "../helpers";

export const VerifiedEmailPage = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const language = localStorage.getItem("publicLanguage") || "es";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const verifyEmail = async () => {
      try {
        const data = await verify({ token, language });
        if (data.ok) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
        setMessage(data.message);
      } catch (error) {
        setIsSuccess(false);
        setMessage("No es posible verificar la cuenta, contacte con el administrador");
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={`text-2xl font-bold text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {
            language === "es"
              ? isSuccess
                ? "¡Éxito!"
                : "Error"
              : isSuccess
                ? "Success!"
                : "Error"
          }
        </h1>
        <p className="text-center">{message}</p>
      </div>
    </motion.div>
  );
};