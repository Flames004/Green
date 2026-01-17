import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);


  const fetchAddresses = async () => {
    try {
      const data = await API.get("/address/get-addrs");
      
      setAddresses(data.data.data);

    } catch (error) {
      toast.error("Failed to fetch addresses");
      console.log(error);
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      await API.patch(`/address/update-default/${id}`, { isDefault: true });
      toast.success("Default address updated");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to set default address");
      console.log(error);
      
    }
  };

  const deleteAddress = async (id) => {
    try {
      
      await API.delete(`/address/remove-addr/${id}`);
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
      console.log(error);
      
    }
  };


  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Saved Addresses
        </h2>

        <button
          onClick={() => {
            setEditMode(false);
            setCurrentAddress(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            className="border rounded-xl p-4 bg-white shadow-sm relative"
            key={addr._id}
          >
            <div className="absolute top-3 right-3">
              <input
                type="radio"
                name="defaultAddress"
                checked={addr.isDefault}
                onChange={() => setDefaultAddress(addr._id)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>

            <h3 className="font-semibold text-gray-900">
              {addr.fullName}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {addr.phone}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              {addr.address}, {addr.city}, <br />
              {addr.state} – {addr.pinCode}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => {
                  setCurrentAddress(addr);
                  setEditMode(true);
                  setOpen(true);
                }}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                <Edit2 size={14} />
                Edit
              </button>

              <button
                onClick={() => deleteAddress(addr._id)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <AddressModal
          editMode={editMode}
          onClose={() => setOpen(false)}
          addressData={currentAddress}
          refreshList={fetchAddresses}
        />
      )}
    </div>
  );
};

const AddressModal = ({ editMode, onClose, addressData, refreshList }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  useEffect(() => {
    if (editMode && addressData) {
      setFormData({
        fullName: addressData.fullName || "",
        phone: addressData.phone || "",
        address: addressData.address || "",
        city: addressData.city || "",
        state: addressData.state || "",
        pinCode: addressData.pinCode || "",
        country: addressData.country || "",
      });
    }
  }, [editMode, addressData]);


  const submitHandler = async () => {
    try {
      if (editMode) {
        
        await API.patch(`/address/update-addr/${addressData._id}`, formData);

        toast.success("Address updated successfully");
      } else {
        await API.post("/address/add-addr", formData);

        toast.success("Address saved successfully");
      }

      refreshList();
      onClose();
    } catch (error) {
      toast.error("Failed to save address");
    }
  };



  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {editMode ? "Edit Address" : "Add New Address"}
        </h3>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["fullName", "Full Name"],
            ["phone", "Phone Number"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["pinCode", "Pincode"],
            ["country", "Country"],
          ].map(([key, placeholder]) => (
            <input
              key={key}
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              className={`outline-none border border-gray-300 rounded-lg px-3 py-2 ${
                key === "address" ? "sm:col-span-2" : ""
              }`}
              placeholder={placeholder}
            />
          ))}
        </form>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={submitHandler}
            className="px-5 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {editMode ? "Update Address" : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
