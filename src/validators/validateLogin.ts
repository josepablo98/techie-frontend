import { LoginValuesProps } from "../interfaces";

export const validateLogin = (values: LoginValuesProps, language = "es") => {
  const errors : Record<string, string> = {}

  if (!values.email) {
    errors.email = language === "es" ? "El email es requerido" : "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = language === "es" ? "El email no es válido" : "Email is invalid";
  }

  if (!values.password) {
    errors.password = language === "es" ? "La contraseña es requerida" : "Password is required";
  }

  return errors;
}