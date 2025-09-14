import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { roomsDummyData, userBookingsDummyData, hotelDummyData } from '../assets/assets';

const AppContext = createContext();

const initialState = {
  rooms: roomsDummyData,
  bookings: userBookingsDummyData,
  hotel: hotelDummyData,
  transportation: {
    flights: [
      {
        id: 'FL001',
        type: 'flight',
        airline: 'Masar Airlines',
        flightNumber: 'MA123',
        from: 'New York',
        to: 'London',
        departure: '08:30',
        arrival: '20:45',
        duration: '7h 15m',
        price: 850,
        class: 'Economy',
        stops: 'Direct',
        amenities: ['wifi', 'meals', 'entertainment'],
        aircraft: 'Boeing 777',
        gate: 'A12',
        terminal: 'Terminal 1'
      },
      {
        id: 'FL002',
        type: 'flight',
        airline: 'Sky High Airlines',
        flightNumber: 'SH456',
        from: 'New York',
        to: 'London',
        departure: '14:20',
        arrival: '02:35+1',
        duration: '7h 15m',
        price: 920,
        class: 'Business',
        stops: 'Direct',
        amenities: ['wifi', 'meals', 'entertainment', 'priority'],
        aircraft: 'Airbus A350',
        gate: 'B8',
        terminal: 'Terminal 2'
      },
      {
        id: 'FL003',
        type: 'flight',
        airline: 'Global Wings',
        flightNumber: 'GW789',
        from: 'New York',
        to: 'Paris',
        departure: '22:15',
        arrival: '10:30+1',
        duration: '8h 15m',
        price: 780,
        class: 'Economy',
        stops: 'Direct',
        amenities: ['wifi', 'meals'],
        aircraft: 'Boeing 737',
        gate: 'C15',
        terminal: 'Terminal 1'
      },
      {
        id: 'FL004',
        type: 'flight',
        airline: 'Masar Airlines',
        flightNumber: 'MA456',
        from: 'London',
        to: 'Dubai',
        departure: '10:00',
        arrival: '19:30',
        duration: '6h 30m',
        price: 650,
        class: 'Economy',
        stops: 'Direct',
        amenities: ['wifi', 'meals', 'entertainment'],
        aircraft: 'Boeing 787',
        gate: 'D5',
        terminal: 'Terminal 3'
      },
      {
        id: 'FL005',
        type: 'flight',
        airline: 'Sky High Airlines',
        flightNumber: 'SH789',
        from: 'Dubai',
        to: 'Tokyo',
        departure: '01:30',
        arrival: '15:45',
        duration: '9h 15m',
        price: 1200,
        class: 'Business',
        stops: 'Direct',
        amenities: ['wifi', 'meals', 'entertainment', 'priority'],
        aircraft: 'Airbus A380',
        gate: 'E12',
        terminal: 'Terminal 1'
      }
    ],
    buses: [
      {
        id: 'BU001',
        type: 'bus',
        company: 'Masar Bus Lines',
        route: 'New York to Boston',
        from: 'New York',
        to: 'Boston',
        departure: '09:00',
        arrival: '13:30',
        duration: '4h 30m',
        price: 45,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'air_conditioning'],
        busNumber: 'MB-1234',
        platform: 'Platform 3'
      },
      {
        id: 'BU002',
        type: 'bus',
        company: 'Express Transit',
        route: 'New York to Boston',
        from: 'New York',
        to: 'Boston',
        departure: '15:30',
        arrival: '20:00',
        duration: '4h 30m',
        price: 55,
        class: 'Premium',
        amenities: ['wifi', 'restroom', 'air_conditioning', 'snacks'],
        busNumber: 'ET-5678',
        platform: 'Platform 1'
      },
      {
        id: 'BU003',
        type: 'bus',
        company: 'City Connect',
        route: 'Boston to Washington DC',
        from: 'Boston',
        to: 'Washington DC',
        departure: '08:00',
        arrival: '14:30',
        duration: '6h 30m',
        price: 65,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'air_conditioning'],
        busNumber: 'CC-9012',
        platform: 'Platform 2'
      },
      {
        id: 'BU004',
        type: 'bus',
        company: 'Masar Bus Lines',
        route: 'Los Angeles to San Francisco',
        from: 'Los Angeles',
        to: 'San Francisco',
        departure: '07:30',
        arrival: '12:00',
        duration: '4h 30m',
        price: 40,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'air_conditioning'],
        busNumber: 'MB-3456',
        platform: 'Platform 4'
      }
    ],
    trains: [
      {
        id: 'TR001',
        type: 'train',
        company: 'Masar Rail',
        route: 'New York to Washington DC',
        from: 'New York',
        to: 'Washington DC',
        departure: '07:15',
        arrival: '11:45',
        duration: '4h 30m',
        price: 120,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'dining_car', 'power_outlets'],
        trainNumber: 'MR-1001',
        platform: 'Platform 2'
      },
      {
        id: 'TR002',
        type: 'train',
        company: 'Express Rail',
        route: 'New York to Washington DC',
        from: 'New York',
        to: 'Washington DC',
        departure: '13:45',
        arrival: '18:15',
        duration: '4h 30m',
        price: 150,
        class: 'First Class',
        amenities: ['wifi', 'restroom', 'dining_car', 'power_outlets', 'priority'],
        trainNumber: 'ER-2002',
        platform: 'Platform 4'
      },
      {
        id: 'TR003',
        type: 'train',
        company: 'Masar Rail',
        route: 'London to Paris',
        from: 'London',
        to: 'Paris',
        departure: '09:30',
        arrival: '12:45',
        duration: '3h 15m',
        price: 180,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'dining_car', 'power_outlets'],
        trainNumber: 'MR-3003',
        platform: 'Platform 1'
      },
      {
        id: 'TR004',
        type: 'train',
        company: 'High Speed Rail',
        route: 'Tokyo to Osaka',
        from: 'Tokyo',
        to: 'Osaka',
        departure: '08:00',
        arrival: '10:30',
        duration: '2h 30m',
        price: 95,
        class: 'Standard',
        amenities: ['wifi', 'restroom', 'dining_car', 'power_outlets'],
        trainNumber: 'HSR-4004',
        platform: 'Platform 5'
      }
    ]
  },
  transportBookings: [],
  user: {
    _id: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    username: "Great Stack",
    email: "user.greatstack@gmail.com",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    role: "hotelOwner",
    createdAt: "2025-03-25T09:29:16.367Z",
    updatedAt: "2025-04-10T06:34:48.719Z",
    __v: 1,
    recentSearchedCities: ["New York"]
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    
    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: state.rooms.map(room => 
          room._id === action.payload._id ? action.payload : room
        )
      };
    
    case 'DELETE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload)
      };
    
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking => 
          booking._id === action.payload._id ? action.payload : booking
        )
      };
    
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.payload)
      };
    
    case 'UPDATE_HOTEL':
      return {
        ...state,
        hotel: { ...state.hotel, ...action.payload }
      };
    
    case 'ADD_TRANSPORT_BOOKING':
      return {
        ...state,
        transportBookings: [...state.transportBookings, action.payload]
      };
    
    case 'UPDATE_TRANSPORT_BOOKING':
      return {
        ...state,
        transportBookings: state.transportBookings.map(booking => 
          booking._id === action.payload._id ? action.payload : booking
        )
      };
    
    case 'DELETE_TRANSPORT_BOOKING':
      return {
        ...state,
        transportBookings: state.transportBookings.filter(booking => booking._id !== action.payload)
      };
    
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRooms = localStorage.getItem('hotelRooms');
    const savedBookings = localStorage.getItem('hotelBookings');
    const savedHotel = localStorage.getItem('hotelInfo');
    const savedTransportBookings = localStorage.getItem('transportBookings');

    if (savedRooms) {
      dispatch({ type: 'SET_STATE', payload: { rooms: JSON.parse(savedRooms) } });
    }
    if (savedBookings) {
      dispatch({ type: 'SET_STATE', payload: { bookings: JSON.parse(savedBookings) } });
    }
    if (savedHotel) {
      dispatch({ type: 'UPDATE_HOTEL', payload: JSON.parse(savedHotel) });
    }
    if (savedTransportBookings) {
      dispatch({ type: 'SET_STATE', payload: { transportBookings: JSON.parse(savedTransportBookings) } });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('hotelRooms', JSON.stringify(state.rooms));
  }, [state.rooms]);

  useEffect(() => {
    localStorage.setItem('hotelBookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  useEffect(() => {
    localStorage.setItem('hotelInfo', JSON.stringify(state.hotel));
  }, [state.hotel]);

  useEffect(() => {
    localStorage.setItem('transportBookings', JSON.stringify(state.transportBookings));
  }, [state.transportBookings]);

  const addRoom = (roomData) => {
    const newRoom = {
      _id: Date.now().toString(),
      hotel: state.hotel,
      roomType: roomData.roomType,
      pricePerNight: parseInt(roomData.pricePerNight),
      amenities: roomData.amenities,
      images: roomData.images.length > 0 ? roomData.images : [state.rooms[0]?.images[0] || ''],
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };
    dispatch({ type: 'ADD_ROOM', payload: newRoom });
    return newRoom;
  };

  const updateRoom = (roomId, updates) => {
    const updatedRoom = {
      ...state.rooms.find(room => room._id === roomId),
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_ROOM', payload: updatedRoom });
    return updatedRoom;
  };

  const deleteRoom = (roomId) => {
    dispatch({ type: 'DELETE_ROOM', payload: roomId });
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      _id: Date.now().toString(),
      user: state.user,
      room: bookingData.room,
      hotel: state.hotel,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      totalPrice: bookingData.totalPrice,
      guests: bookingData.guests,
      status: 'pending',
      paymentMethod: bookingData.paymentMethod || 'Stripe',
      isPaid: bookingData.isPaid || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };
    dispatch({ type: 'ADD_BOOKING', payload: newBooking });
    return newBooking;
  };

  const updateBooking = (bookingId, updates) => {
    const updatedBooking = {
      ...state.bookings.find(booking => booking._id === bookingId),
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_BOOKING', payload: updatedBooking });
    return updatedBooking;
  };

  const deleteBooking = (bookingId) => {
    dispatch({ type: 'DELETE_BOOKING', payload: bookingId });
  };

  const updateHotel = (updates) => {
    dispatch({ type: 'UPDATE_HOTEL', payload: updates });
  };

  const addTransportBooking = (bookingData) => {
    const newBooking = {
      _id: Date.now().toString(),
      user: state.user,
      transport: bookingData.transport,
      passenger: bookingData.passenger,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      totalPrice: bookingData.transport.price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };
    dispatch({ type: 'ADD_TRANSPORT_BOOKING', payload: newBooking });
    return newBooking;
  };

  const updateTransportBooking = (bookingId, updates) => {
    const updatedBooking = {
      ...state.transportBookings.find(booking => booking._id === bookingId),
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_TRANSPORT_BOOKING', payload: updatedBooking });
    return updatedBooking;
  };

  const deleteTransportBooking = (bookingId) => {
    dispatch({ type: 'DELETE_TRANSPORT_BOOKING', payload: bookingId });
  };

  // Calculate dashboard statistics
  const getDashboardStats = () => {
    const totalBookings = state.bookings.length;
    const totalRevenue = state.bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const totalRooms = state.rooms.length;
    const averageRating = 4.5; // This could be calculated from reviews
    
    // Monthly stats
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyBookings = state.bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
    });
    
    const monthlyRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    
    // Occupancy rate calculation
    const totalRoomNights = state.rooms.length * 30; // Assuming 30 days in month
    const bookedRoomNights = state.bookings.reduce((sum, booking) => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      return sum + nights;
    }, 0);
    
    const occupancyRate = totalRoomNights > 0 ? Math.round((bookedRoomNights / totalRoomNights) * 100) : 0;

    return {
      totalBookings,
      totalRevenue,
      totalRooms,
      averageRating,
      monthlyBookings: monthlyBookings.length,
      monthlyRevenue,
      occupancyRate
    };
  };

  const value = {
    state,
    dispatch,
    addRoom,
    updateRoom,
    deleteRoom,
    addBooking,
    updateBooking,
    deleteBooking,
    updateHotel,
    addTransportBooking,
    updateTransportBooking,
    deleteTransportBooking,
    getDashboardStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
