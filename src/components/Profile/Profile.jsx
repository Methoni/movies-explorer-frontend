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
  setIsError,
  isSuccessful,
  setIsSuccessful,
  isSending,
}) {
  const {
    inputValues,
    errorMessages,
    isFormValid,
    isInputValid,
    handleChange,
    updateForm,
  } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);
  const [isCurrent, setIsCurrent] = React.useState(false);

  React.useEffect(() => {
    if (
      inputValues.username === currentUser.name &&
      inputValues.email === currentUser.email
    ) {
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
  }, [
    currentUser.email,
    currentUser.name,
    inputValues.email,
    inputValues.username,
    setIsCurrent,
  ]);

  // Сбрасывает ошибку формы при монтировании и при обновлении инпутов
  React.useEffect(() => {
    setIsError(false);
  }, [setIsError, inputValues]);

  // Сбрасывает сообщение формы при монтировании
  React.useEffect(() => {
    setIsSuccessful(false);
  }, [setIsSuccessful]);

  React.useEffect(() => {
    updateForm({ username: currentUser.name, email: currentUser.email });
  }, [updateForm, currentUser]);

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
          link="/"
          linkText="Выйти из аккаунта"
          onLinkClick={onSignOut}
          inputValues={inputValues}
          isSending={isSending}
          isCurrent={isCurrent}
        >
          <Input
            formType="profile"
            title="Имя"
            type="text"
            name="username"
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
