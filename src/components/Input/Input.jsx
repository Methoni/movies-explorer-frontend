import React from 'react';
import './Input.css';

function Input({
  formType,
  title,
  type,
  name,
  placeholder,
  minLength,
  value,
  isInputValid,
  onChange,
  error,
}) {
  return (
    <>
      <label className={`input__label_${formType}`}>
        <span className={`input__title_${formType}`}>{title}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          className={`input__field_${formType} ${
            isInputValid === undefined || isInputValid
              ? ''
              : 'input__field_invaid'
          }`}
          value={value}
          onChange={onChange}
          autoComplete="on"
          required
        />
      </label>
      <span className={`input__error`}>{error}</span>
    </>
  );
}
export default Input;
