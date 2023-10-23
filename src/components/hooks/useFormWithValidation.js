import React from 'react';
import validator from 'validator';

function useFormWithValidation() {
  const [inputValues, setInputValues] = React.useState({});
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isInputValid, setIsInputValid] = React.useState({});

  function validateEmailInput(inputValue) {
    return validator.isEmail(inputValue);
  }

  function handleChange(event) {
    const inputElement = event.target;
    const name = inputElement.name;
    const value = inputElement.value;

    let isValid = false;
    let validationMessage = '';
    if (name === 'email' && value !== '') {
      isValid = validateEmailInput(value);
      validationMessage = !isValid ? 'Некорректный e-mail' : '';
    } else {
      isValid = inputElement.validity.valid;
      validationMessage = inputElement.validationMessage;
    }

    setInputValues((initialInputValues) => {
      return { ...initialInputValues, [name]: value };
    });
    setErrorMessages((initialErrorMessages) => {
      return { ...initialErrorMessages, [name]: validationMessage };
    });
    setIsInputValid((initialIsValid) => {
      return { ...initialIsValid, [name]: isValid };
    });
  }

  const setFormValues = React.useCallback((name, value) => {
    setInputValues((initialInputValues) => {
      return { ...initialInputValues, [name]: value };
    });
  }, []);

  React.useEffect(() => {
    setIsFormValid(
      Object.values(isInputValid).every((validity) => validity === true)
    );
  }, [isInputValid]);

  const updateForm = React.useCallback((data = {}) => {
    setInputValues(data);
    setErrorMessages({});
    setIsFormValid(false);
    setIsInputValid({});
  }, []);

  return {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
    setFormValues,
    updateForm,
  };
}

export default useFormWithValidation;
