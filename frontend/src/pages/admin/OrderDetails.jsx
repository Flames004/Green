import { ArrowLeft, Package, User, CreditCard, Calendar, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderDetail = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderNumber: "ORD-10003",
    createdAt: "2024-01-21T10:30:00Z",
    orderStatus: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    totalAmount: 218.99,
    user: {
      name: "Customer 3",
      email: "customer3@example.com",
    },
    items: [
      {
        id: "1",
        name: "Indoor Plant",
        quantity: 1,
        price: 218.99,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
       
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>

        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order.orderNumber}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <Calendar size={16} />
                <p className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <StatusBadge status={order.orderStatus} />
              <PaymentBadge status={order.paymentStatus} />
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
           
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <User size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-gray-900 font-medium">{order.user.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="text-gray-900">{order.user.email}</p>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <Package size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Product</th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-700">Quantity</th>
                      <th className="px-6 py-4 text-right font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-4 text-right font-semibold text-gray-700">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-900 font-medium">{item.name}</td>
                        <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                        <td className="px-6 py-4 text-right text-gray-600">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
          <div className="space-y-6">
           
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">Update Status</h2>
              </div>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  setOrder({ ...order, orderStatus: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition duration-200">
                Save Status
              </button>
            </div>

            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$0.00</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Payment Method</p>
                  <p className="text-gray-900 font-medium">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1 transition
      ${
        status === "Delivered"
          ? "bg-green-100 text-green-700"
          : status === "Shipped"
          ? "bg-blue-100 text-blue-700"
          : status === "Processing"
          ? "bg-amber-100 text-amber-700"
          : status === "Cancelled"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"
      }`}
  >
    <span className={`w-2 h-2 rounded-full ${
      status === "Delivered"
        ? "bg-green-600"
        : status === "Shipped"
        ? "bg-blue-600"
        : status === "Processing"
        ? "bg-amber-600"
        : status === "Cancelled"
        ? "bg-red-600"
        : "bg-gray-600"
    }`} />
    {status}
  </span>
);

const PaymentBadge = ({ status }) => (
  <span
    className={`px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1 transition
      ${
        status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
  >
    <span className={`w-2 h-2 rounded-full ${status === "Paid" ? "bg-green-600" : "bg-red-600"}`} />
    {status}
  </span>
);

export default OrderDetail;