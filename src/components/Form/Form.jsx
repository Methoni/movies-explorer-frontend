import React from 'react';
import './Form.css';
import { useLocation } from 'react-router-dom';

function Form({
  name,
  children,
  isValid,
  isError,
  errorText,
  buttonText,
  onSubmit,
  isSuccessful,
  successText,
  setFormMessages,
}) {
  const { pathname } = useLocation();

  // Сбрасывает сообщения формы при повторном открытии страницы с формой
  React.useEffect(() => {
    setFormMessages(false);
  }, [setFormMessages]);

  return (
    <form
      noValidate
      name={name}
      onSubmit={onSubmit}
      className="form authorize__form"
    >
      {children}
      <span
        className={`form__error ${
          name === 'register' ? 'form__error_register' : ''
        } ${pathname === '/signin' && 'form__error_login'} ${
          isError && 'form__error_active'
        } ${isSuccessful && 'form__message'}`}
      >
        {isError && errorText}
        {isSuccessful && successText}
      </span>

      <button
        type="submit"
        className={`form__button ${
          name === 'profile' ? 'form__button_profile' : ''
        } ${isValid ? '' : 'form__button_disabled'}`}
        disabled={!isValid || isError}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
