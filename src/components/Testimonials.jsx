import React from "react";
import { testimonials } from "../assets/assets";
import { BsStarFill } from "react-icons/bs";

const Testimonials = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 bg-gray-50">
        <div className="flex flex-col justify-center items-center mb-12 sm:mb-16 max-w-4xl text-center gap-4 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">What Our Guests Say</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-4">
              Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.
            </p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full">
        {testimonials.map((testi, index) => (
          <div key={index} className="flex flex-col justify-center items-start bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={testi.image}
                alt={testi.name}
                className="rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover"
              />
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900">{testi.name}</h3>
            </div>
            <div className="flex items-center gap-1 mb-4 sm:mb-6">
              {Array.from({ length: testi.rating }, (_, i) => (
                <BsStarFill key={i} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
              ))}
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">"{testi.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
