import React from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';
import validation from '../Validation/Validation';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants';

function Register({ onRegister, loading }) {

  const { enteredValues, errors, handleChange, isValid } = validation();

  function handleSubmit(env) {
    env.preventDefault();
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      onSubmit={handleSubmit}
      disabled={!isValid}
      loading={loading}>
      <label className="form__field">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={enteredValues.name || ''}
          pattern={NAME_REGEX}
        />
        <span className="form__input-error">{errors.name}</span>
      </label>
      <label className="form__field">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="text"
          required
          onChange={handleChange}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ''}
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__field">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          onChange={handleChange}
          value={enteredValues.password || ''}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  );
}

export default Register;