import React from 'react';
import AwardsStrip from './Awards.jsx';
import { tidyCopy } from '../lib/typography.js';

// Reviews as published on passwork.ru (sourced from Startpack), under the
// award badges that back them up.
const reviews = [
  {
    author: 'Олег О.', role: 'DevOps-инженер', href: 'https://startpack.ru/@sp_47729239375',
    quote: 'Простой и интуитивно понятный интерфейс делает Пассворк доступным даже для тех, кто раньше не пользовался подобными сервисами. Надёжный и удобный менеджер паролей, который идеально подходит для работы в команде',
  },
  {
    author: 'Андрей Р.', role: 'ИБ-эксперт', href: 'https://startpack.ru/@sp_89440560371',
    quote: 'Все функции легко найти, а настройка занимает минимум времени. Даже если вы раньше не пользовались менеджерами паролей, разобраться будет несложно. Не представляю, как компании обходятся без его использования',
  },
  {
    author: 'Рональд П.', role: 'Ведущий ИБ-инженер', href: 'https://startpack.ru/@sp_98730453599',
    quote: 'Отличный сервис хранения паролей. Легко и быстро настраивается. Легко масштабируется. Удобный интуитивно понятный интерфейс. Оперативная поддержка и помощь в решении нестандартных задач',
  },
];

const Stars = () => <span className="review-stars" role="img" aria-label="Оценка 5 из 5">
  {Array.from({ length: 5 }, (_, i) => <img key={i} src="/passwork-assets/review-star.svg" alt="" width="20" height="20" />)}
</span>;

export default function Reviews() {
  return <section className="awards reviews" id="reviews" aria-labelledby="reviews-heading"><div className="awards-inner">
    <div className="section-intro awards-heading reviews-heading">
      <h2 id="reviews-heading">{tidyCopy('Пассворк ценят за удобство и поддержку')}</h2>
      <p>{tidyCopy('Об этом говорят оценки пользователей и награды Capterra, Software Advice и SourceForge')}</p>
      <AwardsStrip />
    </div>
    <ul className="review-columns">{reviews.map(({ author, role, href, quote }) =>
      <li className="review-column" key={author}>
        <figure>
          <Stars />
          <blockquote cite={href}><p>{tidyCopy(quote)}</p></blockquote>
          <figcaption>
            <a className="review-author" href={href} target="_blank" rel="noopener noreferrer">{author}</a>
            <span className="review-role">{role}</span>
          </figcaption>
        </figure>
      </li>)}</ul>
  </div></section>;
}
