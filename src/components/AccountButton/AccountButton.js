import React from 'react';
import { Link } from 'react-router-dom';
import './AccountButton.css';

function AccountButton() {
  return (
    <Link to="/profile" className="account-button ">
      <p className='account-button__text'>Аккаунт</p>
    </Link>

  );
}

export default AccountButton;