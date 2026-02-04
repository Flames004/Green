import { useState, useEffect } from "react";
import { User, Lock, Bell, Save } from "lucide-react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/admin/me");
      setProfile(data.data);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChangePassword = async () => {
    if (!password.current || !password.new ) {
      return toast.error("All password fields are required");
    }


    try {
      setLoading(true);

      await API.patch("/admin/change-password", {
        oldPassword: password.current,
        newPassword: password.new,
      });

      toast.success("Password updated successfully");
      setPassword({ current: "", new: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        
        <Card title="Profile" icon={<User size={18} />}>
          <ReadOnly label="Name" value={profile.name} />
          <ReadOnly label="Email" value={profile.email} />
          <ReadOnly label="Phone" value={profile.phone || "-"} />
        </Card>

       
        <Card title="Change Password" icon={<Lock size={18} />}>
          <Input
            type="password"
            label="Current Password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
          />
          <Input
            type="password"
            label="New Password"
            value={password.new}
            onChange={(e) =>
              setPassword({ ...password, new: e.target.value })
            }
          />

          <div className="flex justify-end pt-2">
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
            >
              <Save size={16} />
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Card = ({ title, icon, children }) => (
  <div className="bg-white border rounded-xl p-6 space-y-4">
    <div className="flex items-center gap-2 text-gray-900 font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);

const ReadOnly = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      value={value}
      disabled
      className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 cursor-not-allowed"
    />
  </div>
);

export default AdminSettings;
