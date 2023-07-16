import { useState, useCallback } from 'react';

const validation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [enteredValues, setEnteredValues] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsValid(event.target.closest('#form').checkValidity());
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsValid],
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isValid,
    resetForm,
  };
};

export default validation;