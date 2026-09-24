import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import api from '../services/api';
import type { Category, Product } from '../types';

type HomePageProps = {
  onAddToCart: (product: Product) => void;
};

function HomePage({ onAddToCart }: HomePageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('newest');

  useEffect(() => {
    api.get('/categories/').then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (search) params.set('search', search);
    if (ordering) params.set('ordering', ordering);

    api.get(`/products/?${params.toString()}`).then((response) => setProducts(response.data));
  }, [selectedCategory, search, ordering]);

  return (
    <div className="page-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Новая коллекция</p>
          <h1>Умные устройства для современного дома</h1>
          <p>Техника, аксессуары и решения для работы, отдыха и повседневной жизни.</p>
        </div>
      </section>

      <section className="filters-panel">
        <input
          type="text"
          placeholder="Поиск товаров"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select value={ordering} onChange={(event) => setOrdering(event.target.value)}>
          <option value="newest">Сначала новые</option>
          <option value="price_asc">Цена: ↑</option>
          <option value="price_desc">Цена: ↓</option>
        </select>
      </section>

      <section>
        <div className="section-header">
          <h2>Каталог товаров</h2>
          <span>{products.length} позиций</span>
        </div>
        <ProductList products={products} onAddToCart={onAddToCart} />
      </section>
    </div>
  );
}

export default HomePage;
