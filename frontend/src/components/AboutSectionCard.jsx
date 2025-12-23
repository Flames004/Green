import React from 'react'

const AboutSectionCard = ({data}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='bg-gray-200 rounded-full p-4 text-emerald-800 font-bold'>
        {data.icon}
      </div>
      <h1 className='text-lg font-semibold'>
        {data.title}
      </h1>
      <p className='text-sm'>
        {data.description}
      </p>
    </div>
  )
}

export default AboutSectionCard
