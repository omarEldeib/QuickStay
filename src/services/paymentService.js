// Payment service for handling Stripe payments
export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    // In a real application, this would call your backend API
    // For now, we'll simulate the payment intent creation
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    // For demo purposes, return a mock client secret
    return 'pi_mock_client_secret_for_demo';
  }
};

export const processPayment = async (stripe, elements, clientSecret) => {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success`,
      },
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  } catch (error) {
    console.error('Payment failed:', error);
    throw error;
  }
};

// Mock payment processing for demo
export const processMockPayment = async (amount, paymentMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment success/failure
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        resolve({
          id: `pi_${Date.now()}`,
          status: 'succeeded',
          amount: Math.round(amount * 100),
          currency: 'usd',
          payment_method: paymentMethod,
        });
      } else {
        reject(new Error('Payment failed. Please try again.'));
      }
    }, 2000);
  });
};

// PayPal payment processing
export const processPayPalPayment = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate PayPal payment success/failure
      const success = Math.random() > 0.05; // 95% success rate for PayPal
      
      if (success) {
        resolve({
          id: `pp_${Date.now()}`,
          status: 'succeeded',
          amount: Math.round(amount * 100),
          currency: 'usd',
          payment_method: 'paypal',
        });
      } else {
        reject(new Error('PayPal payment failed. Please try again.'));
      }
    }, 3000); // PayPal takes a bit longer
  });
};
