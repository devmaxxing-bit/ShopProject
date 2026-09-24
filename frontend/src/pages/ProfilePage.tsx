import { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import api from '../services/api';
import type { Order, UserProfile } from '../types';

type ProfilePageProps = {
  user: UserProfile | null;
};

function ProfilePage({ user }: ProfilePageProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders/').then((response) => setOrders(response.data));
  }, []);

  if (!user) {
    return <div className="page-shell">Пожалуйста, войдите в систему.</div>;
  }

  return (
    <div className="page-shell profile-page">
      <section className="profile-card">
        <h1>Личный кабинет</h1>
        <p>
          <strong>{user.first_name || user.username} {user.last_name}</strong>
        </p>
        <p>{user.email}</p>
      </section>

      <section>
        <h2>История заказов</h2>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
