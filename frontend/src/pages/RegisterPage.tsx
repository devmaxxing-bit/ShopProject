import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { UserProfile } from '../types';

type RegisterPageProps = {
  onLogin: (token: string, user: UserProfile) => void;
};

function RegisterPage({ onLogin }: RegisterPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post('/users/register/', form);
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError('Не удалось зарегистрироваться. Проверьте данные.');
    }
  };

  return (
    <div className="page-shell auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        {error && <p className="error-message">{error}</p>}
        <label>
          Имя пользователя
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Пароль
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Имя
          <input name="first_name" value={form.first_name} onChange={handleChange} />
        </label>
        <label>
          Фамилия
          <input name="last_name" value={form.last_name} onChange={handleChange} />
        </label>
        <button type="submit" className="primary-button full-width">Создать аккаунт</button>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
