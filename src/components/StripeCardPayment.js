import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock } from 'lucide-react';

const StripeCardPayment = ({ 
  balance, 
  currencies, 
  sendForm, 
  setSendForm, 
  currentUser, 
  onPaymentSuccess, 
  apiBaseUrl 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionData, setConversionData] = useState(null);

  // Calculate conversion when form changes
  useEffect(() => {
    const calculateConversion = async () => {
      if (!sendForm.amount || sendForm.amount <= 0) {
        setConversionData(null);
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/calculate-conversion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(sendForm.amount),
            fromCurrency: sendForm.fromCurrency,
            toCurrency: sendForm.toCurrency,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setConversionData(data);
        }
      } catch (error) {
        console.error('Error calculating conversion:', error);
      }
    };

    const timeoutId = setTimeout(calculateConversion, 500);
    return () => clearTimeout(timeoutId);
  }, [sendForm.amount, sendForm.fromCurrency, sendForm.toCurrency, apiBaseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe is not loaded yet. Please wait a moment.');
      return;
    }
    
    if (!sendForm.recipient || !sendForm.amount) {
      setError('Please fill in recipient and amount');
      return;
    }

    const amount = parseFloat(sendForm.amount);
    if (amount <= 0) {
      setError('Amount must be positive');
      return;
    }

    // Check balance
    const totalCost = amount + 2; // Including $2 fee
    if (balance[sendForm.fromCurrency] < totalCost) {
      setError(`Insufficient balance. Need ${totalCost} ${sendForm.fromCurrency}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Add funds to user account via Stripe
      const cardElement = elements.getElement(CardElement);
      
      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: sendForm.recipient,
        },
      });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // Step 2: Process payment through our backend
      const userIdentifier = currentUser.walletAddress || currentUser.email || currentUser.id;
      
      const addFundsResponse = await fetch(`${apiBaseUrl}/api/payments/add-funds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          currency: sendForm.fromCurrency,
          paymentMethodId: paymentMethod.id,
          userIdentifier: userIdentifier
        }),
      });

      const addFundsResult = await addFundsResponse.json();

      if (!addFundsResponse.ok || !addFundsResult.success) {
        throw new Error(addFundsResult.error || 'Payment failed');
      }

      // Step 3: Send the money (now that funds are added)
      const sendResponse = await fetch(`${apiBaseUrl}/api/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: sendForm.recipient,
          amount: amount,
          fromCurrency: sendForm.fromCurrency,
          toCurrency: sendForm.toCurrency,
          message: sendForm.message,
          senderIdentifier: userIdentifier,
          senderType: 'card_payment'
        }),
      });

      const sendResult = await sendResponse.json();

      if (sendResponse.ok && sendResult.success) {
        // Clear the card element
        cardElement.clear();
        
        // Notify parent component
        onPaymentSuccess({
          transaction: sendResult,
          amount: amount,
          fromCurrency: sendForm.fromCurrency
        });

        alert(`Payment successful! Sent ${sendResult.amountReceived} ${sendForm.toCurrency} to ${sendForm.recipient}`);
      } else {
        throw new Error(sendResult.error || 'Transfer failed after payment');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        backgroundColor: 'transparent',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      invalid: {
        color: '#ff6b6b',
        iconColor: '#ff6b6b'
      },
      complete: {
        color: '#4ade80',
        iconColor: '#4ade80'
      }
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Pay with Card</h3>
        <Lock className="w-4 h-4 text-green-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Recipient Email
          </label>
          <input
            type="email"
            placeholder="recipient@example.com"
            value={sendForm.recipient}
            onChange={(e) => setSendForm({...sendForm, recipient: e.target.value})}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Pay From
            </label>
            <select
              value={sendForm.fromCurrency}
              onChange={(e) => setSendForm({...sendForm, fromCurrency: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.filter(c => ['USD', 'EUR', 'GBP', 'CNY'].includes(c.code)).map(c => (
                <option key={c.code} value={c.code} className="bg-gray-800">
                  {c.flag} {c.code} (${balance[c.code] || 0})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Send To
            </label>
            <select
              value={sendForm.toCurrency}
              onChange={(e) => setSendForm({...sendForm, toCurrency: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-800">
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Amount ({sendForm.fromCurrency})
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={sendForm.amount}
            onChange={(e) => setSendForm({...sendForm, amount: e.target.value})}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0.01"
            required
          />
          
          {conversionData && (
            <div className="mt-2 p-3 bg-blue-500/20 rounded-lg">
              <p className="text-white text-sm">
                Recipient receives: <strong>{conversionData.convertedAmount} {sendForm.toCurrency}</strong>
              </p>
              <p className="text-blue-200 text-xs">
                Exchange rate: 1 {sendForm.fromCurrency} = {conversionData.exchangeRate} {sendForm.toCurrency}
              </p>
              <p className="text-blue-200 text-xs">
                Total cost: {parseFloat(sendForm.amount || 0) + 2} {sendForm.fromCurrency} (includes $2 fee)
              </p>
            </div>
          )}
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Card Information
          </label>
          <div className="bg-white/10 border border-white/20 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement options={cardElementOptions} />
          </div>
          <p className="text-xs text-white/60 mt-1">
            Your card will be charged {sendForm.amount} {sendForm.fromCurrency} + $2 processing fee
          </p>
        </div>

        {/* Message */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Message (Optional)
          </label>
          <textarea
            placeholder="Add a note for the recipient..."
            value={sendForm.message}
            onChange={(e) => setSendForm({...sendForm, message: e.target.value})}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading || !sendForm.recipient || !sendForm.amount}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Pay & Send Money</span>
            </span>
          )}
        </button>
      </form>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
        <Lock className="w-3 h-3" />
        <span>Secured by Stripe • Your card details are never stored</span>
      </div>
    </div>
  );
};

export default StripeCardPayment;