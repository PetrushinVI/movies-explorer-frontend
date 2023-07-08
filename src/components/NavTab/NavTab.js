import React from 'react';
import { Link } from 'react-scroll';
import './NavTab.css';


function NavTab() {
  return(
    <section className='nav-tab'>
      <Link to='about' smooth={true} duration={500} className='nav-tab__button'>О проекте</Link>
      <Link to='techs' smooth={true} duration={500} className='nav-tab__button'>Технологии</Link>
      <Link to='student' smooth={true} duration={500} className='nav-tab__button'>Студент</Link>
    </section>
  )
}

export default NavTab;