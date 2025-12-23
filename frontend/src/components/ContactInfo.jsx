import { Clock, LocateFixedIcon, Mail, Phone } from "lucide-react";
import React from "react";

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl h-fit">
     
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Contact Information
        </h2>
        <p className="text-sm text-gray-500">
          Reach out to us through any of these channels.
        </p>
      </div>

      
      <div className="flex flex-col gap-5">
       
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 rounded-lg p-2 text-emerald-700">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Phone</h3>
            <a
              href="tel:9089785634"
              className="text-sm text-gray-600 hover:text-emerald-600 transition"
            >
              +91 90897 85634
            </a>
          </div>
        </div>

        
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 rounded-lg p-2 text-emerald-700">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Email</h3>
            <a
              href="mailto:saini123@gmail.com"
              className="text-sm text-gray-600 hover:text-emerald-600 transition"
            >
              saini123@gmail.com
            </a>
          </div>
        </div>

        
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 rounded-lg p-2 text-emerald-700">
            <LocateFixedIcon size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Location</h3>
            <p className="text-sm text-gray-600">
              Ambala Road, Saharanpur, 247001
            </p>
          </div>
        </div>

        
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 rounded-lg p-2 text-emerald-700">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Business Hours
            </h3>
            <p className="text-sm text-gray-600">
              Monday – Friday: 9:00 AM – 6:00 PM
            </p>
            <p className="text-sm text-gray-600">
              Saturday: 10:00 AM – 5:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
