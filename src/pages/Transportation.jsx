import React, { useState, useEffect } from 'react';
import { FaPlane, FaBus, FaTrain, FaSearch, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaClock, FaCreditCard, FaPrint, FaEnvelope, FaCheckCircle, FaTimes, FaArrowRight, FaStar, FaWifi, FaUtensils, FaTv, FaSnowflake, FaWheelchair } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Transportation = () => {
  const navigate = useNavigate();
  const { state, addTransportBooking } = useApp();
  const [activeTab, setActiveTab] = useState('flights');
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
    seatPreference: '',
    mealPreference: 'standard',
    specialRequests: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showHotelSuggestions, setShowHotelSuggestions] = useState(false);
  const [suggestedHotels, setSuggestedHotels] = useState([]);

  // Use transportation data from context
  const transportData = state.transportation;

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      setSearchResults(transportData.flights);
    } else if (activeTab === 'buses') {
      setSearchResults(transportData.buses);
    } else if (activeTab === 'trains') {
      setSearchResults(transportData.trains);
    }
  };

  const handleBookTransport = (transport) => {
    setSelectedTransport(transport);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    // Create booking using context
    const bookingData = {
      transport: selectedTransport,
      passenger: bookingForm
    };

    try {
      const newBooking = addTransportBooking(bookingData);
      
      setConfirmedBooking(newBooking);
      setBookingConfirmed(true);
      setIsBooking(false);
      setShowBookingForm(false);

      // Show hotel suggestions for destination
      if (selectedTransport.to) {
        const hotels = state.rooms.filter(room => 
          room.hotel.city.toLowerCase().includes(selectedTransport.to.toLowerCase())
        );
        setSuggestedHotels(hotels.slice(0, 3));
        setShowHotelSuggestions(true);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      setIsBooking(false);
    }
  };

  const handlePrintTicket = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Transportation Ticket</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .ticket { border: 2px solid #333; padding: 20px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .section { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { margin-top: 5px; }
          .qr-code { text-align: center; margin-top: 20px; padding: 20px; background: #f5f5f5; }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <h1>${selectedTransport.type === 'flight' ? 'Flight' : selectedTransport.type === 'bus' ? 'Bus' : 'Train'} Ticket</h1>
            <p>Booking ID: ${confirmedBooking.id}</p>
          </div>
          <div class="details">
            <div class="section">
              <div class="label">${selectedTransport.type === 'flight' ? 'Airline' : selectedTransport.type === 'bus' ? 'Company' : 'Railway'}</div>
              <div class="value">${selectedTransport.airline || selectedTransport.company}</div>
            </div>
            <div class="section">
              <div class="label">${selectedTransport.type === 'flight' ? 'Flight Number' : selectedTransport.type === 'bus' ? 'Bus Number' : 'Train Number'}</div>
              <div class="value">${selectedTransport.flightNumber || selectedTransport.busNumber || selectedTransport.trainNumber}</div>
            </div>
            <div class="section">
              <div class="label">From</div>
              <div class="value">${selectedTransport.from}</div>
            </div>
            <div class="section">
              <div class="label">To</div>
              <div class="value">${selectedTransport.to}</div>
            </div>
            <div class="section">
              <div class="label">Departure</div>
              <div class="value">${selectedTransport.departure}</div>
            </div>
            <div class="section">
              <div class="label">Arrival</div>
              <div class="value">${selectedTransport.arrival}</div>
            </div>
            <div class="section">
              <div class="label">Duration</div>
              <div class="value">${selectedTransport.duration}</div>
            </div>
            <div class="section">
              <div class="label">Class</div>
              <div class="value">${selectedTransport.class}</div>
            </div>
            <div class="section">
              <div class="label">Passenger</div>
              <div class="value">${bookingForm.firstName} ${bookingForm.lastName}</div>
            </div>
            <div class="section">
              <div class="label">Email</div>
              <div class="value">${bookingForm.email}</div>
            </div>
            <div class="section">
              <div class="label">Total Price</div>
              <div class="value">$${selectedTransport.price}</div>
            </div>
          </div>
          <div class="qr-code">
            <p>QR Code for Boarding</p>
            <div style="width: 100px; height: 100px; background: #000; margin: 10px auto; display: flex; align-items: center; justify-content: center; color: white;">
              QR
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSendEmail = async () => {
    // Simulate sending email
    alert('Ticket sent to your email successfully!');
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'flight': return <FaPlane className="w-6 h-6" />;
      case 'bus': return <FaBus className="w-6 h-6" />;
      case 'train': return <FaTrain className="w-6 h-6" />;
      default: return <FaPlane className="w-6 h-6" />;
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <FaWifi className="w-4 h-4" />;
      case 'meals': return <FaUtensils className="w-4 h-4" />;
      case 'entertainment': return <FaTv className="w-4 h-4" />;
      case 'air_conditioning': return <FaSnowflake className="w-4 h-4" />;
      case 'restroom': return <FaWheelchair className="w-4 h-4" />;
      default: return <FaCheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Transportation Booking
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            Find and book flights, buses, and trains to your destination with ease. 
            Complete your journey with our integrated hotel booking system.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto pb-8 sm:pb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          {/* Transport Type Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'flights'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <FaPlane className="w-6 h-6" />
              Flights
            </button>
            <button
              onClick={() => setActiveTab('buses')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'buses'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <FaBus className="w-6 h-6" />
              Buses
            </button>
            <button
              onClick={() => setActiveTab('trains')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'trains'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <FaTrain className="w-6 h-6" />
              Trains
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  From
                </label>
                <input
                  type="text"
                  value={searchForm.from}
                  onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                  placeholder="Departure city"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  To
                </label>
                <input
                  type="text"
                  value={searchForm.to}
                  onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                  placeholder="Destination city"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={searchForm.departureDate}
                  onChange={(e) => setSearchForm({...searchForm, departureDate: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Passengers
                </label>
                <select
                  value={searchForm.passengers}
                  onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                >
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 text-lg"
              >
                <FaSearch className="w-6 h-6" />
                Search {activeTab === 'flights' ? 'Flights' : activeTab === 'buses' ? 'Buses' : 'Trains'}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Available {activeTab === 'flights' ? 'Flights' : activeTab === 'buses' ? 'Buses' : 'Trains'}
            </h2>
            <div className="space-y-0">
              {searchResults.map((transport, index) => (
                <div key={transport.id} className={`flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6 py-6 sm:py-8 ${
                  index !== searchResults.length - 1 ? "border-b border-gray-200" : ""
                }`}>
                  {/* Transport Image/Icon */}
                  <div className="w-full sm:w-80 lg:w-96 h-48 sm:h-56 lg:h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-blue-600 text-6xl">
                      {getTransportIcon(transport.type)}
                    </div>
                  </div>
                  
                  {/* Transport Details */}
                  <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 flex-1">
                    <span className="text-gray-600 text-sm sm:text-base">
                      {transport.from} to {transport.to}
                    </span>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {transport.airline || transport.company}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {transport.flightNumber || transport.busNumber || transport.trainNumber}
                    </p>

                    {/* Route Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{transport.departure}</div>
                        <div className="text-xs">{transport.from}</div>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{transport.arrival}</div>
                        <div className="text-xs">{transport.to}</div>
                      </div>
                    </div>

                    {/* Duration and Stops */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>{transport.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span>{transport.stops}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {transport.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="capitalize">{amenity.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between w-full mt-2">
                      <div>
                        <span className="text-lg sm:text-xl text-gray-700 font-semibold">
                          ${transport.price}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">{transport.class}</span>
                      </div>
                      <button
                        onClick={() => handleBookTransport(transport)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedTransport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book {selectedTransport.type === 'flight' ? 'Flight' : selectedTransport.type === 'bus' ? 'Bus' : 'Train'}
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedTransport.airline || selectedTransport.company}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{selectedTransport.from} → {selectedTransport.to}</span>
                  <span>{selectedTransport.departure} - {selectedTransport.arrival}</span>
                  <span className="font-semibold text-lg">${selectedTransport.price}</span>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={bookingForm.firstName}
                      onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={bookingForm.lastName}
                      onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedTransport.type === 'flight' ? 'Passport Number' : 'ID Number'}
                  </label>
                  <input
                    type="text"
                    value={bookingForm.passport}
                    onChange={(e) => setBookingForm({...bookingForm, passport: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seat Preference
                    </label>
                    <select
                      value={bookingForm.seatPreference}
                      onChange={(e) => setBookingForm({...bookingForm, seatPreference: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">No preference</option>
                      <option value="window">Window</option>
                      <option value="aisle">Aisle</option>
                      <option value="middle">Middle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meal Preference
                    </label>
                    <select
                      value={bookingForm.mealPreference}
                      onChange={(e) => setBookingForm({...bookingForm, mealPreference: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="standard">Standard</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="halal">Halal</option>
                      <option value="kosher">Kosher</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBooking}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? 'Processing...' : `Book for $${selectedTransport.price}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {bookingConfirmed && confirmedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600">
                  Your {selectedTransport.type} has been successfully booked
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passenger:</span>
                    <span className="font-medium">{bookingForm.firstName} {bookingForm.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{selectedTransport.from} → {selectedTransport.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-medium text-lg">${selectedTransport.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrintTicket}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  <FaPrint className="w-5 h-5" />
                  Print Ticket
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <FaEnvelope className="w-5 h-5" />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hotel Suggestions Modal */}
      {showHotelSuggestions && suggestedHotels.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Suggested Hotels in {selectedTransport.to}
                </h2>
                <button
                  onClick={() => setShowHotelSuggestions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-0">
                {suggestedHotels.map((room, index) => (
                  <div key={room._id} className={`flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6 py-6 sm:py-8 ${
                    index !== suggestedHotels.length - 1 ? "border-b border-gray-200" : ""
                  }`}>
                    <img
                      src={room.images[0]}
                      alt={room.hotel.name}
                      className="rounded-2xl w-full sm:w-80 lg:w-96 h-48 sm:h-56 lg:h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setShowHotelSuggestions(false);
                        navigate(`/rooms/${room._id}`);
                      }}
                    />
                    <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 flex-1">
                      <span className="text-gray-600 text-sm sm:text-base">
                        {room.hotel.city}
                      </span>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{room.hotel.name}</h2>

                      {/* Rating */}
                      <div className="flex justify-start items-center gap-3">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <FaStar className="text-yellow-400 w-4 h-4" />
                        </div>
                        <span className="text-sm text-gray-500">200+ reviews</span>
                      </div>

                      {/* Address */}
                      <div className="flex justify-start items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span className="text-sm">{room.hotel.address}</span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {room.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
                          >
                            {amenity}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between w-full mt-2">
                        <span className="text-lg sm:text-xl text-gray-700 font-semibold">
                          ${room.pricePerNight} /night
                        </span>
                        <button
                          onClick={() => {
                            setShowHotelSuggestions(false);
                            navigate(`/rooms/${room._id}`);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowHotelSuggestions(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transportation;
