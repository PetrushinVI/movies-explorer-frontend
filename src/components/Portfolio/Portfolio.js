import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg'


function Portfolio() {
  return(
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul >
        <li className='portfolio__list'>
          <a className='portfolio__link' href='https://github.com/PetrushinVI/how-to-learn/' target='blank'>
            <h3 className='portfolio__link-text'>Статичный сайт</h3>
            <img className='portfolio__link-img' src={arrow} alt='Стрелочка'/>
          </a>
        </li>
        <li className='portfolio__list'>
          <a className='portfolio__link' href='https://github.com/PetrushinVI/russian-travel/' target='blank'>
            <h3 className='portfolio__link-text'>Адаптивный сайт</h3>
            <img className='portfolio__link-img' src={arrow} alt='Стрелочка'/>
          </a>
        </li>
        <li className='portfolio__list'>
          <a className='portfolio__link' href='https://github.com/PetrushinVI/react-mesto-api-full-gha' target='blank'>
            <h3 className='portfolio__link-text'>Одностраничное приложение</h3>
            <img className='portfolio__link-img' src={arrow} alt='Стрелочка'/>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;