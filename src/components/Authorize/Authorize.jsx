import React from 'react';
import { Link } from 'react-router-dom';
import './Authorize.css';
import Form from '../Form/Form';

function Authorize({
  name,
  greeting,
  children,
  isValid,
  isError,
  errorText,
  buttonText,
  onSubmit,
  isSuccessful,
  successText,
  text,
  link,
  linkText,
  onLinkClick,
  inputValues,
  isSending,
  isCurrent,
}) {
  return (
    <section className={`page__authorize authorize authorize__type_${name}`}>
      {name !== 'profile' && (
        <Link to={'/'} className="authorize__link_home"></Link>
      )}
      <h1
        className={`authorize__title ${
          name === 'profile' ? 'authorize__title_profile' : ''
        }`}
      >
        {greeting}
      </h1>
      <Form
        name={name}
        isValid={isValid}
        isError={isError}
        errorText={errorText}
        buttonText={buttonText}
        onSubmit={onSubmit}
        isSuccessful={isSuccessful}
        successText={successText}
        inputValues={inputValues}
        isSending={isSending}
        isCurrent={isCurrent}
      >
        {children}
      </Form>

      <p className="authorize__text">
        {text}
        <Link
          to={link}
          className={`authorize__link ${
            name === 'profile' ? 'authorize__link_profile' : ''
          }`}
          onClick={onLinkClick}
        >
          {linkText}
        </Link>
      </p>
    </section>
  );
}

export default Authorize;
