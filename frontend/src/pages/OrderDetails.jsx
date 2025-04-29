import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(r => setOrder(r.data))
      .catch(console.error);
  }, [id]);

  if (!order) return <p>Loading…</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>ETA: {order.estimatedMins} minutes</p>
      <h3>Items</h3>
      {order.items.map(item => (
        <div key={item.id}>
          {item.foodItem.name} x {item.quantity} @ ${item.unitPrice}
        </div>
      ))}
    </div>
  );
}
