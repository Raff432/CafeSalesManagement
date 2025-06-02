import React, { useState } from 'react';
import { TrendingUpIcon, UsersIcon, CoffeeIcon, UtensilsIcon, PlusIcon, ArrowUpIcon, ArrowDownIcon, CalendarIcon } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const Dashboard = ({
  transactions,
  onAddItem
}) => {
  const [timeRange, setTimeRange] = useState('daily');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const todayTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    tDate.setHours(0, 0, 0, 0);
    return tDate.getTime() === today.getTime();
  });
  const yesterdayTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    tDate.setHours(0, 0, 0, 0);
    return tDate.getTime() === yesterday.getTime();
  });
  const getTodayStats = () => {
    const stats = {
      totalSales: 0,
      totalOrders: todayTransactions.length,
      drinks: {
        orders: 0,
        items: 0,
        sales: 0
      },
      food: {
        orders: 0,
        items: 0,
        sales: 0
      }
    };
    todayTransactions.forEach(transaction => {
      stats.totalSales += transaction.total;
      const drinkItems = transaction.items.filter(item => item.category === 'drinks');
      const foodItems = transaction.items.filter(item => item.category === 'food');
      if (drinkItems.length > 0) {
        stats.drinks.orders++;
        stats.drinks.items += drinkItems.reduce((sum, item) => sum + item.quantity, 0);
        stats.drinks.sales += drinkItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      if (foodItems.length > 0) {
        stats.food.orders++;
        stats.food.items += foodItems.reduce((sum, item) => sum + item.quantity, 0);
        stats.food.sales += foodItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    });
    return stats;
  };
  const getYesterdayStats = () => {
    const stats = {
      totalSales: 0,
      totalOrders: yesterdayTransactions.length,
      drinks: {
        orders: 0,
        items: 0,
        sales: 0
      },
      food: {
        orders: 0,
        items: 0,
        sales: 0
      }
    };
    yesterdayTransactions.forEach(transaction => {
      stats.totalSales += transaction.total;
      const drinkItems = transaction.items.filter(item => item.category === 'drinks');
      const foodItems = transaction.items.filter(item => item.category === 'food');
      if (drinkItems.length > 0) {
        stats.drinks.orders++;
        stats.drinks.items += drinkItems.reduce((sum, item) => sum + item.quantity, 0);
        stats.drinks.sales += drinkItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      if (foodItems.length > 0) {
        stats.food.orders++;
        stats.food.items += foodItems.reduce((sum, item) => sum + item.quantity, 0);
        stats.food.sales += foodItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    });
    return stats;
  };
  const calculateTrend = (today, yesterday) => {
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return Math.round((today - yesterday) / yesterday * 100);
  };
  const todayStats = getTodayStats();
  const yesterdayStats = getYesterdayStats();
  const trends = {
    sales: calculateTrend(todayStats.totalSales, yesterdayStats.totalSales),
    drinks: calculateTrend(todayStats.drinks.sales, yesterdayStats.drinks.sales),
    food: calculateTrend(todayStats.food.sales, yesterdayStats.food.sales),
    avgOrder: calculateTrend(todayStats.totalOrders ? todayStats.totalSales / todayStats.totalOrders : 0, yesterdayStats.totalOrders ? yesterdayStats.totalSales / yesterdayStats.totalOrders : 0)
  };
  const generateChartData = () => {
    const dates = new Set();
    const salesData = new Map();
    const daysToInclude = {
      daily: 7,
      weekly: 4,
      monthly: 12
    }[timeRange];
    for (let i = 0; i < daysToInclude; i++) {
      const date = new Date();
      if (timeRange === 'daily') {
        date.setDate(date.getDate() - i);
        dates.add(date.toLocaleDateString());
      } else if (timeRange === 'weekly') {
        date.setDate(date.getDate() - i * 7);
        dates.add(`Week ${daysToInclude - i}`);
      } else {
        date.setMonth(date.getMonth() - i);
        dates.add(date.toLocaleDateString('default', {
          month: 'short'
        }));
      }
    }
    const sortedDates = Array.from(dates).reverse();
    sortedDates.forEach(date => {
      salesData.set(date, {
        total: 0,
        drinks: 0,
        food: 0
      });
    });
    transactions.forEach(transaction => {
      const transDate = new Date(transaction.date);
      let dateKey;
      if (timeRange === 'daily') {
        dateKey = transDate.toLocaleDateString();
      } else if (timeRange === 'weekly') {
        const weeksAgo = Math.floor((Date.now() - transDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        dateKey = `Week ${4 - weeksAgo}`;
      } else {
        dateKey = transDate.toLocaleDateString('default', {
          month: 'short'
        });
      }
      if (salesData.has(dateKey)) {
        const data = salesData.get(dateKey);
        data.total += transaction.total;
        transaction.items.forEach(item => {
          if (item.category === 'drinks') {
            data.drinks += item.price * item.quantity;
          } else if (item.category === 'food') {
            data.food += item.price * item.quantity;
          }
        });
      }
    });
    return {
      labels: sortedDates,
      data: sortedDates.map(date => salesData.get(date))
    };
  };
  const chartData = generateChartData();
  const StatCard = ({
    icon: Icon,
    label,
    value,
    subtext,
    trend,
    bgColor
  }) => <div className="relative group">
      <div className={`absolute inset-0 ${bgColor} opacity-50 rounded-2xl blur transition-all duration-200 group-hover:opacity-100`} />
      <div className="relative bg-white rounded-2xl shadow-sm p-6 transition-transform duration-200 group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div className={`${bgColor} rounded-full p-3`}>
            <Icon size={24} className="text-white" />
          </div>
          {trend && <div className={`flex items-center ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>}
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
      </div>
    </div>;
  const topItems = Object.entries(todayTransactions.reduce((acc, transaction) => {
    transaction.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return <div className="space-y-6 relative pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Today's Performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 rounded-lg ${timeRange === 'daily' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            Daily
          </button>
          <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 rounded-lg ${timeRange === 'weekly' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            Weekly
          </button>
          <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 rounded-lg ${timeRange === 'monthly' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            Monthly
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={TrendingUpIcon} label="Total Sales Today" value={`₱${todayStats.totalSales.toFixed(2)}`} subtext={`${todayStats.totalOrders} total orders`} trend={trends.sales} bgColor="bg-gradient-to-r from-pink-500 to-rose-500" />
        <StatCard icon={CoffeeIcon} label="Drinks Sales" value={`₱${todayStats.drinks.sales.toFixed(2)}`} subtext={`${todayStats.drinks.items} items in ${todayStats.drinks.orders} orders`} trend={trends.drinks} bgColor="bg-gradient-to-r from-blue-500 to-cyan-500" />
        <StatCard icon={UtensilsIcon} label="Food Sales" value={`₱${todayStats.food.sales.toFixed(2)}`} subtext={`${todayStats.food.items} items in ${todayStats.food.orders} orders`} trend={trends.food} bgColor="bg-gradient-to-r from-green-500 to-emerald-500" />
        <StatCard icon={UsersIcon} label="Average Order Value" value={`₱${todayStats.totalOrders ? (todayStats.totalSales / todayStats.totalOrders).toFixed(2) : '0'}`} subtext={`From ${todayStats.totalOrders} orders today`} trend={trends.avgOrder} bgColor="bg-gradient-to-r from-orange-500 to-amber-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Sales Overview</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Total</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Drinks</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Food</span>
              </div>
            </div>
          </div>
          <Line data={{
          labels: chartData.labels,
          datasets: [{
            label: 'Total Sales',
            data: chartData.data.map(d => d.total),
            borderColor: 'rgb(219, 39, 119)',
            backgroundColor: 'rgba(219, 39, 119, 0.5)',
            tension: 0.4
          }, {
            label: 'Drinks Sales',
            data: chartData.data.map(d => d.drinks),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.4
          }, {
            label: 'Food Sales',
            data: chartData.data.map(d => d.food),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
            tension: 0.4
          }]
        }} options={{
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => '₱' + value
              }
            }
          }
        }} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Today's Top Sellers
          </h2>
          <div className="space-y-4">
            {topItems.map(([name, quantity], index) => <div key={name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">
                    {index + 1}
                  </div>
                  <span className="ml-3 font-medium">{name}</span>
                </div>
                <span className="text-gray-500">{quantity} sold</span>
              </div>)}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          {todayTransactions.slice(0, 5).map(transaction => <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div>
                <p className="font-medium">Order #{transaction.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-pink-600">
                  ₱{transaction.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.items.length} items
                </p>
              </div>
            </div>)}
        </div>
      </div>
      <button onClick={onAddItem} className="fixed bottom-8 right-8 w-14 h-14 bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-700 transition-colors duration-200 hover:scale-110 transform">
        <PlusIcon size={24} />
      </button>
    </div>;
};