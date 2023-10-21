import React from 'react';

function useFormWithValidation() {
  const [inputValues, setInputValues] = React.useState({});
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isInputValid, setIsInputValid] = React.useState({});

  function handleChange(event) {
    const inputElement = event.target;
    const name = inputElement.name;
    const value = inputElement.value;
    const form = inputElement.form;
    const validationMessage = inputElement.validationMessage;
    const isValid = inputElement.validity.valid;

    setInputValues((initialInputValues) => {
      return { ...initialInputValues, [name]: value };
    });
    setErrorMessages((initialErrorMessages) => {
      return { ...initialErrorMessages, [name]: validationMessage };
    });
    setIsFormValid(form.checkValidity());
    setIsInputValid((initialIsValid) => {
      return { ...initialIsValid, [name]: isValid };
    });
  }

  const setFormValues = React.useCallback((name, value) => {
    setInputValues((initialInputValues) => {
      return { ...initialInputValues, [name]: value };
    });
  }, []);

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
