import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import type { Product } from '../types';

type ProductPageProps = {
  onAddToCart: (product: Product) => void;
};

function ProductPage({ onAddToCart }: ProductPageProps) {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}/`)
      .then((response) => setProduct(response.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-shell">Загрузка товара...</div>;
  if (!product) return <div className="page-shell">Товар не найден.</div>;

  const isAvailable = product.stock > 0;

  return (
    <div className="page-shell product-detail">
      <img src={product.image || 'https://placehold.co/700x500/1f2937/ffffff?text=Product'} alt={product.name} />
      <div className="product-detail-body">
        <span className="product-category">{product.category_name || 'Категория'}</span>
        <h1>{product.name}</h1>
        <p className="product-price">{product.price.toFixed(2)} ₽</p>
        <p>{product.description}</p>
        <ul className="product-specs">
          <li>Категория: {product.category_name || 'Общее'}</li>
          <li>На складе: {product.stock}</li>
        </ul>
        <button type="button" className="primary-button" onClick={() => onAddToCart(product)} disabled={!isAvailable}>
          {isAvailable ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
