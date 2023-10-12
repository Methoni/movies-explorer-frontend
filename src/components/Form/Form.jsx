import React from 'react';
import './Form.css';
import { useLocation } from 'react-router-dom';

function Form({ name, children, isValid, error, buttonText, onSubmit }) {
  const { pathname } = useLocation();
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
        } ${pathname === '/signin' && 'form__error_login'}`}
      >
        {error}
      </span>
      <button
        type="submit"
        className={`form__button ${
          name === 'profile' ? 'form__button_profile' : ''
        } ${isValid ? '' : 'form__button_disabled'}`}
        disabled={!isValid}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
