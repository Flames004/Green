import React from 'react'

const ReviewCard = ({name, time, review}) => {
  return (
    <div className='mb-5 flex flex-col gap-1'>
      <h1 className='text-md font-semibold'>{name}</h1>
      <p className='p text-sm'>{time}</p>
      <p className='p italic'>{review}</p>
    </div>
  )
}

export default ReviewCard
