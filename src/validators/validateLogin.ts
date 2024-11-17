import { LoginValuesProps } from "../interfaces";

export const validateLogin = (values: LoginValuesProps) => {
  const errors : Record<string, string> = {}

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
}