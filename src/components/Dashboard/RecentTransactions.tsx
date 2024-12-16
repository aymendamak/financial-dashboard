const sampleData = [
  {
    cusId: "C001",
    sku: "SKU123",
    date: "2024-12-16",
    price: 99.99,
    order: "ORD001",
  },
  {
    cusId: "C002",
    sku: "SKU456",
    date: "2024-12-15",
    price: 149.99,
    order: "ORD002",
  },
  {
    cusId: "C003",
    sku: "SKU789",
    date: "2024-12-14",
    price: 79.99,
    order: "ORD003",
  },
  {
    cusId: "C004",
    sku: "SKU101",
    date: "2024-12-13",
    price: 199.99,
    order: "ORD004",
  },
  {
    cusId: "C005",
    sku: "SKU202",
    date: "2024-12-12",
    price: 59.99,
    order: "ORD005",
  },
];

const RecentTransactions = () => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5"></h3>
        <button className="text-sm text-violet-500 hover:underline">
          {" "}
          See all{" "}
        </button>
      </div>

      <table className="w-full table auto">
        <TableHead />

        <tbody>
          {sampleData.map((item, index) => (
            <TableRow key={index} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Customer ID</th>
        <th className="text-start p-1.5">SKU</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Price</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  cusId,
  sku,
  date,
  price,
  order,
}: {
  cusId: string;
  sku: string;
  date: string;
  price: number;
  order: string;
}) => {
  return (
    <tr className="text-sm font-normal text-stone-500">
      <td className="px-4 py-2">{cusId}</td>
      <td className="px-4 py-2">{sku}</td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">${price.toFixed(2)}</td>
      <td className="px-4 py-2">{order}</td>
    </tr>
  );
};
export default RecentTransactions;
