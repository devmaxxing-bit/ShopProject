import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import type { CartItem as CartItemType, Product } from '../types';

type CartPageProps = {
  cart: CartItemType[];
  onUpdateQuantity: (product: Product, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
};

function CartPage({ cart, onUpdateQuantity, onRemoveItem, onClearCart }: CartPageProps) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page-shell empty-state">
        <h1>Корзина пуста</h1>
        <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
        <Link to="/" className="primary-button">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell cart-page">
      <div className="cart-header">
        <h1>Корзина</h1>
        <button type="button" className="text-button" onClick={onClearCart}>Очистить корзину</button>
      </div>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onIncrease={(product) => onUpdateQuantity(product, 1)}
            onDecrease={(product) => onUpdateQuantity(product, -1)}
            onRemove={onRemoveItem}
          />
        ))}
      </div>

      <aside className="summary-card">
        <h2>Итог</h2>
        <p>Товаров: {totalItems}</p>
        <p className="summary-total">{total.toFixed(2)} ₽</p>
        <Link to="/checkout" className="primary-button block-button">
          Оформить заказ
        </Link>
      </aside>
    </div>
  );
}

export default CartPage;
