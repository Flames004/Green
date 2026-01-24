import {
  Package,
  ShoppingCart,
  TrendingUp,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import React from "react";
import Card from "../../components/Card";
import RevenueBarChart from "../../components/RevenueBarChart";
import RecentOrderCard from "../../components/RecentOrderCard";

const AdminDashboard = () => {
  const revenueData = [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 51000 },
    { month: "Apr", revenue: 47000 },
    { month: "May", revenue: 62000 },
    { month: "Jun", revenue: 58000 },
    { month: "Jul", revenue: 69000 },
    { month: "Aug", revenue: 72000 },
    { month: "Sep", revenue: 65000 },
    { month: "Oct", revenue: 81000 },
    { month: "Nov", revenue: 90000 },
    { month: "Dec", revenue: 105000 },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="border-b border-gray-200 shadow-sm flex gap-1 md:gap-2 items-center justify-end p-2 md:p-4">
        <UserCircle size={18} />
        <h5 className=" text-xs md:text-sm text-gray-900">Parshant saini</h5>
      </div>
      <div className="p-2 md:p-4">
        <h1 className="text-xl md:text-2xl font-semibold ">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4">
        <Card
          title="Total Products"
          quantity="10000"
          icon={<Package size={22} />}
        />
        <Card
          title="Total Orders"
          quantity="3000"
          icon={<ShoppingCart size={22} />}
        />
        <Card
          title="Total Customers"
          quantity="400"
          icon={<Users size={22} />}
        />
        <Card
          title="Total Revenue"
          quantity="$ 1200"
          icon={<TrendingUp size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 p-2 md:p-4 gap-5 pb-24">
        <div className="border border-gray-300 p-2 md:p-6 rounded-lg lg:col-span-2 bg-white">
          <RevenueBarChart data={revenueData} />
        </div>

        <div className="border border-gray-300 bg-white p-4 rounded-lg lg:col-span-1 overflow-y-scroll h-[23rem]">
          <h1 className="font-semibold">Recent Orders</h1>
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
          <RecentOrderCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
