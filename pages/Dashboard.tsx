import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MOCK_TRANSACTIONS } from '../constants';
import { CreditCard, Package, TrendingUp } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const categoryData = [
  { name: 'Mobile', value: 400 },
  { name: 'Utility', value: 300 },
  { name: 'Gaming', value: 300 },
];

export const Dashboard: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{isAdmin ? 'Admin Dashboard' : 'My Account'}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spend</p>
              <h3 className="text-2xl font-bold">฿12,450</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <h3 className="text-2xl font-bold">48</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Points Earned</p>
              <h3 className="text-2xl font-bold">1,250</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-6">Spending Overview</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {isAdmin && (
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={categoryData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     fill="#8884d8"
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {categoryData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_TRANSACTIONS.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.items.length} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">฿{txn.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};