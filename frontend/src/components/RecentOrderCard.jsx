import React from "react";

const RecentOrderCard = () => {
  return (
    <div className="flex justify-between items-center p-2  border-b border-gray-300 mb-2">
      
      <div className="flex flex-col">
        <span className="font-medium text-gray-700 text-sm">
          #ORD-23901
        </span>

        <span className="text-xs text-gray-400 mt-1">
          21 Jan 2026
        </span>
      </div>

      
      <div className="flex flex-col items-end">
        <span className="font-semibold text-gray-800 text-md">
          ₹1,299
        </span>

        <span className="text-xs font-medium text-green-600 mt-1">
          Delivered
        </span>
      </div>

    </div>
  );
};

export default RecentOrderCard;
