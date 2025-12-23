import {
  Facebook,
  Instagram,
  LocationEdit,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#02352d] text-white">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">GreenLand</h1>
            <p className="text-sm text-gray-200">
              Bringing nature closer to you, one plant at a time.
            </p>
            <div className="flex gap-4 mt-2">
              <Facebook className="hover:text-green-400 cursor-pointer" />
              <Instagram className="hover:text-green-400 cursor-pointer" />
              <Twitter className="hover:text-green-400 cursor-pointer" />
            </div>
          </div>

         
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">Shop</h2>
            <p className="footer-link">Indoor Plants</p>
            <p className="footer-link">Outdoor Plants</p>
            <p className="footer-link">Pots & Planters</p>
            <p className="footer-link">Accessories</p>
          </div>

          
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">Help</h2>
            <p className="footer-link">Plant Care Guide</p>
            <p className="footer-link">Shipping Info</p>
            <p className="footer-link">Returns</p>
            <p className="footer-link">FAQ</p>
          </div>

          
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Contact</h2>

            <div className="flex items-start gap-3">
              <LocationEdit size={18} />
              <p className="text-sm">123 Green Street, Plant City</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <p className="text-sm">9089785634</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <p className="text-sm">contact@greenland.com</p>
            </div>
          </div>

        </div>
      </div>

      
      <div className="border-t border-white/20" />

     
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          
          <p className="text-center md:text-left">
            © 2024 GreenLand. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <p className="footer-link">Privacy Policy</p>
            <p className="footer-link">Terms of Service</p>
            <p className="footer-link">Cookie Policy</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
