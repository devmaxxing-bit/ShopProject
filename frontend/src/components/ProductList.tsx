import type { Product } from '../types';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;
