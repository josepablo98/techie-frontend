import { ResetPasswordValuesProps } from "../interfaces";

export const validateResetPassword = (values: ResetPasswordValuesProps, language = 'es') => {
  const errors: Record<string, string> = {};

  if (!values.newPassword) {
    errors.newPassword = language === 'es' ? 'La nueva contraseña es requerida' : 'New password is required';
  } else if (!/^(?=.*[A-Z])(?=.*\d)[^\sñ]{8,}$/
    .test(values.newPassword)) {
    errors.newPassword = language === 'es' ? 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un número. No debe contener el caracter ñ' : 'New password must be at least 8 characters long, contain one uppercase letter and one number. It must not contain the character ñ';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = language === 'es' ? 'La confirmación de la contraseña es requerida' : 'Password confirmation is required';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match';
  }

  return errors;
};