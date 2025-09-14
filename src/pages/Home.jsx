import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Exclusive from '../components/Exclusive'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
    <>
        <Hero />
        <Features/>
        <Exclusive/>
        <Testimonials/>
        <NewsLetter/>
    </>
  )
}

export default Home