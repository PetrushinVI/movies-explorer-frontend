import React from 'react';
import './Profile.css';


function Profile() {
  return(
    <section className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <div className='profile__field-container profile__field-container_name'>
          <h3 className='profile__field'>Имя</h3>
          <input className='profile__field-value' type='text'  value='Виталий'/>
        </div>
        <div className='profile__field-container profile__field-container_email'>
          <h3 className='profile__field'>E-mail</h3>
          <input className='profile__field-value' type='email' value='pochta@yandex.ru'/>
        </div>
        <div className='profile__button-container'>
          <button className='profile__button' type='submit'>Редактировать</button>
          <button className='profile__button profile__button_out'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  )
}

export default Profile;