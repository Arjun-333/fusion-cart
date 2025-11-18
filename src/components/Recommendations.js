import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../utils/api';

export default function Recommendations({ userId }) {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    async function load() {
      const data = await fetchRecommendations(userId);
      setRecommendations(data.recommendations || {});
    }
    load();
  }, [userId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      {Object.entries(recommendations).map(([category, products]) => (
        <section key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {products.map((product, i) => (
              <li key={i}>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  {product.title} — {product.price}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
