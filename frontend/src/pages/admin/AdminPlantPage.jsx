import { Edit2, Search, Trash2 } from "lucide-react";
import React from "react";

const AdminPlantPage = () => {
  const filteredProducts = [
    {
      id: 1,
      name: "Fiddle Leaf Fig",
      category: "Indoor Plant",
      price: 45.99,
      stock: 20,
      available: true,
      featured: true,
    },
    {
      id: 2,
      name: "Snake Plant",
      category: "Indoor Plant",
      price: 30.0,
      stock: 5,
      available: true,
      featured: false,
    },
    {
      id: 3,
      name: "Monstera Deliciosa",
      category: "Indoor Plant",
      price: 55.5,
      stock: 0,
      available: false,
      featured: true,
    },
    {
      id: 4,
      name: "Peace Lily",
      category: "Indoor Plant",
      price: 25.75,
      stock: 12,
      available: true,
      featured: false,
    },
    {
      id: 5,
      name: "ZZ Plant",
      category: "Indoor Plant",
      price: 40.0,
      stock: 18,
      available: true,
      featured: true,
    },
    {
      id: 6,
      name: "Spider Plant",
      category: "Indoor Plant",
      price: 20.0,
      stock: 8,
      available: true,
      featured: false,
    },
    {
      id: 7,
      name: "Aloe Vera",
      category: "Succulent",
      price: 15.0,
      stock: 25,
      available: true,
      featured: true,
    },
    {
      id: 8,
      name: "Jade Plant",
      category: "Succulent",
      price: 22.5,
      stock: 0,
      available: false,
      featured: false,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen w-full p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Plants</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Manage your plant and inventory here.
        </p>
      </div>
      <div className="w-full bg-white rounded-xl flex gap-2 p-3 mt-6 border border-gray-300 ">
        <Search />
        <input
          type="text"
          placeholder="Search here"
          className="w-full h-full outline-none  text-md"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="mt-4 bg-white border border-gray-300 
          rounded-lg px-4 py-2 text-sm outline-none cursor-pointer text-center w-40"
        >
          Featured
        </button>
        <button
          type="button"
          className="mt-4 bg-white border border-gray-300 
          rounded-lg px-4 py-2 text-sm outline-none cursor-pointer text-center w-40"
        >
          Available
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden mt-6 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-100 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.stock > 15
                            ? "bg-emerald-100 text-emerald-700"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div className="flex items-center gap-3">
                        {/* Availability */}
                        <span
                          className="inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-medium 
      border-gray-200 bg-white text-gray-700"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              product.available ? "bg-gray-800" : "bg-gray-300"
                            }`}
                          ></span>
                          {product.available ? "Available" : "Unavailable"}
                        </span>

                        {/* Featured */}
                        <span
                          className="inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-medium 
      border-gray-200 bg-white text-gray-600"
                        >
                          {product.featured ? "Featured" : "Standard"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition text-emerald-600 hover:text-emerald-700">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition text-red-600 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPlantPage;
