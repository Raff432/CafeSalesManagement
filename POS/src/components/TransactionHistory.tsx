import React, { useState } from 'react';
import { ReceiptIcon, ChevronDownIcon } from 'lucide-react';
export const TransactionHistory = ({
  transactions
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const groupByDate = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
  const totalForDay = transactions => {
    return transactions.reduce((sum, t) => sum + t.total, 0);
  };
  return <div className="bg-white rounded-lg shadow">
      <div className="bg-pink-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <ReceiptIcon className="mr-2" size={20} />
          <h2 className="text-xl font-bold">Transaction History</h2>
        </div>
        <div className="text-sm">Total Orders Today: {transactions.length}</div>
      </div>
      <div className="divide-y divide-gray-200">
        {Object.entries(groupByDate).map(([date, dayTransactions]) => <div key={date} className="border-b">
            <button onClick={() => setSelectedDate(selectedDate === date ? null : date)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div>
                <h3 className="font-medium">{date}</h3>
                <p className="text-sm text-gray-500">
                  {dayTransactions.length} orders
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-pink-600 font-bold mr-2">
                  ₱{totalForDay(dayTransactions).toFixed(2)}
                </span>
                <ChevronDownIcon size={20} className={`transform transition-transform ${selectedDate === date ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {selectedDate === date && <div className="bg-gray-50 px-4 py-2">
                {dayTransactions.map(transaction => <div key={transaction.id} className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </p>
                        <p className="font-medium">Order #{transaction.id}</p>
                      </div>
                      <span className="text-pink-600 font-bold">
                        ₱{transaction.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.items.map(item => <div key={item.id} className="flex justify-between py-1">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>)}
                    </div>
                  </div>)}
              </div>}
          </div>)}
      </div>
    </div>;
};