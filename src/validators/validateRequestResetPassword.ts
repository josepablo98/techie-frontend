import { RequestPasswordResetValuesProps } from "../interfaces";

export const validateRequestResetPassword = (values: RequestPasswordResetValuesProps)=> {
  const errors : Record<string, string> = {}

  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'El email no es válido';
  }
  
  return errors;
}