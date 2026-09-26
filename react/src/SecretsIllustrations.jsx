import React from 'react';
import storage from '../../dist/passwork-assets/secrets-isoform/storage.svg?raw';
import cicd from '../../dist/passwork-assets/secrets-isoform/cicd.svg?raw';
import config from '../../dist/passwork-assets/secrets-isoform/config.svg?raw';
import access from '../../dist/passwork-assets/secrets-isoform/access.svg?raw';

// Trusted Isoform exports: preserve complete objects and their painter order.
function Illustration({ source, viewBox = '35 35 530 530', ...props }) {
  const content = source.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
    .replace(/<rect[^>]*\/>/, '');
  return <svg {...props} className="secrets-illustration" viewBox={viewBox}
    role="img" dangerouslySetInnerHTML={{ __html: content }} />;
}
export function SecureStorageIllustration() {
  return <Illustration source={storage} data-secret-art="storage" aria-label="Защищённое хранилище секретов" />;
}
export function CicdIllustration() {
  return <Illustration source={cicd} viewBox="70 70 460 460" data-secret-art="cicd" aria-label="Передача секретов в три узла CI/CD" />;
}
export function ConfigurationsIllustration() {
  return <Illustration source={config} data-secret-art="config" aria-label="Файлы конфигурации со строками параметров" />;
}
export function AccessIllustration() {
  return <Illustration source={access} data-secret-art="access" aria-label="Уровни доступа вокруг защищённого секрета" />;
}
