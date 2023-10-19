import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../hooks/useFormWithValidation';

function SearchForm({ isChecked, handleCheckBoxClick, searchMovies }) {
  const [isValid, setIsValid] = React.useState(true);
  const { inputValues, isFormValid, handleChange } = useFormWithValidation();

  function onFormSubmit(event) {
    event.preventDefault();
    if (isFormValid) {
      setIsValid(true);
      searchMovies(event.target.search.value);
    } else {
      setIsValid(false);
    }
  }

  function handleInputChange(event) {
    handleChange(event);
    setIsValid(true);
  }

  return (
    <section className="movies__search search" aria-label="Форма поиска">
      <div className="search__container">
        <form
          noValidate
          className="search__form-group"
          name={'SearchForm'}
          onSubmit={onFormSubmit}
        >
          <div className="search__form">
            <input
              type="text"
              name="search"
              placeholder="Фильм"
              className="search__input"
              value={inputValues.search}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="search__button"></button>
          </div>
          <FilterCheckbox
            isChecked={isChecked}
            handleCheckBoxClick={handleCheckBoxClick}
          />
        </form>
        <span
          className={`search__error ${!isValid && 'search__error_visible'}`}
        >
          {!isValid && 'Нужно ввести ключевое слово'}
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
