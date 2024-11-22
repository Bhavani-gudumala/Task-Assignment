import { useVirtual } from 'react-virtual';

const VirtualizedOrdersTable = ({ data }) => {
  const parentRef = useRef();

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
      <div style={{ height: rowVirtualizer.totalSize }}>
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {data[virtualRow.index].customerName}
          </div>
        ))}
      </div>
    </div>
  );
};
export default VirtualizedOrdersTable ;