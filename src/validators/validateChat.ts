export const validateChat = (values: { message: string }) => {
    let errors: Record<string, string> = {};
    if (!values.message.trim()) {
      errors.message = "El mensaje no puede estar vacío";
    }
    return errors;
  };
  