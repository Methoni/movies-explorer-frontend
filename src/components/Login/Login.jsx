import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Login() {
  const navigate = useNavigate();

  const {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
  } = useFormWithValidation();

  function onLogin(event) {
    event.preventDefault();
    navigate('/profile');
  }

  return (
    <Authorize
      name="register"
      greeting="Рады видеть!"
      isValid={isFormValid}
      error="При авторизации произошла ошибка."
      buttonText="Войти"
      onSubmit={onLogin}
      text="Ещё не зарегистрированы? "
      link="/signup"
      linkText="Регистрация"
    >
      <Input
        formType="login"
        title="E-mail"
        type="email"
        name="email"
        placeholder="E-mail"
        value={inputValues.email}
        isInputValid={isInputValid.email}
        error={errorMessages.email}
        onChange={handleChange}
      />
      <Input
        formType="login"
        title="Пароль"
        type="password"
        name="password"
        placeholder="Пароль"
        minLength="3"
        value={inputValues.password}
        isInputValid={isInputValid.password}
        error={errorMessages.password}
        onChange={handleChange}
      />
    </Authorize>
  );
}

export default Login;
