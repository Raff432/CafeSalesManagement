import React from 'react';
import { MinusCircleIcon, PlusCircleIcon, TrashIcon, XCircleIcon } from 'lucide-react';
export const OrderSummary = ({
  cart,
  updateItemQuantity,
  removeFromCart,
  onCancel
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div>
      {cart.length === 0 ? <div className="text-center py-8 text-gray-500">
          <p>No items in cart</p>
          <p className="text-sm mt-2">Add items from the menu</p>
        </div> : <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Order Items</h3>
            <button onClick={onCancel} className="text-red-500 hover:text-red-600 flex items-center text-sm">
              <XCircleIcon size={16} className="mr-1" />
              Clear All
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {cart.map(item => <div key={item.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-pink-600 font-bold">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-pink-600">
                    <MinusCircleIcon size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-pink-600">
                    <PlusCircleIcon size={20} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 ml-2">
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>)}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-pink-600">₱{total.toFixed(2)}</span>
            </div>
          </div>
        </>}
    </div>;
};