import { Link } from 'react-router-dom';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isAvailable = product.stock > 0;

  return (
    <article className="product-card">
      <img src={product.image || 'https://placehold.co/600x420/1f2937/ffffff?text=Product'} alt={product.name} />
      <div className="product-body">
        <span className="product-category">{product.category_name || 'Категория'}</span>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span className="price">{product.price.toFixed(2)} ₽</span>
          <span className={`stock ${isAvailable ? 'in-stock' : 'out-stock'}`}>
            {isAvailable ? `В наличии: ${product.stock}` : 'Нет в наличии'}
          </span>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="secondary-button">
            Подробнее
          </Link>
          <button type="button" className="primary-button" onClick={() => onAddToCart(product)} disabled={!isAvailable}>
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
