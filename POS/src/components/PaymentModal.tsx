import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, CreditCardIcon, BanknoteIcon, SmartphoneIcon } from 'lucide-react';
import { toast } from 'sonner';
export const PaymentModal = ({
  onClose,
  cart,
  onComplete
}) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const change = parseFloat(paymentAmount || 0) - total;
  const quickAmounts = [100, 200, 500, 1000];
  const handlePayment = () => {
    if (paymentMethod === 'cash' && parseFloat(paymentAmount) < total) {
      toast.error('Insufficient payment amount');
      return;
    }
    if ((paymentMethod === 'gcash' || paymentMethod === 'paymaya') && !referenceNumber) {
      toast.error('Please enter a reference number');
      return;
    }
    if (paymentMethod === 'card') {
      setPaymentAmount(total.toString());
    }
    setPaymentComplete(true);
    toast.success(`Payment successful via ${paymentMethod.toUpperCase()}`);
  };
  const handleComplete = () => {
    onComplete(paymentMethod);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Process Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        {paymentComplete ? <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon size={80} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Payment Complete</h3>
            {paymentMethod === 'cash' && <p className="text-gray-600 mb-4">
                Change:{' '}
                <span className="text-green-600 font-bold">
                  ₱{change.toFixed(2)}
                </span>
              </p>}
            <button onClick={handleComplete} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium">
              Done
            </button>
          </div> : <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[{
            id: 'cash',
            label: 'Cash',
            icon: BanknoteIcon,
            color: 'pink'
          }, {
            id: 'gcash',
            label: 'GCash',
            icon: SmartphoneIcon,
            color: 'blue'
          }, {
            id: 'paymaya',
            label: 'PayMaya',
            icon: SmartphoneIcon,
            color: 'purple'
          }, {
            id: 'card',
            label: 'Card',
            icon: CreditCardIcon,
            color: 'green'
          }].map(({
            id,
            label,
            icon: Icon,
            color
          }) => <button key={id} onClick={() => setPaymentMethod(id)} className={`
                    p-4 rounded-lg border-2 transition-colors flex flex-col items-center
                    ${paymentMethod === id ? `bg-${color}-600 text-white border-transparent` : `border-gray-200 hover:border-${color}-500`}
                  `}>
                  <Icon size={24} className="mb-2" />
                  <span className="font-medium">{label}</span>
                </button>)}
            </div>
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Order Summary</h3>
              <div className="border-t border-b py-2">
                {cart.map(item => <div key={item.id} className="flex justify-between py-1">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>)}
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 mt-2">
                <span>Total:</span>
                <span className="text-pink-600">₱{total.toFixed(2)}</span>
              </div>
            </div>
            {paymentMethod === 'cash' && <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Amount Received (₱)
                </label>
                <input type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg mb-3" min={total} step="0.01" required />
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {quickAmounts.map(amount => <button key={amount} onClick={() => setPaymentAmount(amount.toString())} className="bg-gray-100 hover:bg-gray-200 py-2 rounded">
                      ₱{amount}
                    </button>)}
                </div>
                {parseFloat(paymentAmount || 0) >= total && <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Change:</span>
                      <span className="text-green-600 font-bold text-xl">
                        ₱{change.toFixed(2)}
                      </span>
                    </div>
                  </div>}
              </div>}
            {(paymentMethod === 'gcash' || paymentMethod === 'paymaya') && <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <SmartphoneIcon size={48} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">
                    Enter the reference number from your{' '}
                    {paymentMethod === 'gcash' ? 'GCash' : 'PayMaya'} payment
                  </p>
                </div>
                <input type="text" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} placeholder="Enter reference number" className="w-full p-3 border border-gray-300 rounded-lg mb-4" required />
                <div className="text-sm text-gray-500 text-center">
                  Please ensure the reference number is correct before
                  proceeding
                </div>
              </div>}
            {paymentMethod === 'card' && <div className="mb-6 bg-gray-50 p-6 rounded-lg text-center">
                <CreditCardIcon size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 mb-4">
                  Process card payment on terminal
                </p>
                <button onClick={() => setPaymentAmount(total.toString())} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Confirm Card Payment
                </button>
              </div>}
            <div className="flex justify-end space-x-4">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                Cancel
              </button>
              <button onClick={handlePayment} className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700" disabled={paymentMethod === 'cash' && parseFloat(paymentAmount || 0) < total || (paymentMethod === 'gcash' || paymentMethod === 'paymaya') && !referenceNumber}>
                Complete Payment
              </button>
            </div>
          </>}
      </div>
    </div>;
};