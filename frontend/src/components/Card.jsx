import React from "react";

const Card = ({ title, icon, quantity }) => {
  return (
    <div className="bg-white rounded-xl  border border-gray-300 p-6 flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-700 font-medium">{title}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{quantity}</h1>
      </div>

      <div className="p-3 rounded-xl bg-emerald-700 text-white">
        {icon}
      </div>

    </div>
  );
};

export default Card;
