import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, handleCheckBoxClick }) {
  return (
    <label className="search__checkbox checkbox">
      <div className="checkbox__container">
        <input
          type="checkbox"
          className="checkbox__button"
          onChange={handleCheckBoxClick}
        />
        <div className={`checkbox__area ${isChecked && 'checkbox__area_on'}`}>
          <div className="checkbox__switcher"></div>
        </div>
      </div>
      <span className="checkbox__caption">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
