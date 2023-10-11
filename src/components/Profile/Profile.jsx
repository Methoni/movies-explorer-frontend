import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import Header from '../Header/Header';
import useFormWithValidation from '../hooks/useFormWithValidation';


function Profile() {
  const {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
  } = useFormWithValidation();

  function onProfileEdit(event) {
    event.preventDefault();
  }

  return (
    <>
    <Header />
    <Authorize
      name="profile"
      greeting="Привет, Виталий!"
      isValid={isFormValid}
      errorText='Ошибка'
      buttonText='Редактировать'
      onSubmit={onProfileEdit}
      link="/"
      linkText="Выйти из аккаунта"
    >
      <Input
        formType="profile"
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
        formType="profile"
        title="E-mail"
        type="email"
        name="email"
        placeholder="E-mail"
        value={inputValues.email}
        isInputValid={isInputValid.email}
        error={errorMessages.email}
        onChange={handleChange}
      />
    </Authorize>
    </>
  );
}

export default Profile;
