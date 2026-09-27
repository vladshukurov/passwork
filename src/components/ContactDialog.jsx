import React, { useEffect, useRef, useState } from 'react';

const copy = {
  demo: ['Запросить демо', 'Познакомьтесь с Пассворком и возможностями для вашей команды.'],
  implementation: ['Обсудить внедрение', 'Расскажите о вашей компании, чтобы обсудить развёртывание Пассворка в вашей инфраструктуре.'],
  pricing: ['Стоимость Пассворка', 'Подготовьте запрос на расчёт стоимости для вашей компании.'],
  support: ['Поддержка Пассворка', 'Оставьте контактные данные для обращения в поддержку.'],
};

// Any element with data-dialog="<kind>" opens this dialog.
export default function ContactDialog() {
  const dialog = useRef(null);
  const form = useRef(null);
  const [kind, setKind] = useState('demo');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const open = event => {
      const trigger = event.target.closest('[data-dialog]');
      if (!trigger || !copy[trigger.dataset.dialog]) return;
      setKind(trigger.dataset.dialog);
      setSubmitted(false);
      form.current.reset();
      dialog.current.showModal();
    };
    document.addEventListener('click', open);
    return () => document.removeEventListener('click', open);
  }, []);

  const closeOnBackdrop = event => {
    if (event.target !== dialog.current) return;
    const box = dialog.current.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close();
  };
  const submit = event => {
    event.preventDefault();
    if (form.current.reportValidity()) setSubmitted(true);
  };

  const [title, description] = copy[kind];
  return <dialog className="contact-dialog" aria-labelledby="dialog-title" ref={dialog} onClick={closeOnBackdrop}>
    <button className="dialog-close" type="button" aria-label="Закрыть окно" onClick={() => dialog.current.close()}>×</button>
    <h2 id="dialog-title">{title}</h2><p className="dialog-description">{description}</p>
    <form id="contact-form" ref={form} onSubmit={submit} hidden={submitted}>
      <label>Имя<input name="name" autoComplete="name" required placeholder="Как к вам обращаться" /></label>
      <label>Рабочая почта<input name="email" type="email" autoComplete="email" required placeholder="you@company.ru" /></label>
      <label>Компания<input name="company" autoComplete="organization" required placeholder="Название компании" /></label>
      <p className="form-note">Это локальный прототип: данные не отправляются.</p>
      <button className="button button-dark" type="submit">Подготовить заявку</button>
    </form>
    <div className="form-result" role="status" hidden={!submitted}>
      {submitted && 'Заявка подготовлена. Это локальный прототип — данные не отправлены и не сохранены.'}
    </div>
  </dialog>;
}
