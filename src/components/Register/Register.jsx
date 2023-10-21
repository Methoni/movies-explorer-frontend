import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import useFormWithValidation from '../hooks/useFormWithValidation';
import '../Main/Main.css';

function Register({ onRegister, isError, setFormMessages, isSending }) {
  const {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
  } = useFormWithValidation();

  function onSubmit(event) {
    event.preventDefault();
    onRegister(inputValues.username, inputValues.email, inputValues.password);
  }

  return (
    <main className="main page__register register">
      <Authorize
        name="register"
        greeting="Добро пожаловать!"
        isValid={isFormValid}
        isError={isError}
        errorText="При регистрации пользователя произошла ошибка."
        setFormMessages={setFormMessages}
        buttonText="Зарегистрироваться"
        onSubmit={onSubmit}
        text="Уже зарегистрированы? "
        link="/signin"
        linkText="Войти"
        isSending={isSending}
      >
        <Input
          formType="login"
          title="Имя"
          type="text"
          name="username"
          placeholder="Имя"
          minLength="3"
          maxLength="40"
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
          pattern={'^w+([.]?w+)@w+([.]?w+)(.w{2,3})+$'}
        />
        <Input
          formType="login"
          title="Пароль"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="3"
          maxLength="200"
          value={inputValues.password}
          isInputValid={isInputValid.password}
          error={errorMessages.password}
          onChange={handleChange}
        />
      </Authorize>
    </main>
  );
}

export default Register;
