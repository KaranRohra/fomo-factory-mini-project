export type CryptoCurrency = {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  fetchedAt: number;
};

interface TableProps {
  cryptoData: CryptoCurrency[];
}

const Table: React.FC<TableProps> = ({ cryptoData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
              Sr no.
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
              Fetched at
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-300">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cryptoData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                {new Date(item.fetchedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{item.rate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
