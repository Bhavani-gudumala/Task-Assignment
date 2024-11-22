import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchOrders = async ({ pageParam = '' }) => {
  const { data } = await axios.get('/api/orders', { params: { cursor: pageParam, limit: 50 } });
  return data;
};

const OrdersTable = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allOrders = data?.pages.flatMap(page => page.data) || [];

  return (
    <div onScroll={(e) => {/* Trigger fetchNextPage */}}>
      {allOrders.map(order => (
        <div key={order.id}>{order.customerName}</div>
      ))}
      {isFetchingNextPage && <span>Loading...</span>}
    </div>
  );
};
export default fetchOrders;