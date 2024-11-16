import React, { useMemo } from 'react';
import { AlertCircle, Package, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetAllOrdersQuery } from '../slices/userSlices/userApiSlice';
import CustomLabel from '../components/CustomLabel';
import StatsCard from '../components/StatsCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Loader';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;


  const processedOrders = useMemo(() => {
    return orders.map(order => ({
      id: order.id,
      date: new Date(order.created_at).toLocaleDateString(),
      total: order.total_amount,
      status: order.status,
      items: order.items.map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    }));
  }, [orders]);

  const totalAmount = useMemo(() => {
    return processedOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  }, [processedOrders]);

  const ordersByDate = useMemo(() => {
    const grouped = {};
    processedOrders.forEach(order => {
      const date = order.date;
      if (!grouped[date]) {
        grouped[date] = {
          date,
          revenue: 0
        };
      }
      grouped[date].revenue += parseFloat(order.total);
    });
    return Object.values(grouped);
  }, [processedOrders]);

  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <p className="text-red-800 text-sm">
              Error loading dashboard data. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-1/3">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            <StatsCard
              icon={Package}
              title="Total Orders"
              value={processedOrders.length}
              period="All Time"
              color="blue"
            />
            <StatsCard
              icon={DollarSign}
              title="Total Revenue"
              value={`$${totalAmount.toFixed(2)}`}
              period="All Time"
              color="green"
            />
            <StatsCard
              icon={Package}
              title="Pending Orders"
              value={processedOrders.filter(o => o.status === 'Pending').length}
              period="Current"
              color="yellow"
            />
            <StatsCard
              icon={Package}
              title="Avg. Order Value"
              value={`$${(totalAmount / processedOrders.length || 0).toFixed(2)}`}
              period="All Time"
              color="purple"
            />
          </div>
        </div>

        <div className="w-full lg:w-[600px] bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Order Analytics</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Order Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Pending', value: processedOrders.filter(o => o.status === 'Pending').length },
                        { name: 'Completed', value: processedOrders.filter(o => o.status === 'Completed').length }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={CustomLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Revenue by Day</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ordersByDate.map(day => ({
                        name: day.date,
                        value: day.revenue
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={CustomLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ordersByDate.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedOrders
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{order.id}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.product} x{item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      ${order.total}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={processedOrders.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;