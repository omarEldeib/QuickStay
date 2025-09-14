import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const NewsLetter = () => {
  return (
    <div className='py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16'>
        <div className='max-w-4xl rounded-xl py-12 sm:py-16 lg:py-20 mx-auto bg-slate-900 text-white flex flex-col justify-center items-center gap-4 sm:gap-6 px-6 sm:px-8 lg:px-12'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Stay Inspired</h1>
            <p className='text-center max-w-2xl text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed'>
              Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
            </p>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg'>
                <input 
                  type="email" 
                  placeholder='Enter Your Email' 
                  className='w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <button className='w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base sm:text-lg font-semibold rounded-lg transition-colors'>
                    Subscribe 
                    <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5"/>
                </button>
            </div>
            <span className='text-gray-400 text-xs sm:text-sm text-center max-w-md'>
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </span>
        </div>
    </div>
  )
}

export default NewsLetter