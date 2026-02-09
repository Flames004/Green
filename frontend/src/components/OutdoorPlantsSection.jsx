import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";
import { Sun, Droplets, TreePine } from "lucide-react";

const OutdoorPlantsSection = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOutdoorPlants = async () => {
    try {
      const { data } = await API.get(
        "/products/all/plants?category=Outdoor&available=true&limit=8"
      );
      setPlants(data.data.docs);
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutdoorPlants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 bg-[#f6f7f4]">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-[#f8f9f6] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-2 ">

        <div className="text-center max-w-2xl mx-auto mb-6">

          <h2 className="mt-1 text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Outdoor Collections
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-600">
            Carefully selected plants built to handle sunlight, weather, and open environments with ease.
          </p>
        </div>

        {plants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {plants.map((plant) => (
              <ProductCard key={plant._id} product={plant} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            No outdoor plants available at the moment
          </div>
        )}

        <div className="mt-12 md:mt-16 flex justify-center">
          <Link to="/plants?category=Outdoor">
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-2 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
              View All Outdoor Plants
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OutdoorPlantsSection;
