import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
       
        <div className="overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

       
       <div className="flex justify-between items-center mt-2">
            <div className="p-4">
                <h3 className=" text-md lg:text-lg font-medium">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <span className="font-semibold text-lg">₹{product.price}</span>
            </div>
            <div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-full mr-4 text-sm hover:bg-emerald-700 transition">Add to Cart</button>
            </div>
       </div>
      </div>
    </>
  );
};

export default ProductCard;
