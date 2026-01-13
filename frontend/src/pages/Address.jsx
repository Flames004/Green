import { Plus, Edit2, Trash2, CheckCircle, ShieldCheck, Home } from "lucide-react";
import React from "react";

const AddressPage = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen pb-24">

      <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-gray-200 mb-4">
        <Home className="text-emerald-800" size={22} />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Address
        </h1>
        <ShieldCheck className="text-blue-800" size={22} />
      </div>

      <div className="flex justify-end px-4 sm:px-6 mb-4">
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700">
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-6">

        <div className="border rounded-xl p-4 bg-white shadow-sm relative">
          <div className="absolute top-3 right-3">
            <input
              type="radio"
              name="defaultAddress"
              checked
              className="w-4 h-4 accent-emerald-600 cursor-pointer"
            />
          </div>

          <h2 className="font-semibold text-gray-900">Rahul Sharma</h2>
          <p className="text-sm text-gray-600 mt-1">9876543210</p>

          <p className="text-sm text-gray-700 mt-2">
            Sector 21, Near Metro Station<br />
            Noida, Uttar Pradesh – 201301
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <Edit2 size={14} />
              Edit
            </button>

            <button className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm relative">
          <div className="absolute top-3 right-3">
            <input
              type="radio"
              name="defaultAddress"
              className="w-4 h-4 accent-emerald-600 cursor-pointer"
            />
          </div>

          <h2 className="font-semibold text-gray-900">Rahul Sharma</h2>
          <p className="text-sm text-gray-600 mt-1">9876543210</p>

          <p className="text-sm text-gray-700 mt-2">
            2nd Floor, Green Park<br />
            Delhi – 110016
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <Edit2 size={14} />
              Edit
            </button>

            <button className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white shadow-md">
        <button className="bg-emerald-600 text-white w-full py-3 rounded-lg text-sm font-medium hover:bg-emerald-700">
          Continue to Checkout
        </button>
      </div>

    </div>
  );
};

export default AddressPage;
