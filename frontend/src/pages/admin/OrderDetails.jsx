import { ArrowLeft } from "lucide-react";
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
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">
              Order #{order.orderNumber}
            </h1>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <StatusBadge status={order.orderStatus} />
            <PaymentBadge status={order.paymentStatus} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6 space-y-2">
          <h2 className="text-sm font-semibold">Customer</h2>
          <p className="text-sm">{order.user.name}</p>
          <p className="text-xs text-gray-500">{order.user.email}</p>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-3">
          <h2 className="text-sm font-semibold">Update Order Status</h2>

          <select
            value={order.orderStatus}
            onChange={(e) =>
              setOrder({ ...order, orderStatus: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <button className="w-full mt-2 bg-emerald-600 text-white text-sm py-2 rounded-md hover:bg-emerald-500">
            Save Status
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">${item.price}</td>
                <td className="px-4 py-3 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-3">
        <h2 className="text-sm font-semibold">Order Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Total Amount</span>
          <span className="font-semibold">${order.totalAmount}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Payment Method</span>
          <span>{order.paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded text-xs font-semibold
      ${
        status === "Delivered"
          ? "bg-green-100 text-green-700"
          : status === "Shipped"
          ? "bg-purple-100 text-purple-700"
          : status === "Processing"
          ? "bg-blue-100 text-blue-700"
          : status === "Cancelled"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
  >
    {status.toLowerCase()}
  </span>
);

const PaymentBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
  >
    {status.toLowerCase()}
  </span>
);

export default OrderDetail;
