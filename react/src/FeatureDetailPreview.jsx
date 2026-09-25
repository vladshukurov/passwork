import React from 'react';
import { Check as CheckIcon, ChevronDown, ChevronRight, ChevronUp, Folder as FolderIcon, Plus, Search, Star, X } from 'lucide-react';

function Folder({ color = '#b9bec5' }) {
  return <FolderIcon className="feature-snippet-folder" fill={color} color={color} strokeWidth={1.5} aria-hidden="true" />;
}

function Chevron({ open = false }) {
  return open ? <ChevronDown className="feature-snippet-icon" aria-hidden="true" /> : <ChevronRight className="feature-snippet-icon" aria-hidden="true" />;
}

function Check({ checked = false }) {
  return <span className={`feature-snippet-check${checked ? ' is-checked' : ''}`}>{checked && <CheckIcon aria-hidden="true" />}</span>;
}

function Avatar({ name, color }) {
  return <span className="feature-snippet-avatar" style={{ backgroundColor: color }}>{name}</span>;
}

function Tabs({ names, active }) {
  return <div className="feature-snippet-tabs">{names.map(name => <span className={name === active ? 'is-active' : ''} key={name}>{name}</span>)}</div>;
}

function TreePreview() {
  return <div className="feature-snippet feature-snippet-tree" aria-hidden="true">
    <div className="feature-snippet-section-label">ОБЩИЕ СЕЙФЫ <ChevronUp className="feature-snippet-icon" /><span className="feature-snippet-add"><Plus /></span></div>
    <div className="feature-snippet-tree-row is-root"><Chevron open />Администрирование</div>
    <div className="feature-snippet-tree-row is-folder"><Chevron /><Folder color="#f27178" />Хостинг</div>
    <div className="feature-snippet-tree-row is-folder"><Chevron /><Folder color="#50b9d6" />Инфраструктура</div>
    <div className="feature-snippet-tree-row is-folder"><Chevron /><Folder />Панель управления</div>
    <div className="feature-snippet-tree-row"><Chevron />Клиенты</div>
    <div className="feature-snippet-tree-row"><Chevron />Маркетинг</div>
    <div className="feature-snippet-tree-row"><Chevron />Финансы</div>
  </div>;
}

function PermissionsPreview() {
  return <div className="feature-snippet feature-snippet-permissions" aria-hidden="true">
    <div className="feature-snippet-title">Доступы к сейфам и папкам</div>
    <Tabs names={['Доступы', 'Права и настройки']} active="Доступы" />
    <div className="feature-snippet-table-label"><span>ДИРЕКТОРИЯ</span><span>ДОСТУП</span></div>
    <div className="feature-snippet-permission-row"><Check /><Chevron /><span className="feature-snippet-permission-name">Мои пароли</span><span className="feature-snippet-permission-access">Не установлен</span></div>
    <div className="feature-snippet-permission-row"><Check /><Chevron /><span className="feature-snippet-permission-name">Клиенты</span><span className="feature-snippet-permission-access">Полный доступ</span></div>
    <div className="feature-snippet-permission-row is-open"><Check /><Chevron open /><span className="feature-snippet-permission-name">Администрирование</span><span className="feature-snippet-permission-access">Только чтение</span></div>
    <div className="feature-snippet-permission-row is-child"><Check /><Folder color="#f27178" /><span className="feature-snippet-permission-name">Хостинг</span><span className="feature-snippet-permission-access">Редактирование</span></div>
  </div>;
}

function GroupsPreview() {
  const rows = [
    ['Дизайн', [['А', '#c58f5f']], '2'],
    ['Маркетинг', [['А', '#c58f5f'], ['И', '#6f98c6'], ['С', '#48aa83']], '4'],
    ['Менеджмент', [['М', '#d67e79'], ['Е', '#7a95bc'], ['Л', '#7aaf93']], '4'],
  ];
  return <div className="feature-snippet feature-snippet-groups" aria-hidden="true">
    <div className="feature-snippet-title">Управление пользователями</div>
    <Tabs names={['Пользователи', 'Роли', 'Группы']} active="Группы" />
    <div className="feature-snippet-toolbar"><span>Создать</span><span><Search />Поиск</span></div>
    <div className="feature-snippet-group-head"><span>ГРУППА 5</span><span>ПОЛЬЗОВАТЕЛИ</span><span>СЕЙФЫ</span></div>
    {rows.map(([name, users, vaults]) => <div className="feature-snippet-group-row" key={name}>
      <span><Check />{name}</span><span className="feature-snippet-avatars">{users.map(([letter, color], index) => <Avatar name={letter} color={color} key={index} />)}</span><span>{vaults}</span>
    </div>)}
  </div>;
}

