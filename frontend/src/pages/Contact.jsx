import React from "react";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const Contact = () => {
  return (
    <div className="min-h-screen px-5 lg:px-10 bg-gray-200/20">
      <div className="text-center pt-2 lg:pt-10 ">
        <h1 className="text-xl md:text-5xl font-semibold">Get in Touch</h1>
        <p className="p mt-0 md:mt-2 text-xs md:text-lg">
          Have a question about our plants or need care advice?
          <br /> We'd love to hear from you. Fill out the form below and we'll
          get back to you as soon as possible.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[60%_30%] gap-10 mt-5 md:mt-10 pb-10">
        <ContactForm />
        <ContactInfo />
      </div>

      <div className="bg-emerald-100/20 rounded-xl flex flex-col items-center gap-6 p-6 md:p-12 mt-8 text-center">
        <h2 className="text-2xl md:text-5xl font-semibold text-gray-900">
          Visit Our Store
        </h2>

        <p className="max-w-3xl text-sm md:text-lg text-gray-700 leading-relaxed">
          Come see our plants in person! Our knowledgeable staff is ready to
          help you find the perfect addition to your space.
        </p>

        <div className="w-full max-w-4xl">
          <img
            src="/greenhouse.jpg"
            alt="Greenland plant store greenhouse"
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
