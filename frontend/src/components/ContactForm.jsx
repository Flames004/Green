import React from 'react'

const ContactForm = () => {
  return (
    <div className=' bg-white rounded-xl p-5 lg:p-8 shadow-2xl'>
        <h1 className='text-md font-medium'>Send us a message</h1>
        <p className='p text-sm'>Fill out the form below and we'll respond within 24 hours.</p>

        <form >
            <div className='flex items-center gap-10 mt-4'>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="firstname">First Name</label>
                    <input 
                    className='w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700'
                    type="text" 
                    placeholder='Parshant' />
                </div>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                    className='w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700'
                    type="text" placeholder='saini' />
                </div>
            </div>
            <div className='flex-col flex mt-4'>
                    <label htmlFor="email">Email</label>
                    <input 
                    className='w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700'
                    type="email" placeholder='saini@gmail.com' />
            </div>
            <div className='flex-col flex mt-4'>
                    <label htmlFor="subject">Subject</label>
                    <input 
                    className='w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700'
                    type="text" placeholder='How we can help you?' />
            </div>
            <div className='flex-col flex mt-4'>
                    <label htmlFor="message">Message</label>
                    <textarea className='w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700'
                    placeholder='Tell us more about your inquiry' />
            </div>
            <button className='btn-secondary w-full mt-4'>
                Submit
            </button>
        </form>
    </div>
  )
}

export default ContactForm
