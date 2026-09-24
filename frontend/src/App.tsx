import { useMemo, useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};


//AI GENERATED
type CartItem = Product & { qty: number };

const products: Product[] = [
  { id: 1, name: 'Наушники', price: 1290, stock: 8, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80' },
  { id: 2, name: 'Часы', price: 2190, stock: 5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80' },
  { id: 3, name: 'Колонка', price: 990, stock: 10, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=80' },
  { id: 4, name: 'Клавиатура', price: 1490, stock: 7, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=700&q=80' },
];

function App() {
  const [tab, setTab] = useState<'catalog' | 'cart' | 'auth'>('catalog');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [logged, setLogged] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const filtered = products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const item = current.find((x) => x.id === product.id);
      if (item) {
        return current.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...current, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const doLogin = () => {
    if (loginName && loginPass) {
      setLogged(true);
      setTab('catalog');
    }
  };

  const doRegister = () => {
    setLogged(true);
    setTab('catalog');
  };

  return (
    <div className="shop">
      <header className="top">
        <h1>Shop</h1>
        <nav>
          <button onClick={() => setTab('catalog')}>Каталог</button>
          <button onClick={() => setTab('cart')}>Корзина ({cart.length})</button>
          <button onClick={() => setTab('auth')}>{logged ? 'Профиль' : 'Войти'}</button>
        </nav>
      </header>

      {tab === 'catalog' && (
        <div className="content">
          <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск" />
          <div className="grid">
            {filtered.map((product) => (
              <div key={product.id} className="card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price} ₽</p>
                <button onClick={() => addToCart(product)}>В корзину</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'cart' && (
        <div className="content">
          <h2>Корзина</h2>
          {cart.length === 0 ? (
            <p>Пусто</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="row">
                  <span>{item.name}</span>
                  <div className="row-actions">
                    <button onClick={() => changeQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                    <button onClick={() => removeItem(item.id)}>X</button>
                  </div>
                </div>
              ))}
              <div className="total">Итого: {total} ₽</div>
              {logged ? <button className="buy">Оформить</button> : <button onClick={() => setTab('auth')}>Войти</button>}
            </>
          )}
        </div>
      )}

      {tab === 'auth' && (
        <div className="content auth">
          <div className="switcher">
            <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Вход</button>
            <button className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Регистрация</button>
          </div>

          {authMode === 'login' ? (
            <div className="form">
              <input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Логин" />
              <input value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Пароль" type="password" />
              <button onClick={doLogin}>Войти</button>
            </div>
          ) : (
            <div className="form">
              <input placeholder="Имя" />
              <input placeholder="Email" />
              <input placeholder="Пароль" type="password" />
              <button onClick={doRegister}>Создать</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


//a=sdfjsdkfjsdfjsdkjf
//dyrakbln