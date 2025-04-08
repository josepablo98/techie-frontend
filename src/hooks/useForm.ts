import { useEffect, useState } from "react";

export const useForm = <T extends Record<string, any>>(
  initialState: T,
  validate?: (values: T, language?: string) => Record<string, string>,
  language?: string
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (isSubmitted && validate) {
      const newErrors = validate({ ...values, [name]: value }, language);
      setErrors(newErrors);
    }
  };

  const handleSubmit = (
    ev: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
    callback: (formValues: T) => void
  ) => {
    ev.preventDefault();
    setIsSubmitted(true);

    if (validate) {
      const newErrors = validate(values, language);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }

    callback(values);
    setIsSubmitted(false); // Reset `isSubmitted` to avoid showing errors after reset
    setValues(initialState);
  };

  useEffect(() => {
    if (!isSubmitted) return; // Avoid recalculating errors if the form hasn't been submitted
    const newErrors = validate && validate(values, language);
    setErrors(newErrors!);
  }, [language, values, validate, isSubmitted]);

  return {
    formState: values,
    errors,
    isSubmitted,
    ...values,
    handleInputChange,
    handleSubmit,
  };
};