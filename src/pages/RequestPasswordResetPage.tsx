import { useForm } from "../hooks";
import { motion } from "framer-motion";
import { validateRequestResetPassword } from "../validators";
import { RequestPasswordResetValuesProps } from "../interfaces";
import { sendResetPassword } from "../helpers";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SelectLanguage } from "../components";


const initialState: RequestPasswordResetValuesProps = {
  email: ''
};


export const RequestPasswordResetPage = () => {
  const { language } = useSelector((state: RootState) => state.settings);
  const { email, handleInputChange, handleSubmit, errors, isSubmitted } = useForm(initialState, validateRequestResetPassword, language);
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (formValues: RequestPasswordResetValuesProps) => {
    setIsLoading(true);
    await sendResetPassword({ formValues, language });
    setIsLoading(false);
  };
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <SelectLanguage />
      </div>
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">
            {language === "es" && "Restablecer Contraseña"}
            {language === "en" && "Reset Password"}
            {!["es", "en"].includes(language) && "Restablecer Contraseña"}
          </h1>
          <form onSubmit={(ev) => handleSubmit(ev, onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={language === "es" ? "Introduce tu email" : "Enter your email"}
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.email ? 'border-red-500' : 'focus:ring-blue-500'}`}
              />
              {isSubmitted && errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              {
                isLoading
                  ? <CircularProgress size={16} color="inherit" />
                  : language === "es"
                      ? "Enviar Email"
                      : "Send Email"
              }
            </button>
          </form>
          <NavLink to="/login" className="block text-center text-blue-500 hover:underline">
            {language === "es" && "← Atrás"}
            {language === "en" && "← Back"}
            {!["es", "en"].includes(language) && "← Atrás"}
          </NavLink>
        </div>
      </motion.div>
    </>
  );
};