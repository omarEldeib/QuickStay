import React from "react";
import { BsStarFill } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";

const HotelCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <Link to={"/rooms" + room._id} onClick={() => scrollTo(0, 0)}>
      <div className="relative rounded-2xl w-[300px] shadow-md overflow-hidden flex flex-col gap-3 bg-white">
        {/* Image */}
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="h-48 w-full object-cover"
          onClick={(e) => {
            e.preventDefault(); // prevent <Link> from double triggering
            navigate(`/rooms/${room._id}`);
            scrollTo(0, 0);
          }}
        />
        {/* Best Seller Badge */}
        {(room._id || "").slice(-1) % 2 === 0 && (
          <span className="bg-white shadow-md rounded-full px-3 py-1 font-bold text-xs text-gray-800 absolute top-3 left-3">
            Best Seller
          </span>
        )}
        {/* Hotel Name + Rating */}
        <div className="flex justify-between items-center px-3">
          <h3 className="font-semibold text-lg">{room.hotel.name}</h3>
          <div className="flex items-center gap-1">
            <BsStarFill className="text-orange-400" />
            <span className="text-gray-500 text-sm">4.5</span>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-center gap-1 text-sm text-gray-500 px-3">
          <IoLocation className="text-gray-400" />
          <span className="truncate">{room.hotel.address}</span>
        </div>
        {/* Price + Button */}
        <div className="flex justify-between items-center mt-2 px-3 pb-3">
          <span className="font-bold text-lg">
            ${room.pricePerNight}
            <span className="text-gray-500 text-sm"> /night</span>
          </span>
          <button className="text-gray-600 px-3 font-semibold hover:bg-blue-600 border py-2 rounded-md text-sm">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
