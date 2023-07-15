import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import logo from '../../images/logo.svg'


function Form({ title, onSubmit, children, disabled, loading, buttonText, question, link, linkText }) {

  return(
    <div className="form__container">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="form" id="form" onSubmit={onSubmit} noValidate>
        {children}
        <button type="submit"
                disabled={disabled ? true : false}
                className={disabled || loading ? 'form__button-save form__button-save_inactive' : 'form__button-save'}>
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default Form;