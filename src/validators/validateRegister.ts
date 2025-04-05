import { RegisterValuesProps } from "../interfaces";

export const validateRegister = (values: RegisterValuesProps, language = "es")=> {
  const errors : Record<string, string> = {}

  if (!values.name) {
    errors.name = language === "es" ? "El nombre es requerido" : "Name is required";
  } else if (values.name.length < 2) {
    errors.name = language === "es" ? "El nombre debe tener al menos 2 caracteres" : "Name must be at least 2 characters";
  }

  if (!values.email) {
    errors.email = language === "es" ? "El email es requerido" : "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = language === "es" ? "El email no es válido" : "Email is invalid";
  } else if (!values.email.endsWith("@gmail.com")) {
    errors.email = language === "es" ? "El email debe ser de Gmail" : "Email must be from Gmail";
  }
  
  if (!values.password) {
    errors.password = language === "es" ? "La contraseña es requerida" : "Password is required";
  } else if (!/^(?=.*[A-Z])(?=.*\d)[^\sñ]{8,}$/.test(values.password)) {
    errors.password = language === "es" ? "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número. No debe contener el caracter ñ" : "Password must be at least 8 characters long, contain one uppercase letter and one number. It must not contain the character ñ";
  }

  if (!values.password2) {
    errors.password2 = language === "es" ? "La confirmación de la contraseña es requerida" : "Password confirmation is required";
  } else if (values.password !== values.password2) {
    errors.password2 = language === "es" ? "Las contraseñas no coinciden" : "Passwords do not match";
  }

  return errors;
}