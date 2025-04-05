import { RequestPasswordResetValuesProps } from "../interfaces";

export const validateRequestResetPassword = (values: RequestPasswordResetValuesProps, language = 'es')=> {
  const errors : Record<string, string> = {}

  if (!values.email) {
    errors.email = language === 'es' ? 'El email es requerido' : 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = language === 'es' ? 'El email no es válido' : 'Email is invalid';
  }
  
  return errors;
}