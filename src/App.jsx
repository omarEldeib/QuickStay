import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Hotels from './pages/Hotels'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import RoomDetails from './pages/RoomDetails'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Transportation from './pages/Transportation'

function App() {
  return (
    <AppProvider>
      <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path='/rooms/:id' element={<RoomDetails/>}/>
              <Route path="/booking" element={<Booking />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/transportation" element={<Transportation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
      </Router>
    </AppProvider>
  )
}

export default App