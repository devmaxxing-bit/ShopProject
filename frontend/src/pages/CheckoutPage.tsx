import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { CartItem } from '../types';

type CheckoutPageProps = {
  cart: CartItem[];
  onClearCart: () => void;
};

function CheckoutPage({ cart, onClearCart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shipping_name: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) {
      setError('КОРЗИНА ПУСТА');
      return;
    }

    try {
      await api.post('/orders/', {
        shipping_name: form.shipping_name,
        phone: form.phone,
        address: form.address,
        items: cart.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });
      onClearCart();
      navigate('/profile');
    } catch (err) {
      setError('НЕ УДАЛОСЬ');
    }
  };

  return (
    <div className="page-shell checkout-layout">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>
        {error && <p className="error-message">{error}</p>}
        <label>
          ИМЯ
          <input name="shipping_name" value={form.shipping_name} onChange={handleChange} required />
        </label>
        <label>
          ТЕЛЕФОН
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
        АДРЕС
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </label>
        <button type="submit" className="primary-button full-width">ПОДТВЕРПДИТЬ</button>
      </form>

      <aside className="summary-card">
        <h2>ВАШ ЗАКАЗ</h2>
        {cart.map((item) => (
          <div key={item.product.id} className="checkout-line">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <strong>{(item.product.price * item.quantity).toFixed(2)} ₽</strong>
          </div>
        ))}
        <div className="checkout-total">
          <span>Итого</span>
          <strong>{total.toFixed(2)} ₽</strong>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutPage;
