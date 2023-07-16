import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { EMAIL_REGEX } from '../../utils/constants';
import validation from '../Validation/Validation';

function NotFound({ onAuthorize, loading }) {

  const { enteredValues, errors, handleChange, isValid } = validation();

  function handleSubmit(env) {
    env.preventDefault();
    onAuthorize({
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return(
    <Form
      title="Рады видеть!"
      onSubmit={handleSubmit}
      disabled={!isValid}
      loading={loading}
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      link="/signup"
      linkText=" Регистрация">
      <label className="form__field">
        E-mail
        <input
          type="text"
          className="form__input"
          name="email"
          id="email-input"
          onChange={handleChange}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ''}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__field">
        Пароль
        <input
          type="password"
          className="form__input"
          name="password"
          id="password-input"
          onChange={handleChange}
          value={enteredValues.password || ''}
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default NotFound;