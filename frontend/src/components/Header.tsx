import { Link, NavLink } from 'react-router-dom';
import type { UserProfile } from '../types';

type HeaderProps = {
  cartCount: number;
  token: string | null;
  user: UserProfile | null;
  onLogout: () => void;
};

function Header({ cartCount, token, user, onLogout }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">NexaStore</Link>
        <nav className="main-nav">
          <NavLink to="/">Каталог</NavLink>
          <NavLink to="/cart">Корзина ({cartCount})</NavLink>
          {token ? (
            <>
              <NavLink to="/profile">Профиль</NavLink>
              <button type="button" className="link-button" onClick={onLogout}>
                Выход
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Вход</NavLink>
              <NavLink to="/register">Регистрация</NavLink>
            </>
          )}
        </nav>
        {user && <span className="user-name">{user.username}</span>}
      </div>
    </header>
  );
}

export default Header;
