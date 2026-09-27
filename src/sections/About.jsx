import React from 'react';
import { tidyCopy } from '../lib/typography.js';

function About() {
  return <section className="about" id="about"><h2>Пассворк — корпоративный менеджер паролей
    <span>{tidyCopy('для ИТ-команд, DevOps и специалистов по безопасности. Он помогает хранить пароли, управлять доступом и отслеживать действия внутри инфраструктуры')}</span>
  </h2></section>;
}

export default About;
