import heroImage from '../assets/heroImage.png'
const Hero = () => {
    const cities = ['Dubai' , 'London' , 'New York' , 'Singaphore'];
  return (
    <div
      className="pt-20 pb-8 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 gap-6 sm:gap-8 text-white bg-cover bg-center min-h-[80vh] sm:min-h-[70vh]"
      style={{ backgroundImage: `url(src/assets/heroImage.png)` }}
    >
        <p className='bg-[#49B9FF]/50 rounded-full py-2 px-4 text-sm sm:text-base'>The Ultimate Hotel Experience</p>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight'>Discover Your Perfect Gateway Destination</h1>
        <p className='max-w-2xl font-semibold text-sm sm:text-base md:text-lg leading-relaxed'>Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.</p>

        <form className='bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 w-full max-w-6xl shadow-lg'>
            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-800 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="destinationInput" className="text-sm font-medium">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, index) => (
                        <option value={city} key={index} />
                    ))}
                </datalist>
            </div>

            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-800 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkIn" className="text-sm font-medium">Check in</label>
                </div>
                <input id="checkIn" type="date" className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-800 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkOut" className="text-sm font-medium">Check out</label>
                </div>
                <input id="checkOut" type="date" className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-800 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <label htmlFor="guests" className="text-sm font-medium">Guests</label>
                </div>
                <input min={1} max={4} id="guests" type="number" className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="2" />
            </div>

            <button className='flex items-center justify-center gap-2 rounded-md bg-black py-3 px-6 text-white font-medium hover:bg-gray-800 transition-colors lg:my-auto lg:min-w-[120px]' >
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero
