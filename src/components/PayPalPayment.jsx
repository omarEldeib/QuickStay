import React, { useState } from 'react';
import { processPayPalPayment } from '../services/paymentService';

const PayPalPayment = ({ amount, onSuccess, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate PayPal payment processing
      const paymentIntent = await processPayPalPayment(amount);
      onSuccess(paymentIntent);
    } catch (err) {
      setError(err.message);
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">Pay with PayPal</p>
            <p className="text-sm text-gray-600">Secure payment with PayPal</p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      
      <button
        onClick={handlePayPalPayment}
        disabled={isProcessing}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing PayPal Payment...</span>
          </>
        ) : (
          <>
            <span>Pay with PayPal</span>
            <span className="font-bold">${amount.toFixed(2)}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PayPalPayment;
