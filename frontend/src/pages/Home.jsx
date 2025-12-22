import React from 'react'
import { ImagesSlide } from '../components/ImageSlide'
import FeaturedSection from '../components/FeaturedSection'
import CategorySection from '../components/CategorySection'

const Home = () => {
  return (
    <main className='min-h-screen'>
      <ImagesSlide/>
      <FeaturedSection/>
      <CategorySection/>
    </main>
  )
}

export default Home