import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate() 
  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 xl:px-16 max-w-full mx-auto py-16 sm:py-20 bg-gray-50">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Featured Destinations</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
          Discover our handpicked selection of exceptional properties around the world, 
          offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 xl:gap-10 place-items-center">
        {roomsDummyData.map((room, id) => (
          <HotelCard key={id} room={room} />
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => {navigate('/hotels'); scrollTo(0,0)} } className="font-semibold border-2 border-gray-300 hover:border-gray-600 rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base">
          View All Destinations
        </button>
      </div>
    </div>
  );
};

export default Features;
