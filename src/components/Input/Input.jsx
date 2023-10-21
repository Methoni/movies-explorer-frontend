import React from 'react';
import './Input.css';

function Input({
  formType,
  title,
  type,
  name,
  placeholder,
  minLength,
  maxLength,
  value,
  isInputValid,
  onChange,
  error,
  isSending,
}) {
  return (
    <>
      <label className={`form__input input input__label_${formType}`}>
        <span className={`input__title_${formType}`}>{title}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          className={`input__field_${formType} ${
            isInputValid === undefined || isInputValid
              ? ''
              : 'input__field_invaid'
          }`}
          value={value}
          onChange={onChange}
          autoComplete="on"
          required
          disabled={isSending}
        />
      </label>
      <span className={`input__error`}>{error}</span>
    </>
  );
}
export default Input;
