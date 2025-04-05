import { NavLink } from "react-router-dom";
import { useForm } from "../hooks"
import { RegisterValuesProps } from "../interfaces"
import { startRegisteringWithEmailAndPassword } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { motion } from "framer-motion";
import { validateRegister } from "../validators";
import { useEffect, useState } from "react";
import { status as st } from "../helpers";
import { CircularProgress } from "@mui/material";
import eyeOpen from "../../public/eye-open.png";
import eyeClosed from "../../public/eye-closed.png";
import { SelectLanguage } from "../components";

const initialState: RegisterValuesProps = {
  name: '',
  email: '',
  password: '',
  password2: ''
}

export const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { language } = useSelector((state: RootState) => state.settings)

  const { status } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { email, name, password, errors, isSubmitted, password2, handleInputChange, handleSubmit } = useForm(initialState, validateRegister, language);

  const onSubmit = (formValues: RegisterValuesProps) => {
    dispatch(startRegisteringWithEmailAndPassword({...formValues, language}));
  }

  useEffect(() => {
    if (status === st.CHECKING) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status])


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
            {language === "es" && "Registro"}
            {language === "en" && "Register"}
            {!["es", "en"].includes(language) && "Registro"}
          </h1>
          <form onSubmit={(ev) => handleSubmit(ev, onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={language === "es" ? "Nombre" : "Name"}
                name="name"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.name ? 'border-red-500' : 'focus:ring-blue-500'}`}
              />
              {isSubmitted && errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.email ? 'border-red-500' : 'focus:ring-blue-500'}`}
              />
              {isSubmitted && errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={language === "es" ? "Contraseña" : "Password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.password ? 'border-red-500' : 'focus:ring-blue-500'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">
                <img src={showPassword ? eyeOpen : eyeClosed} alt="eye" className="w-6 h-6" />
              </button>
              {isSubmitted && errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>
            <div className="relative">
              <input
                type={showPassword2 ? 'text' : 'password'}
                placeholder={language === "es" ? "Repetir Contraseña" : "Repeat Password"}
                name="password2"
                autoComplete="new-password"
                value={password2}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isSubmitted && errors.password2 ? 'border-red-500' : 'focus:ring-blue-500'}`}
              />
              <button type="button" onClick={() => setShowPassword2(!showPassword2)} className="absolute right-2 top-2">
                <img src={showPassword2 ? eyeOpen : eyeClosed} alt="eye" className="w-6 h-6" />
              </button>
              {isSubmitted && errors.password2 && <span className="text-sm text-red-500">{errors.password2}</span>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {
                isLoading
                  ? <CircularProgress size={16} color="inherit" />
                  : language === "es" 
                      ? "Registrar"
                      : "Register"
              }
            </button>
          </form>
          <NavLink to="/login" className="block text-center text-blue-500 hover:underline">
            {language === "es" && "¿Ya tienes cuenta?"}
            {language === "en" && "Already have an account?"}
            {!["es", "en"].includes(language) && "¿Ya tienes cuenta?"}
          </NavLink>
        </div>
      </motion.div>
    </>
  )
}