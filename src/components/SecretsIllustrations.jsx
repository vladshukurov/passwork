import React from 'react';
import { isoformMarkup } from '../isoform-markup.js';
import storage from '../art/isoform/storage.svg?raw';
import cicd from '../art/isoform/cicd.svg?raw';
import config from '../art/isoform/config.svg?raw';
import access from '../art/isoform/access.svg?raw';

function Illustration({ source, viewBox = '35 35 530 530', ...props }) {
  return <svg {...props} className="secrets-illustration iso-art" viewBox={viewBox}
    role="img" dangerouslySetInnerHTML={{ __html: isoformMarkup(source) }} />;
}
export function SecureStorageIllustration() {
  return <Illustration source={storage} data-secret-art="storage" aria-label="Защищённое хранилище секретов" />;
}
export function CicdIllustration() {
  return <Illustration source={cicd} data-secret-art="cicd" aria-label="Передача секретов в три узла CI/CD" />;
}
export function ConfigurationsIllustration() {
  return <Illustration source={config} data-secret-art="config" aria-label="Файлы конфигурации со строками параметров" />;
}
export function AccessIllustration() {
  return <Illustration source={access} data-secret-art="access" aria-label="Уровни доступа вокруг защищённого секрета" />;
}
