import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaCreditCard, FaPrint, FaEnvelope } from "react-icons/fa";
import { facilityIcons } from "../assets/assets";
import { sendBookingConfirmationEmail, sendBookingCancellationEmail } from "../services/emailService";

const MyBookings = () => {
  const { state, updateBooking, deleteBooking } = useApp();
  const [filter, setFilter] = useState("all");
  const [emailStatus, setEmailStatus] = useState({});
  
  const bookings = state.bookings;

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const handlePrintBooking = (booking) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent(booking);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleSendEmail = async (booking) => {
    const bookingId = booking._id;
    setEmailStatus(prev => ({ ...prev, [bookingId]: 'sending' }));
    
    try {
      const userEmail = booking.user?.email || 'guest@example.com';
      await sendBookingConfirmationEmail(booking, userEmail);
      setEmailStatus(prev => ({ ...prev, [bookingId]: 'sent' }));
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setEmailStatus(prev => ({ ...prev, [bookingId]: null }));
      }, 3000);
    } catch (error) {
      setEmailStatus(prev => ({ ...prev, [bookingId]: 'error' }));
      setTimeout(() => {
        setEmailStatus(prev => ({ ...prev, [bookingId]: null }));
      }, 3000);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const booking = bookings.find(b => b._id === bookingId);
      updateBooking(bookingId, { status: 'cancelled' });
      
      // Send cancellation email
      try {
        const userEmail = booking.user?.email || 'guest@example.com';
        await sendBookingCancellationEmail(booking, userEmail);
      } catch (error) {
        console.error('Failed to send cancellation email:', error);
      }
    }
  };

  const generatePrintContent = (booking) => {
    const checkInDate = new Date(booking.checkInDate).toLocaleDateString();
    const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString();
    const nights = Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24));
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Confirmation - ${booking.room.hotel.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .booking-details { border: 1px solid #ddd; padding: 20px; margin: 20px 0; }
          .section { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          .label { font-weight: bold; }
          .status { padding: 5px 10px; border-radius: 5px; color: white; }
          .confirmed { background-color: #10b981; }
          .pending { background-color: #f59e0b; }
          .cancelled { background-color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmation</h1>
          <h2>${booking.room.hotel.name}</h2>
        </div>
        
        <div class="booking-details">
          <h3>Booking Information</h3>
          <div class="row">
            <span class="label">Booking ID:</span>
            <span>QS${booking._id.slice(-6)}</span>
          </div>
          <div class="row">
            <span class="label">Status:</span>
            <span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
          </div>
          <div class="row">
            <span class="label">Room Type:</span>
            <span>${booking.room.roomType}</span>
          </div>
          <div class="row">
            <span class="label">Check-in:</span>
            <span>${checkInDate}</span>
          </div>
          <div class="row">
            <span class="label">Check-out:</span>
            <span>${checkOutDate}</span>
          </div>
          <div class="row">
            <span class="label">Nights:</span>
            <span>${nights}</span>
          </div>
          <div class="row">
            <span class="label">Guests:</span>
            <span>${booking.guests}</span>
          </div>
          <div class="row">
            <span class="label">Total Amount:</span>
            <span>$${booking.totalPrice}</span>
          </div>
          <div class="row">
            <span class="label">Payment Method:</span>
            <span>${booking.paymentMethod}</span>
          </div>
          <div class="row">
            <span class="label">Payment Status:</span>
            <span>${booking.isPaid ? 'Paid' : 'Pending'}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Hotel Information</h3>
          <p><strong>Address:</strong> ${booking.hotel.address}</p>
          <p><strong>Phone:</strong> ${booking.hotel.phone || 'N/A'}</p>
        </div>
        
        <div class="section">
          <h3>Guest Information</h3>
          <p><strong>Name:</strong> ${booking.user?.username || 'Guest User'}</p>
          <p><strong>Email:</strong> ${booking.user?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${booking.user?.phone || 'N/A'}</p>
        </div>
        
        <div class="section">
          <h3>Important Notes</h3>
          <ul>
            <li>Please arrive at the hotel on your check-in date between 3:00 PM and 11:00 PM</li>
            <li>Check-out time is 11:00 AM on your departure date</li>
            <li>Please bring a valid ID and this booking confirmation</li>
            <li>Cancellation policy: Free cancellation up to 24 hours before check-in</li>
          </ul>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your hotel reservations and bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Bookings", count: bookings.length },
                { key: "confirmed", label: "Confirmed", count: bookings.filter(b => b.status === "confirmed").length },
                { key: "pending", label: "Pending", count: bookings.filter(b => b.status === "pending").length },
                { key: "cancelled", label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">You don't have any bookings in this category yet.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img
                          src={booking.room.images[0]}
                          alt={booking.room.roomType}
                          className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.hotel.name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{booking.room.roomType}</p>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(4)].map((_, i) => (
                              <BsStarFill key={i} className="text-yellow-400 w-4 h-4" />
                            ))}
                            <BsStarHalf className="text-yellow-400 w-4 h-4" />
                            <span className="text-sm text-gray-600 ml-1">200+ reviews</span>
                          </div>
                          
                          {/* Booking Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <FaCalendarAlt className="text-gray-500 w-4 h-4" />
                                <span>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaCalendarAlt className="text-gray-500 w-4 h-4" />
                                <span>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaUser className="text-gray-500 w-4 h-4" />
                                <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkerAlt className="text-gray-500 w-4 h-4" />
                                <span>{booking.hotel.address}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaCreditCard className="text-gray-500 w-4 h-4" />
                                <span>{booking.paymentMethod}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Booking ID: </span>
                                <span className="font-mono">QS{booking._id.slice(-6)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                              {booking.room.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                                  <img src={facilityIcons[amenity]} alt={amenity} className="w-3 h-3" />
                                  {amenity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="mt-6 lg:mt-0 lg:ml-6 lg:text-right">
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-gray-900">${booking.totalPrice}</p>
                        <p className="text-sm text-gray-600">Total amount</p>
                        {booking.isPaid ? (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mt-1">
                            Payment Pending
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <button
                          onClick={() => handlePrintBooking(booking)}
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <FaPrint className="w-4 h-4" />
                          Print
                        </button>
                        
                        <button
                          onClick={() => handleSendEmail(booking)}
                          disabled={emailStatus[booking._id] === 'sending'}
                          className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            emailStatus[booking._id] === 'sent' ? 'bg-green-50 border-green-300 text-green-700' : ''
                          }`}
                        >
                          {emailStatus[booking._id] === 'sending' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                              Sending...
                            </>
                          ) : emailStatus[booking._id] === 'sent' ? (
                            <>
                              <FaEnvelope className="w-4 h-4" />
                              Email Sent!
                            </>
                          ) : emailStatus[booking._id] === 'error' ? (
                            <>
                              <FaEnvelope className="w-4 h-4" />
                              Failed
                            </>
                          ) : (
                            <>
                              <FaEnvelope className="w-4 h-4" />
                              Send Email
                            </>
                          )}
                        </button>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Modify Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
