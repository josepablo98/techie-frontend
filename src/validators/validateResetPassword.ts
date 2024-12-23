import { ResetPasswordValuesProps } from "../interfaces";

export const validateResetPassword = (values: ResetPasswordValuesProps) => {
  const errors: Record<string, string> = {};

  if (!values.newPassword) {
    errors.newPassword = 'La nueva contraseña es obligatoria';
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.newPassword)) {
    errors.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres y un número';
  } 

  if (!values.confirmPassword) {
    errors.confirmPassword = 'La confirmación de la contraseña es obligatoria';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};