import React from 'react';
import './Form.css';

function Form({ name, children, isValid, error, buttonText, onSubmit }) {
  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      <span
        className={`form__error ${
          name === 'register' ? 'form__error_register' : ''
        }`}
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
