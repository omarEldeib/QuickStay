import React, { useState } from "react";
import { roomsDummyData, facilityIcons } from "../assets/assets";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Location from "../assets/locationIcon.svg";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";

const Hotels = () => {
  const navigate = useNavigate();

  // ✅ Store filters in state
  const [filters, setFilters] = useState({
    popular: [],
    price: [],
    sort: "",
  });

  // ✅ Filter logic
  const filteredRooms = roomsDummyData
    .filter((room) => {
      // Popular filters
      if (filters.popular.length > 0) {
        return filters.popular.every((filter) =>
          room.amenities.includes(filter)
        );
      }
      return true;
    })
    .filter((room) => {
      // Price filters
      if (filters.price.length > 0) {
        return filters.price.some((range) => {
          if (range === "low") return room.pricePerNight <= 50;
          if (range === "mid")
            return room.pricePerNight > 50 && room.pricePerNight <= 100;
          if (range === "high")
            return room.pricePerNight > 100 && room.pricePerNight <= 200;
          if (range === "premium") return room.pricePerNight > 200;
          return true;
        });
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (filters.sort === "low-high")
        return a.pricePerNight - b.pricePerNight;
      if (filters.sort === "high-low")
        return b.pricePerNight - a.pricePerNight;
      return 0; // no sort
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
      {/* Rooms List */}
      <div className="order-2 lg:order-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Hotel Rooms</h1>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>

        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, id) => (
            <div
              key={id}
              className={`flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6 py-6 sm:py-8 ${
                id !== filteredRooms.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <img
                src={room.images[0]}
                alt={room.hotel.name}
                className="rounded-2xl w-full sm:w-80 lg:w-96 h-48 sm:h-56 lg:h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate(`/rooms/${room._id}`)}
              />
              <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 flex-1">
                <span className="text-gray-600 text-sm sm:text-base">
                  {room.hotel.city}
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{room.hotel.name}</h2>

                {/* Rating */}
                <div className="flex justify-start items-center gap-3">
                  <div className="flex items-center gap-1">
                    <BsStarFill className="text-yellow-400 w-4 h-4" />
                    <BsStarFill className="text-yellow-400 w-4 h-4" />
                    <BsStarFill className="text-yellow-400 w-4 h-4" />
                    <BsStarFill className="text-yellow-400 w-4 h-4" />
                    <BsStarHalf className="text-yellow-400 w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-500">200+ reviews</span>
                </div>

                {/* Address */}
                <div className="flex justify-start items-center gap-2 text-gray-600">
                  <img src={Location} alt="Location" className="w-4 h-4" />
                  <span className="text-sm">{room.hotel.address}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {room.amenities.map((amenitie, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
                    >
                      <img
                        src={facilityIcons[amenitie]}
                        alt={amenitie}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      {amenitie}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between w-full mt-2">
                  <span className="text-lg sm:text-xl text-gray-700 font-semibold">
                    ${room.pricePerNight} /night
                  </span>
                  <button
                    onClick={() => navigate(`/rooms/${room._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rooms match your filters.</p>
            <button
              onClick={() => setFilters({ popular: [], price: [], sort: "" })}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="order-1 lg:order-2">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default Hotels;
