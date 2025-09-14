import image1 from '../assets/luxury-hotel-lobby-modern.png'
import image2 from '../assets/luxury-hotel-lobby-with-elegant-interior-design.jpg'
export default function About() {
  const stats = [
    { number: "10,000+", label: "Happy Guests", description: "Travelers who've experienced luxury with us" },
    { number: "500+", label: "Curated Properties", description: "Handpicked accommodations worldwide" },
    { number: "50+", label: "Countries", description: "Destinations across the globe" },
    { number: "98%", label: "Satisfaction Rate", description: "Guest satisfaction and return bookings" },
  ]

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "/professional-woman-ceo.png",
      bio: "Former luxury hotel executive with 15+ years in hospitality",
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Curation",
      image: "/professional-man-travel-expert-headshot.jpg",
      bio: "Travel expert who has personally visited over 80 countries",
    },
    {
      name: "Elena Kowalski",
      role: "Guest Experience Director",
      image: "/professional-woman-hospitality-director.jpg",
      bio: "Hospitality specialist ensuring every guest experience is perfect",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div
        className="pt-20 pb-8 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 gap-6 sm:gap-8 text-white bg-cover bg-center min-h-[70vh] sm:min-h-[60vh]"
        style={{ backgroundImage: `url(/placeholder.svg?height=600&width=1200&query=luxury hotel exterior at sunset)` }}
      >
        <div className="bg-black/40 rounded-2xl p-6 sm:p-8 max-w-4xl">
          <p className="bg-[#49B9FF]/80 rounded-full py-2 px-4 text-sm font-medium mb-4 w-fit">About QuickStay</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">Crafting Extraordinary Travel Experiences</h1>
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            Discover the story behind the world's most trusted luxury accommodation platform, where every journey
            becomes an unforgettable adventure.
          </p>
        </div>
      </div>

      {/* About Story Section */}
      <div className="flex flex-col px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="bg-[#49B9FF]/10 rounded-full py-2 px-4 w-fit">
              <span className="text-[#49B9FF] font-medium text-sm">Our Story</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Redefining Luxury Travel Since 2018</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              QuickStay was born from a simple belief: that extraordinary travel experiences should be accessible to
              discerning travelers worldwide. What started as a passion project has evolved into a curated platform
              connecting guests with the world's most exceptional accommodations.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              From boutique hotels in bustling cities to private villas on secluded islands, we handpick each property
              to ensure it meets our exacting standards for luxury, service, and authenticity. Our team of travel
              experts personally visits and vets every location, ensuring that your stay exceeds expectations.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1333257934/photo/3d-render-of-a-hotel-waiting-lounge-with-sofa-and-armchair.jpg?s=612x612&w=0&k=20&c=_eaLqdLzuDE8-921VGZY6oujnev5NNieNMiH0mlPo8g="
              alt="Luxury hotel lobby"
              className="rounded-2xl shadow-lg w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-[#49B9FF] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-sm sm:text-lg">
                  7+
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Years of Excellence</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Serving luxury travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
              We're committed to creating unforgettable experiences that connect travelers with extraordinary places and
              cultures around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="bg-[#49B9FF]/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#49B9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Curated Excellence</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Every property is personally vetted by our travel experts to ensure exceptional quality and unique
                experiences.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="bg-[#49B9FF]/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#49B9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Personalized Service</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our dedicated concierge team provides 24/7 support to ensure your journey is seamless from start to
                finish.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="bg-[#49B9FF]/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#49B9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Global Reach</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Access to exclusive properties in over 50 countries, from bustling metropolises to hidden paradise
                destinations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
              These numbers represent more than statistics—they reflect the trust our guests place in us and the
              exceptional experiences we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-[#49B9FF] to-[#2563eb] text-white rounded-2xl p-6 sm:p-8 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-blue-100 font-medium text-sm sm:text-base">{stat.label}</p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
              Our passionate team of travel experts and hospitality professionals work tirelessly to curate
              extraordinary experiences for our guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 sm:h-56 lg:h-64 object-cover" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#49B9FF] font-medium mb-3 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
