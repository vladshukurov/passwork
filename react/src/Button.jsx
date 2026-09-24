import React from 'react';

const variantClass = {
  default: '',
  dark: 'button-dark',
  outline: 'button-outline',
};

export default function Button({
  children = 'Запросить демо',
  className = '',
  dialog = 'demo',
  type = 'button',
  variant = 'default',
  ...buttonProps
}) {
  return <button
    className={['button', variantClass[variant], className].filter(Boolean).join(' ')}
    data-dialog={dialog}
    type={type}
    {...buttonProps}
  >{children}</button>;
}
