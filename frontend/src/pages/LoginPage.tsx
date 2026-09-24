import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { UserProfile } from '../types';

type LoginPageProps = {
  onLogin: (token: string, user: UserProfile) => void;
};

function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post('/users/login/', { username, password });
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError('Проверьте логин и пароль.');
    }
  };

  return (
    <div className="page-shell auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        {error && <p className="error-message">{error}</p>}
        <label>
          Логин
          <input value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label>
          Пароль
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <button type="submit" className="primary-button full-width">Войти</button>
        <p>
          Нет аккаунта? <Link to="/register">Создать</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
