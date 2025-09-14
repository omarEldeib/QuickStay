import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCreditCard, FaLock, FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { facilityIcons } from "../assets/assets";
import StripePayment from "../components/StripePayment";
import PayPalPayment from "../components/PayPalPayment";
import BookingConfirmation from "../components/BookingConfirmation";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useApp();
  const { room, checkIn, checkOut, guests, totalPrice } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (!room) {
      navigate("/hotels");
    }
  }, [room, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = room?.pricePerNight * nights || 0;
    const tax = subtotal * 0.1; // 10% tax
    const serviceFee = subtotal * 0.05; // 5% service fee
    return {
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee
    };
  };

  const handlePaymentSuccess = (paymentIntent) => {
    // Create the booking after successful payment
    const bookingData = {
      room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: totals.total,
      guests,
      paymentMethod,
      isPaid: true,
      paymentIntentId: paymentIntent.id,
      user: {
        username: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        phone: formData.phone
      }
    };
    
    const newBooking = addBooking(bookingData);
    setConfirmedBooking(bookingData);
    setBookingConfirmed(true);
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message);
    setIsProcessing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'hotel') {
      // For pay at hotel, no payment processing needed
      const bookingData = {
        room,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalPrice: totals.total,
        guests,
        paymentMethod,
        isPaid: false,
        user: {
          username: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          phone: formData.phone
        }
      };
      
      addBooking(bookingData);
      setConfirmedBooking(bookingData);
      setBookingConfirmed(true);
    } else {
      // For card payments, the StripePayment component will handle the payment
      setIsProcessing(true);
      setPaymentError(null);
    }
  };

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your reservation has been successfully created.</p>
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <p><strong>Booking ID:</strong> QS{Date.now().toString().slice(-6)}</p>
            <p><strong>Check-in:</strong> {checkIn}</p>
            <p><strong>Check-out:</strong> {checkOut}</p>
            <p><strong>Total:</strong> ${calculateTotal().total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 x-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="inline w-4 h-4 mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="inline w-4 h-4 mr-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="inline w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline w-4 h-4 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <div className="space-y-3 mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <FaCreditCard className="mr-2" />
                      Credit/Debit Card
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      PayPal
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="hotel"
                        checked={paymentMethod === "hotel"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      Pay at Hotel
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaCreditCard className="inline w-4 h-4 mr-2" />
                          Card Information
                        </label>
                        <StripePayment
                          amount={totals.total}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PayPal Payment
                        </label>
                        <PayPalPayment
                          amount={totals.total}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Billing Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                            <option value="IT">Italy</option>
                            <option value="ES">Spain</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaLock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {paymentMethod === 'card' || paymentMethod === 'paypal' ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Complete your payment above to finish booking
                    </p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Complete Booking"}
                  </button>
                )}
                
                {paymentError && (
                  <div className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                    {paymentError}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              {/* Room Details */}
              <div className="border-b pb-4 mb-4">
                <img
                  src={room.images[0]}
                  alt={room.roomType}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-gray-900">{room.hotel.name}</h3>
                <p className="text-sm text-gray-600">{room.roomType}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <BsStarFill key={i} className="text-yellow-400 w-4 h-4" />
                  ))}
                  <BsStarHalf className="text-yellow-400 w-4 h-4" />
                  <span className="text-sm text-gray-600 ml-1">200+ reviews</span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-gray-500" />
                  <span>Check-in: {checkIn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-gray-500" />
                  <span>Check-out: {checkOut}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaUser className="text-gray-500" />
                  <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Nights:</span>
                  <span>{calculateNights()}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                      <img src={facilityIcons[amenity]} alt={amenity} className="w-3 h-3" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>${room.pricePerNight} × {calculateNights()} nights</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee (5%)</span>
                    <span>${totals.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {bookingConfirmed && confirmedBooking && (
        <BookingConfirmation
          booking={confirmedBooking}
          onClose={() => {
            setBookingConfirmed(false);
            setConfirmedBooking(null);
            navigate('/my-bookings');
          }}
        />
      )}
    </div>
  );
};

export default Booking;