function TeamPreview() {
  const people = [
    ['Алексей Журавлёв', 'Администратор', 'Полный доступ', 'Ж', '#7798ba'],
    ['Алексей Новиков', 'Сотрудник', 'Полный доступ', 'Н', '#52a88b'],
    ['Анна Соловьёва', 'Сотрудник', 'Редактирование', 'С', '#cf797d'],
  ];
  return <div className="feature-snippet feature-snippet-team" aria-hidden="true">
    <div className="feature-snippet-title">Доступ к сейфу «Маркетинг»</div>
    <Tabs names={['Пользователи 8', 'Группы 3', 'Запросы']} active="Пользователи 8" />
    <div className="feature-snippet-toolbar"><span>Добавить</span><span><Search />Поиск</span></div>
    <div className="feature-snippet-team-selected"><CheckIcon />2 ВЫБРАНО <span>Выбрать действие <ChevronDown /></span></div>
    {people.map(([name, role, access, initials, color], index) => <div className={`feature-snippet-team-row${index === 1 ? ' is-selected' : ''}`} key={name}>
      <Check checked={index === 1} /><Avatar name={initials} color={color} /><span>{name}<small>{role}</small></span><span>{access}</span>
    </div>)}
  </div>;
}

function RolesPreview() {
  return <div className="feature-snippet feature-snippet-roles" aria-hidden="true">
    <div className="feature-snippet-title">Юлия Смирнова <small>(smirnovajulia)</small></div>
    <Tabs names={['Доступы', 'Права и настройки']} active="Доступы" />
    <div className="feature-snippet-table-label"><span>ДИРЕКТОРИЯ</span><span>ДОСТУП</span></div>
    <div className="feature-snippet-permission-row"><Check /><Chevron /><span className="feature-snippet-permission-name">Мои пароли</span><span className="feature-snippet-permission-access">Не установлен</span></div>
    <div className="feature-snippet-permission-row is-open"><Check /><Chevron open /><span className="feature-snippet-permission-name">Администрирование</span><span className="feature-snippet-permission-access">Только чтение</span></div>
    <div className="feature-snippet-permission-row is-child"><Check /><Folder color="#f27178" /><span className="feature-snippet-permission-name">Хостинг</span><span className="feature-snippet-permission-access">Редактирование <ChevronUp /></span></div>
    <div className="feature-snippet-role-menu"><div>Администрирование</div><div>Полный доступ</div><div className="is-active">Редактирование</div><div>Только чтение</div></div>
  </div>;
}

function SearchPreview() {
  return <div className="feature-snippet feature-snippet-search" aria-hidden="true">
    <div className="feature-snippet-search-field"><Search /><span>admin</span><X className="feature-snippet-search-clear" /></div>
    <div className="feature-snippet-search-caption">РЕЗУЛЬТАТЫ · 3</div>
    <div className="feature-snippet-search-row"><span className="feature-snippet-search-dot" /><span className="feature-snippet-service is-green">E</span><span className="feature-snippet-search-name">Emergency Server User</span><small>Admin</small></div>
    <div className="feature-snippet-search-row is-selected"><span className="feature-snippet-service is-red">S</span><span className="feature-snippet-search-name">Sprinthost</span><small>Admin</small></div>
    <div className="feature-snippet-search-row"><Star className="feature-snippet-service is-star" fill="currentColor" /><span className="feature-snippet-search-name">Astra Linux</span><small>admin@astra.local</small></div>
  </div>;
}

export default function FeatureDetailPreview({ variant }) {
  switch (variant) {
    case 'permissions': return <PermissionsPreview />;
    case 'groups': return <GroupsPreview />;
    case 'team': return <TeamPreview />;
    case 'roles': return <RolesPreview />;
    case 'vault-order': return <TreePreview />;
    case 'vault-search': return <SearchPreview />;
    default: return null;
  }
}
