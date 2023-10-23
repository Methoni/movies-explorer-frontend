import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import useFormWithValidation from '../hooks/useFormWithValidation';
import '../Main/Main.css';

function Register({
  onRegister,
  isError,
  setIsError,
  isSending,
  isSuccessful,
  setIsSuccessful,
}) {
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

  // Сбрасывает ошибку формы при монтировании и при обновлении инпутов
  React.useEffect(() => {
    setIsError(false);
  }, [setIsError, inputValues]);

  // Сбрасывает сообщение формы при монтировании
  React.useEffect(() => {
    setIsSuccessful(false);
  }, [setIsSuccessful]);

  return (
    <main className="main page__register register">
      <Authorize
        name="register"
        greeting="Добро пожаловать!"
        isValid={isFormValid}
        isError={isError}
        errorText="При регистрации пользователя произошла ошибка."
        buttonText="Зарегистрироваться"
        onSubmit={onSubmit}
        text="Уже зарегистрированы? "
        link="/signin"
        linkText="Войти"
        isSending={isSending}
        isSuccessful={isSuccessful}
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
