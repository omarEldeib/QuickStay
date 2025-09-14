import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  facilityIcons,
  roomsDummyData,
  roomCommonData,
} from "../assets/assets";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { SiStarlingbank } from "react-icons/si";
import { FaLocationPin } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // Check if check-out is after check-in
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date");
      return;
    }

    // Check if dates are not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check-in date cannot be in the past");
      return;
    }

    // Simulate availability check
    const isAvailable = Math.random() > 0.3; // 70% chance of availability

    if (isAvailable) {
      setAvailabilityStatus("available");
      setShowBookingForm(true);
    } else {
      setAvailabilityStatus("unavailable");
      setTimeout(() => {
        setAvailabilityStatus(null);
      }, 3000);
    }
  };

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        room,
        checkIn,
        checkOut,
        guests,
        totalPrice: room.pricePerNight,
      },
    });
  };

  if (!room) {
    return <p className="text-center mt-8">Loading room details...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with QuickStay branding and booking form */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"></div>

          {/* Availability Status Message */}
          {availabilityStatus && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                availabilityStatus === "available"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {availabilityStatus === "available"
                ? "✅ Great! This room is available for your selected dates."
                : "❌ Sorry, this room is not available for the selected dates. Please try different dates."}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Using your preferred structure */}
      <div className="flex flex-col gap-2 p-6 max-w-7xl mx-auto pt-8">
        <div className="flex flex-col gap-2 mb-5">
          <div className="mb-2 flex gap-3 items-center">
            <h1 className="text-3xl font-medium">{room.hotel.name}</h1>
            <span className="font-medium text-sm">({room.roomType})</span>
            <span className="bg-orange-500 px-2 py-1 text-white text-sm font-light rounded-full">
              20% offer
            </span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex justify-between gap-1">
              <BsStarFill style={{ color: "orange" }} />
              <BsStarFill style={{ color: "orange" }} />
              <BsStarFill style={{ color: "orange" }} />
              <BsStarFill style={{ color: "orange" }} />
            </div>
            <span className="font-semibold text-sm">200+ reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <IoLocation className="text-gray-400" style={{ color: "gray" }} />
            <p>{room.hotel.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <img
              src={mainImage}
              alt=""
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {room.images.length > 1 &&
              room.images.map((image, index) => (
                <div key={index}>
                  <img
                    onClick={() => setMainImage(image)}
                    src={image}
                    alt=""
                    className={`w-full rounded-lg shadow-lg cursor-pointer ${
                      mainImage === image && "outline-3 outline-orange-500"
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap gap-3 mt-3">
              {room.amenities.map((amenitie, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-2 rounded-md"
                >
                  <img
                    src={facilityIcons[amenitie]}
                    alt={amenitie}
                    className="w-4 h-4"
                  />
                  {amenitie}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-2xl">${room.pricePerNight} /night</p>
          </div>
        </div>

        {/* Additional sections from the enhanced design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Features */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomCommonData.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-6 h-6 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Description */}
            <div className="border-t border-b pb-6 border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                About this place
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                Guests will be allocated on the ground floor according to
                availability. You get a comfortable Two bedroom apartment has a
                true city feeling. The price quoted is for two guest, at the
                guest slot please mark the number of guests to get the exact
                price for groups. The Guests will be allocated ground floor
                according to availability. You get the comfortable two bedroom
                apartment that has a true city feeling.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500 w-4 h-4" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                  placeholder="Check-In"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500 w-4 h-4" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                  placeholder="Check-Out"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500 w-4 h-4" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value={1}>1 guest</option>
                  <option value={2}>2 guests</option>
                  <option value={3}>3 guests</option>
                  <option value={4}>4 guests</option>
                </select>
              </div>
              <button
                onClick={handleCheckAvailability}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto ${
                  availabilityStatus === "available"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : availabilityStatus === "unavailable"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {availabilityStatus === "available"
                  ? "Available - Book Now"
                  : availabilityStatus === "unavailable"
                  ? "Not Available"
                  : "Check Availability"}
              </button>
            </div>
            {/* Location Map */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Where you'll be
              </h2>
              <div className="bg-gray-100 rounded-lg h-48 sm:h-64 flex items-center justify-center relative">
                <div className="text-center">
                  <MdLocationOn className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Interactive Map</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Los Angeles, California, USA
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                  Exact location provided after booking
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                It's like a home away from home.
              </p>
            </div>

            {/* Host Information */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Hosted by Emma Rodriguez
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100"
                  alt="Emma Rodriguez"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                    <BsStarHalf className="text-yellow-400 w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-600">200+ reviews</p>
                  <p className="text-sm text-gray-600">Response rate: 100%</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Contact Now
              </button>
            </div>
          </div>

          {/* Sidebar with other accommodations */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600 w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium">50%</span>
                </div>
                <button className="text-blue-600 text-xs font-medium">
                  Share
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Other accommodations
                </h3>

                {/* Velvet Nights Inn */}
                <div className="border border-gray-200 rounded-lg p-2">
                  <img
                    src={room.images[0]}
                    alt="Velvet Nights Inn"
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-medium text-xs">Velvet Nights Inn</h4>
                  <p className="text-xs text-gray-600">
                    Beachfront Drive, CA, USA
                  </p>
                  <div className="flex items-center gap-1 my-1">
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarHalf className="text-yellow-400 w-2 h-2" />
                    <span className="text-xs text-gray-600 ml-1">
                      200+ reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <img
                      src={facilityIcons["Free WiFi"]}
                      alt="wifi"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Free Breakfast"]}
                      alt="breakfast"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Room Service"]}
                      alt="service"
                      className="w-2 h-2"
                    />
                  </div>
                  <p className="font-semibold text-xs">$120 /day</p>
                </div>

                {/* Crystal Waters Resort */}
                <div className="border border-gray-200 rounded-lg p-2">
                  <img
                    src={room.images[1]}
                    alt="Crystal Waters Resort"
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-medium text-xs">Crystal Waters Resort</h4>
                  <p className="text-xs text-gray-600">
                    Night Sky Parkway, AZ, USA
                  </p>
                  <div className="flex items-center gap-1 my-1">
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarHalf className="text-yellow-400 w-2 h-2" />
                    <span className="text-xs text-gray-600 ml-1">
                      200+ reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <img
                      src={facilityIcons["Free WiFi"]}
                      alt="wifi"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Free Breakfast"]}
                      alt="breakfast"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Room Service"]}
                      alt="service"
                      className="w-2 h-2"
                    />
                  </div>
                  <p className="font-semibold text-xs">$200 /day</p>
                </div>

                {/* Skyline Luxe Hotel */}
                <div className="border border-gray-200 rounded-lg p-2">
                  <img
                    src={room.images[2]}
                    alt="Skyline Luxe Hotel"
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-medium text-xs">Skyline Luxe Hotel</h4>
                  <p className="text-xs text-gray-600">
                    Metro Avenue, Chicago, USA
                  </p>
                  <div className="flex items-center gap-1 my-1">
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarFill className="text-yellow-400 w-2 h-2" />
                    <BsStarHalf className="text-yellow-400 w-2 h-2" />
                    <span className="text-xs text-gray-600 ml-1">
                      200+ reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <img
                      src={facilityIcons["Free WiFi"]}
                      alt="wifi"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Free Breakfast"]}
                      alt="breakfast"
                      className="w-2 h-2"
                    />
                    <img
                      src={facilityIcons["Room Service"]}
                      alt="service"
                      className="w-2 h-2"
                    />
                  </div>
                  <p className="font-semibold text-xs">$250 /day</p>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors">
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">
                Confirm Your Booking
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span className="font-medium">{room.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${room.pricePerNight}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookNow}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
