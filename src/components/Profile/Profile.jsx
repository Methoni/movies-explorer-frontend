import React from 'react';
import Authorize from '../Authorize/Authorize';
import Input from '../Input/Input';
import Header from '../Header/Header';
import useFormWithValidation from '../hooks/useFormWithValidation';
import '../Main/Main.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  onProfileEdit,
  onSignOut,
  isError,
  isSuccessful,
  setFormMessages,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
  } = useFormWithValidation();

  function onSubmit(event) {
    event.preventDefault();
    onProfileEdit(inputValues.username, inputValues.email);
  }

  return (
    <>
      <Header />
      <main className="main page__profile profile">
        <Authorize
          name="profile"
          greeting={`Привет, ${currentUser.name}!`}
          isValid={isFormValid}
          isError={isError}
          errorText="При обновлении профиля произошла ошибка."
          buttonText="Редактировать"
          onSubmit={onSubmit}
          isSuccessful={isSuccessful}
          successText="Данные успешно изменены."
          setFormMessages={setFormMessages}
          link="/"
          linkText="Выйти из аккаунта"
          onLinkClick={onSignOut}
        >
          <Input
            formType="profile"
            title="Имя"
            type="text"
            name="username"
            placeholder={currentUser.name}
            minLength="3"
            value={inputValues.username}
            maxLength="40"
            isInputValid={isInputValid.username}
            error={errorMessages.username}
            onChange={handleChange}
          />
          <Input
            formType="profile"
            title="E-mail"
            type="email"
            name="email"
            placeholder={currentUser.email}
            value={inputValues.email}
            isInputValid={isInputValid.email}
            error={errorMessages.email}
            onChange={handleChange}
          />
        </Authorize>
      </main>
    </>
  );
}

export default Profile;
