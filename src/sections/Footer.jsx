import React from 'react';
import Button from '../components/Button.jsx';

function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-main">
      <div className="footer-brand">
        <a href="#top" aria-label="Пассворк — к началу страницы"><img className="footer-logo" src="/passwork-assets/logo-dark.svg" alt="Пассворк" /></a>
        <p>Корпоративные пароли и доступы<br />{' '}под контролем вашей команды</p>
        <Button>Запросить демо</Button>
        <img className="footer-russia" src="/passwork-assets/imgVector.svg" alt="Сделано в России" />
      </div>
      <nav className="footer-column" aria-label="Продукт">
        <h2>Пассворк</h2>
      <a href="#features">Возможности</a><a href="#teams">Для вашей команды</a><a href="#certification">Сертификация</a>
        <a href="#pricing">Стоимость</a>
      </nav>
      <nav className="footer-column" aria-label="Ресурсы">
        <h2>Ресурсы</h2>
        <a href="https://passwork.ru/docs/" target="_blank" rel="noopener noreferrer">Техническая документация</a>
        <a href="https://manuals.passwork.ru/" target="_blank" rel="noopener noreferrer">Руководство пользователя</a>
        <a href="https://passwork.ru/help/" target="_blank" rel="noopener noreferrer">Центр поддержки</a>
        <button type="button" data-dialog="implementation">Обсудить внедрение</button>
      </nav>
    </div>
    <div className="footer-bottom">
      <span>© 2014–2026 ООО «Пассворк»</span>
      <a href="https://passwork.ru/Политика_конфиденциальности.pdf" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
      <a href="https://passwork.ru/Лицензионное_соглашение.pdf" target="_blank" rel="noopener noreferrer">Лицензионное соглашение</a>
      <a href="#top" className="footer-top" aria-label="К началу страницы">Наверх</a>
    </div>
  </div></footer>;
}

export default Footer;
