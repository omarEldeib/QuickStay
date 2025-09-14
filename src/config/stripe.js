import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
// You can get this from your Stripe dashboard
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz');

export default stripePromise;
