import type { CartItem as CartItemType, Product } from '../types';

type CartItemProps = {
  item: CartItemType;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onRemove: (productId: number) => void;
};

function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.image || 'https://placehold.co/300x220/1f2937/ffffff?text=Product'} alt={product.name} />
      <div className="cart-item-info">
        <h3>{product.name}</h3>
        <p>{product.category_name || 'Категория'}</p>
        <div className="cart-actions">
          <button type="button" onClick={() => onDecrease(product)}>-</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => onIncrease(product)}>+</button>
        </div>
      </div>
      <div className="cart-summary">
        <strong>{(product.price * quantity).toFixed(2)} ₽</strong>
        <button type="button" className="text-button" onClick={() => onRemove(product.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default CartItem;
