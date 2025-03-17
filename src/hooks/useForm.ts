import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T, validate?: (values: T) => Record<string, string>) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setValues({
      ...values,
      [name]: value
    });

    if (isSubmitted && validate) {
      const newErrors = validate({ ...values, [name]: value });
      setErrors(newErrors);
    }
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>, callback: (formValues: T) => void) => {
    ev.preventDefault();
    setIsSubmitted(true);
    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }
    callback(values);
  }

  return {
    formState: values,
    errors,
    isSubmitted,
    ...values,
    handleInputChange,
    handleSubmit
  }
}