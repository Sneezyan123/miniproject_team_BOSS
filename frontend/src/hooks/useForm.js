import { useState } from 'react';

const useForm = (initialState = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    // Очищаємо помилку для поля, яке змінилось
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    if (!validationSchema) return true;

    const validationResult = validationSchema(values);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setValues,
    setErrors
  };
};

export default useForm;