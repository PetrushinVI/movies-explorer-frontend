import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import validation from '../Validation/Validation';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants';


function Profile({ loggedIn, loading, onUpdateUser, signOut }) {

  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isValid, resetForm } = validation();
  const [recentValues, setRecentValues] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email) {
      setRecentValues(true);
    } else {
      setRecentValues(false);
    }

  }, [enteredValues]);

  function handleSubmit(env) {
    env.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }


  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form className="profile__form" id="form" onSubmit={handleSubmit} noValidate>
          <label className="profile__field">
            Имя
            <input
              type="text"
              className="profile__input"
              name="name"
              id="name-input"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={enteredValues.name || ''}
              pattern={NAME_REGEX}
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>
          <div className="profile__border"></div>
          <label className="profile__field">
            E-mail
            <input
              type="email"
              className="profile__input"
              name="email"
              id="email-input"
              onChange={handleChange}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ''}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isValid ? true : false}
            className={
              !isValid || loading || recentValues
                ? 'profile__button-save form__button-save_inactive'
                : 'profile__button-save'
            }>
            Редактировать
          </button>
          <button type="button" className="profile__logout" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile;