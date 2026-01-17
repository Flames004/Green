import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Edit2, Save } from "lucide-react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const Profile = ({user}) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    gender:""
  });

  useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      gender: user.gender || "",
    });
  }
}, [user]);


  const submitButtonHandler = () =>{
    if(edit){
      saveChanges();
    }
    else{
      setEdit(true);
    }
  }

  const saveChanges = async () => {
    try {
      setLoading(true);

      await API.patch("/user/update-profile", formData);
      toast.success("Profile Updated Successfully");
      setEdit(false);

    } catch (error) {
      toast.error(error.response?.data?.message, "Failed to update profile");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Your Profile
        </h2>
        

        <button
          onClick={submitButtonHandler}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          {edit ? <Save size={16} /> : <Edit2 size={16} />}
          {loading ? "Saving..." : edit ? "Save" : "Edit"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
          <p className="text-sm italic text-gray-600">Update Your Basic Account Details</p>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              disabled={!edit}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              value={formData.name}
              placeholder="Username"
              className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none
                ${edit ? "border bg-white" : "bg-gray-100 border-none"}
              `}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                disabled={!edit}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                value={formData.email}
                placeholder="Guest007@gmail.com"
                className={`w-full mt-1 pl-9 pr-3 py-2 rounded-lg text-sm outline-none
                  ${edit ? "border bg-white" : "bg-gray-100 border-none"}
                `}
                
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                disabled
                defaultValue={user.phone}
                className="w-full mt-1 pl-9 pr-3 py-2 rounded-lg text-sm bg-gray-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <div className="flex gap-4 mt-2">
              {["Male", "Female", "Other"].map(g => (
                <label
                  key={g}
                  className={`flex items-center gap-2 text-sm
                    ${edit ? "cursor-pointer" : "opacity-60"}
                  `}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    disabled={!edit}
                    className="accent-emerald-600"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

        </form>

      </div>

    </div>
  );
};

export default Profile;
