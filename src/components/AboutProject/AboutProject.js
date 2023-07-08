import React from 'react';
import './AboutProject.css';
import '../Main/Main.css';

function AboutProject() {
  return(
    <section className='about' name='about'>
      <h2 className='main__title'>О проекте</h2>
      <div className='about__description-container'>
        <div className='about__description'>
          <h3 className='about__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about__description'>
          <h3 className='about__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about__time-container'>
        <div className='about__backend'>
          <p className='about__week'>1 неделя</p>
          <p className='about__tech'>Back-end</p>
        </div>
        <div className='about__frontend'>
          <p className='about__week about__week_frontend'>4 недели</p>
          <p className='about__tech'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;