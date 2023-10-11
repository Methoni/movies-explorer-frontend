import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Register() {
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
    navigate('/signin');
  }

  return (
    <Authorize
      name="register"
      greeting="Добро пожаловать!"
      isValid={isFormValid}
      error="При регистрации пользователя произошла ошибка."
      buttonText="Зарегистрироваться"
      onSubmit={onLogin}
      text="Уже зарегистрированы? "
      link="/signin"
      linkText="Войти"
    >
      <Input
        formType="login"
        title="Имя"
        type="text"
        name="username"
        placeholder="Имя"
        minLength="3"
        value={inputValues.username}
        isInputValid={isInputValid.username}
        error={errorMessages.username}
        onChange={handleChange}
      />
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

export default Register;
