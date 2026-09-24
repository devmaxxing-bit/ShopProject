import type { Order } from '../types';

type OrderCardProps = {
  order: Order;
};

function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Заказ #{order.id}</h3>
        <span className="order-status">{order.status}</span>
      </div>
      <p>{order.address}</p>
      <p>{new Date(order.created_at).toLocaleDateString()}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.product_name} × {item.quantity} — {item.price.toFixed(2)} ₽
          </li>
        ))}
      </ul>
      <strong>Итого: {order.total_price.toFixed(2)} ₽</strong>
    </div>
  );
}

export default OrderCard;
