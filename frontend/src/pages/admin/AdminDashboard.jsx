import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import React from "react";
import Card from "../../components/Card";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 w-full min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Parshant Saini</h1>
        <p className="text-md text-gray-500 mt-1">
          Welcome back to{" "}
          <span className="text-emerald-600 font-medium">GreenLand</span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6 md:grid-cols-2">
        <Card
          title="Total Products"
          quantity="120"
          icon={<Package size={22} />}
        />
        <Card
          title="Total Orders"
          quantity="120"
          icon={<ShoppingCart size={22} />}
        />
        <Card
          title="Total Customers"
          quantity="120"
          icon={<Users size={22} />}
        />
        <Card
          title="Total Revenue"
          quantity="120"
          icon={<TrendingUp size={22} />}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
