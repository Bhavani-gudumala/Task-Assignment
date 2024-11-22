import { faker } from '@faker-js/faker';
import { Pool } from 'pg';
const pool = new Pool();  

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (let i = 1; i < 10000; i++) {
      const order = {
        id: faker.datatype.uid(),
        customerName: faker.name.fullName(),
        orderAmount: faker.finance.amount(10, 500, 2),
        status: faker.helpers.randomize(['pending', 'processing', 'completed', 'cancelled']),
        items: JSON.stringify(
          Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, () => ({
            name: faker.commerce.productName(),
            quantity: faker.datatype.number({ min: 1, max: 10 }),
            price: faker.finance.amount(5, 100, 2),
          }))
        ),
        createdAt: faker.date.past(),
      };

      await client.query(
        'INSERT INTO orders (id, customer_name, order_amount, status, items, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [order.id, order.customerName, order.orderAmount, order.status, order.items, order.createdAt]
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
  }
}

seed();
export default seed;