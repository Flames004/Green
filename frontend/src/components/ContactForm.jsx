import React, { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const ContactForm = () => {


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
  const serviceID = import.meta.env.VITE_APP_SERVICE_ID;
  const templateID = import.meta.env.VITE_APP_TEMPLATE_ID;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/contact/add", formData);
    
      if (res.status === 201) {
       toast.success("Message sent successfully");
      }

      const templateParams = {
        name: formData.firstname + " " + formData.lastname,
        email: formData.email,
        message: formData.subject
      };

      await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: ""
    });


    } catch (error) {
      console.error("Error submitting contact form:", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className=" bg-white rounded-xl p-5 lg:p-8 shadow-2xl">
      <h1 className="text-md font-medium">Send us a message</h1>
      <p className="p text-sm">
        Fill out the form below and we'll respond within 24 hours.
      </p>

      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-10 mt-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstname">First Name</label>
            <input
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700"
              type="text"
              placeholder="Parshant"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastname">Last Name</label>
            <input
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700"
              type="text"
              placeholder="saini"
            />
          </div>
        </div>
        <div className="flex-col flex mt-4">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700"
            type="email"
            placeholder="saini@gmail.com"
          />
        </div>
        <div className="flex-col flex mt-4">
          <label htmlFor="subject">Subject</label>
          <input
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}  
            className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700"
            type="text"
            placeholder="How we can help you?"
          />
        </div>
        <div className="flex-col flex mt-4">
          <label htmlFor="message">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm text-gray-700"
            placeholder="Tell us more about your inquiry"
            rows={5}
            cols={30}
          />
        </div>
        <button type="submit" className="btn-secondary w-full mt-4">
         {loading ? "Sending..." : "Send Message"}
          </button>
      </form>
    </div>
  );
};

export default ContactForm;
