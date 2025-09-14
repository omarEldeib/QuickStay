import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { exclusiveOffers } from '../assets/assets'

const Exclusive = () => {
  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto py-16 sm:py-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Exclusive Offers</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors self-start lg:self-auto">
          <button className="font-semibold text-sm sm:text-base">View All Offers</button>
          <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {exclusiveOffers.map((offer) => (
          <div 
            key={offer._id}
            className="h-48 sm:h-56 lg:h-64 bg-cover bg-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group"
            style={{ backgroundImage: `url(${offer.image})` }}
          >
            <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-30 rounded-xl transition-all duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{offer.title}</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">{offer.description}</p>
              <span className="text-xs sm:text-sm font-bold bg-white text-black rounded-full py-1 sm:py-2 px-3 sm:px-4 inline-block w-fit">
                {offer.priceOff}% OFF • Ends {offer.expiryDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exclusive
