import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Package, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', value: 35, performance: 20 },
  { month: 'Feb', value: 60, performance: 25 },
  { month: 'Mar', value: 45, performance: 15 },
  { month: 'Apr', value: 65, performance: 20 },
  { month: 'May', value: 45, performance: 25 },
  { month: 'Jun', value: 55, performance: 30 },
  { month: 'Jul', value: 40, performance: 20 },
  { month: 'Aug', value: 42, performance: 18 },
  { month: 'Sep', value: 70, performance: 28 },
  { month: 'Oct', value: 45, performance: 30 },
  { month: 'Nov', value: 55, performance: 35 },
  { month: 'Dec', value: 60, performance: 32 },
];

const ordersData = [
  {
    id: '#825625',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '#825626',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '#825627',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '#825628',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '#825629',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '#125629',
    date: '25 April 2024',
    product: '🍌',
    customerName: 'Anna M. Hayes',
    email: 'anna.hayes@gmail.com',
    phone: '+1-555-1584-261',
    address: 'Burr Ridge/Illinois',
    paymentType: 'Credit Card',
    status: 'Completed'
  },
];

const StatsCard = ({ icon: Icon, title, value, change, period, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm w-[170px]">
    <div className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
      <div className="mt-2">
        {title && <p className="text-gray-600 text-xs mb-1">{title}</p>}
        <h3 className="text-xl font-bold mb-2">{value}</h3>
        <div className="flex items-center text-xs">
          {change > 0 ? (
            <ArrowUpRight className="text-green-500 mr-1" size={16} />
          ) : (
            <ArrowDownRight className="text-red-500 mr-1" size={16} />
          )}
          <span className={`${change > 0 ? 'text-green-500' : 'text-red-500'} mr-1`}>
            {Math.abs(change)}%
          </span>
          <span className="text-gray-500">{period}</span>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => (
  <div className="flex items-center justify-between px-6 py-3 border-t">
    <div className="text-sm text-gray-500">
      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} orders
    </div>
    <div className="flex space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i + 1
              ? 'bg-orange-500 text-white'
              : 'bg-white border'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('ALL');
  const itemsPerPage = 5;
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Alert Banner */}
      <div className="bg-red-50 p-4 rounded-lg mb-6 w-[600px]">
        <div className="flex items-center">
          <AlertCircle className="text-red-500 mr-2" size={20} />
          <p className="text-red-800 text-sm">
            We regret to inform you that our server is currently experiencing technical difficulties.
          </p>
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        {/* Stats Grid on Left */}
        <div className="w-1/3">
          <div className="grid grid-cols-2 gap-6">
            <StatsCard
              icon={Package}
              title="Total Orders"
              value="13,647"
              change={2.3}
              period="Last Week"
              color="red"
            />
            <StatsCard
              icon={Package}
              title="New Leads"
              value="9,526"
              change={8.1}
              period="Last Month"
              color="red"
            />
            <StatsCard
              icon={Package}
              title="Deals"
              value="976"
              change={-0.3}
              period="Last Month"
              color="red"
            />
            <StatsCard
              icon={DollarSign}
              title="Booked Revenue"
              value="$123.4k"
              change={-10.6}
              period="Last Month"
              color="red"
            />
          </div>
        </div>

        {/* Bar Chart on Right */}
        <div className="w-[600px] bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Performance Metrics</h2>
            <div className="flex space-x-4">
              {['ALL', '1M', '6M', '1Y'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`text-gray-500 hover:text-gray-700 ${
                    timeFilter === filter ? 'font-semibold' : ''
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar dataKey="performance" fill="#FF5733" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersData
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
          onPageChange={handlePageChange}
          totalItems={ordersData.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;