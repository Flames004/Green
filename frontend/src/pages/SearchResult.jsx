import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const SearchResult = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const res = await API.get(`/products/search?query=${query}`);
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">

      <h1 className="text-xl font-semibold mb-4">
        Search results for "{query}"
      </h1>

      {loading && <p>Loading...</p>}

      {products.length === 0 && !loading && (
        <p>No results found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          
            <ProductCard
              key={item._id}
              product={item}
              productInfo={item.productType}
            />
        ))}
      </div>

    </div>
  );
};

export default SearchResult;
