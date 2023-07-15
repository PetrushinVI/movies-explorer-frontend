import React from 'react';
import './InfoPopup.css';


function InfoPopup({ success, onClose, update }) {

  return (
    <div className={`popup ${!success ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          id="close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{`${update ? 'Редактирование прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
      </div>
    </div>
  );
}

export default InfoPopup;