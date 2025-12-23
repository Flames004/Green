import React from 'react'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'

const Contact = () => {
  return (
    <div className='min-h-screen px-5 lg:px-10 bg-gray-200/20'>
      <div className='text-center pt-10 lg:pt-20'>
        <h1 className='text-2xl md:text-5xl font-semibold'>Get in Touch</h1>
        <p className='p mt-2 text-sm md:text-lg'>Have a question about our plants or need care advice?
            <br /> We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[60%_30%] gap-10 mt-10 pb-10'>
        <ContactForm/>
        <ContactInfo/>
      </div>
    </div>
  )
}

export default Contact
