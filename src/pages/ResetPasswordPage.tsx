import { useForm } from "../hooks";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ResetPasswordValuesProps } from "../interfaces";
import { validateResetPassword } from "../validators";
import { resetPassword } from "../helpers";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import eyeOpen from "../../public/eye-open.png";
import eyeClosed from "../../public/eye-closed.png";

const initialState: ResetPasswordValuesProps = {
  newPassword: '',
  confirmPassword: ''
};

export const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const { newPassword, confirmPassword, handleInputChange, handleSubmit, errors, isSubmitted } = useForm(initialState, validateResetPassword);

  const onSubmit = async (formValues: ResetPasswordValuesProps) => {
    const token = searchParams.get("token");
    setIsLoading(true);
    await resetPassword(formValues, token!);
    setIsLoading(false);
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Restablecer Contraseña</h1>
        <form onSubmit={(ev) => handleSubmit(ev, onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Nueva Contraseña"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.newPassword ? 'border-red-500' : 'focus:ring-blue-500'}`}
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-2">
              <img src={showNewPassword ? eyeOpen : eyeClosed} alt="eye" className="w-6 h-6"/>
            </button>
            {isSubmitted && errors.newPassword && <span className="text-sm text-red-500">{errors.newPassword}</span>}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar Nueva Contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.confirmPassword ? 'border-red-500' : 'focus:ring-blue-500'}`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2">
              <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="eye" className="w-6 h-6"/>
            </button>
            {isSubmitted && errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword}</span>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {
              isLoading
                ? <CircularProgress size={16} color="inherit" />
                : 'Restablecer Contraseña'
            }
          </button>
        </form>
      </div>
    </motion.div>
  );
};