import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import useFormWithValidation from '../hooks/useFormWithValidation';
import '../Main/Main.css';

function Login({
  onLogin,
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

  // Сбрасывает ошибку формы при монтировании и при обновлении инпутов
  React.useEffect(() => {
    setIsError(false);
  }, [setIsError, inputValues]);

  // Сбрасывает сообщение формы при монтировании
  React.useEffect(() => {
    setIsSuccessful(false);
  }, [setIsSuccessful]);

  function onSubmit(event) {
    event.preventDefault();
    onLogin(inputValues.email, inputValues.password);
  }

  return (
    <main className="main page__login login">
      <Authorize
        name="register"
        greeting="Рады видеть!"
        isValid={isFormValid}
        isError={isError}
        errorText="При авторизации произошла ошибка."
        buttonText="Войти"
        onSubmit={onSubmit}
        text="Ещё не зарегистрированы? "
        link="/signup"
        linkText="Регистрация"
        isSending={isSending}
        isSuccessful={isSuccessful}
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

export default Login;
