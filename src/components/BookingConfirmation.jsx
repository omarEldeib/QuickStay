import React, { useState } from 'react';
import { FaPrint, FaEnvelope, FaDownload, FaCheckCircle, FaCalendarAlt, FaUser, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';

const BookingConfirmation = ({ booking, onClose }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const handlePrint = () => {
    const printContent = document.getElementById('booking-details');
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleSendEmail = async () => {
    setSendingEmail(true);
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setSendingEmail(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                <p className="text-green-100">Your reservation has been successfully created</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Booking ID */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="text-xl font-bold text-gray-900">#{booking._id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPrint className="w-4 h-4" />
              Print Booking
            </button>
            
            <button
              onClick={handleSendEmail}
              disabled={sendingEmail || emailSent}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : emailSent ? (
                <>
                  <FaCheckCircle className="w-4 h-4" />
                  Email Sent!
                </>
              ) : (
                <>
                  <FaEnvelope className="w-4 h-4" />
                  Send Email
                </>
              )}
            </button>
            
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaDownload className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          {/* Email Status */}
          {emailSent && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5" />
                <span className="font-medium">Email sent successfully!</span>
              </div>
              <p className="text-sm mt-1">Booking confirmation has been sent to your email address.</p>
            </div>
          )}

          {/* Booking Details - Printable Content */}
          <div id="booking-details" className="space-y-6">
            {/* Hotel Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                Hotel Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={booking.room.images[0]}
                    alt={booking.room.hotel.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{booking.room.hotel.name}</h4>
                    <p className="text-gray-600">{booking.room.roomType}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">4.5 (200+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>{booking.room.hotel.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Check-in Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(booking.checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-out Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(booking.checkOutDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Nights</p>
                    <p className="font-semibold text-gray-900">{nights} night{nights !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Number of Guests</p>
                    <p className="font-semibold text-gray-900">{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room Price per Night</p>
                    <p className="font-semibold text-gray-900">${booking.room.pricePerNight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold text-gray-900 text-lg">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCreditCard className="w-5 h-5 text-blue-600" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">{booking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      booking.isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.isPaid ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-semibold text-gray-900">{booking.paymentIntentId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booking Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="w-5 h-5 text-blue-600" />
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Guest Name</p>
                    <p className="font-semibold text-gray-900">{booking.user?.username || 'Guest User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{booking.user?.email || 'guest@example.com'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{booking.user?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Special Requests</p>
                    <p className="font-semibold text-gray-900">{booking.specialRequests || 'None'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">Important Information</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Please arrive at the hotel on your check-in date between 3:00 PM and 11:00 PM</li>
                <li>• Check-out time is 11:00 AM on your departure date</li>
                <li>• Please bring a valid ID and this booking confirmation</li>
                <li>• Cancellation policy: Free cancellation up to 24 hours before check-in</li>
                <li>• For any changes or questions, contact the hotel directly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
