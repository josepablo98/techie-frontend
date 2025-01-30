import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const VerifiedEmailPage = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const verifyEmail = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (data.ok) {
          setIsSuccess(true);
          setMessage("Cuenta verificada correctamente");
        } else {
          setIsSuccess(false);
          setMessage(data.message);
        }
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
          {isSuccess ? "¡Éxito!" : "Error"}
        </h1>
        <p className="text-center">{message}</p>
      </div>
    </motion.div>
  );
};