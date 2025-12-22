import React from 'react'
import { CategoryCard } from './CategoryCard'

const categories = [
    {
        category: "Indoor Plants",
        subtitle:"Perfect for your home",
        image:"/indoor_plants.jpg"
    },
    {
        category: "Outdoor Plants",
        subtitle:"Garden Favourites",
        image:"/outdoor.jpg"
    },
    {
        category: "Succulents",
        subtitle:"Low maintence beauty",
        image:"/plant_pot.jpg"
    },
    {
        category: "Ceramic Pots",
        subtitle:"HandCrafted Elegance",
        image:"/pots_collection.jpg"
    }
]

const CategorySection = () => {
  return (
    <div className='mx-10 bg-gray-100  rounded-lg px-15'>
        <div className='text-center pt-10'>
            <h1 className='md:text-4xl font-medium text-2xl'>Shop By Category</h1>
            <p className='my-4 text-sm md:text-lg '>Find exactly what you're looking for</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10'>
        {categories.map((category, index) => (
            <CategoryCard category={category} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default CategorySection
