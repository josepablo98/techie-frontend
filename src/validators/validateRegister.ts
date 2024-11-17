import { RegisterValuesProps } from "../interfaces";

export const validateRegister = (values: RegisterValuesProps)=> {
  const errors : Record<string, string> = {}

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }
  
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres, una letra y un número";
  }

  if (!values.password2) {
    errors.password2 = "La confirmación de la contraseña es requerida";
  } else if (values.password !== values.password2) {
    errors.password2 = "Las contraseñas no coinciden";
  }

  return errors;
}