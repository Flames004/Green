import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import { CircleUser, Droplet, Sun, TreePalm } from "lucide-react";
import ProductImagesLayout from "../components/ProductImagesLayout";
import PlantFeatures from "../components/PlantFeatures";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../redux/cartSlice";
import ReviewsSection from "../components/ReviewSection";


const PlantDetails = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const [plant, setPlant] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const decrease = () => {
    return setQuantity(quantity - 1);
  };

  const increase = () => {
    return setQuantity(quantity + 1);
  };

  const { id } = useParams();

  const fetchPlantDetail = async () => {
    try {
      const { data } = await API.get(`/products/single-plant/${id}`);

      setPlant(data.data[0]);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantDetail();
  }, []);

  useEffect(() => {
    if (plant?.images?.length) {
      setActiveImage(plant.images[0].url);
    }
  }, [plant]);

  const addToCartHandler = async () => {
  if (!auth) {
    navigate("/login");
    return;
  }

  try {
    const res = await dispatch(
      addItem({ productId: plant._id, quantity })
    ).unwrap();

    toast.success("Item added to cart");

  } catch (error) {
    if (error.statusCode === 401) {
      toast.error("Please login again");
      navigate("/login");
    } else {
      toast.error(error.message || "Something went wrong");
    }
  }
};



  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:m-2 md:m-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-5 p-4 md:p-10">
        <div className="max-w-sm md:max-w-xl">
          <ProductImagesLayout
            images={plant.images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>

        <div>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-1 text-xs rounded">
              {plant.size}
            </button>
            <button className="bg-gray-200 p-1 text-xs rounded">
              {plant.plantDetails.carelevel}
            </button>
          </div>

          <div className="mt-1 md:mt-5 flex flex-col md:gap-2">
            <h1 className="sm:text-4xl font-semibold text-2xl">{plant.name}</h1>
            <p className="p italic">{plant.plantDetails.category}</p>

            <div className="flex gap-2 items-center mt-1 md:mt-3">
              <StarRating rating={5} />
              <p className="p text-sm">(126 reviews)</p>
            </div>

            <div className="mt-1 md:mt-3">
              <h1 className="text-sm md:text-lg ">{plant.title}</h1>
            </div>
          </div>

          <hr className="mt-2 md:mt-5 text-gray-300" />

          <div className="flex items-center justify-around mt-2 md:mt-5">
            <PlantFeatures
              icon={<Sun className="w-4 h-4 sm:h-6 sm:w-6" />}
              title={"Light"}
              subtitle={plant.plantDetails.light}
            />
            <PlantFeatures
              icon={<Droplet className="w-4 h-4 sm:h-6 sm:w-6" />}
              title={"Water"}
              subtitle={plant.plantDetails.water}
            />
            <PlantFeatures
              icon={<TreePalm className="w-4 h-4 sm:h-6 sm:w-6" />}
              title={"Care Level"}
              subtitle={plant.plantDetails.carelevel}
            />
          </div>

          <hr className="mt-2 md:mt-5 text-gray-300" />

          <div className="mt-2 md:mt-5 flex items-baseline gap-2">
            <h1 className="text-2xl md:text-4xl font-semibold">
              &#8377; {plant.price}
            </h1>
            <p className="p text-xs md:text-sm">Free shipping over 500</p>
          </div>

          <div className="mt-2 md:mt-5">
            <div className="flex gap-5">
              
              <div className="flex items-center justify-between border-2 border-gray-500 rounded-lg min-w-[30%] px-2">
                <button
                  onClick={decrease}
                  className="px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 cursor-pointer"
                  disabled={quantity === 1}
                >
                  −
                </button>

                <span className="px-4 text-sm md:text-md font-semibold select-none">
                  {quantity}
                </span>

                <button
                  onClick={increase}
                  className="px-3 py-2 text-lg font-medium cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  +
                </button>
              </div>

              
              <button
                onClick={() => addToCartHandler()}
                className="w-full bg-emerald-900 text-white text-sm md:text-md p-2 rounded-lg cursor-pointer"
              >
                Add To Cart
              </button>
            </div>

            <button className="w-full border-2 border-emerald-900 hover:bg-gray-200/90 text-black cursor-pointer mt-2 text-sm md:text-md p-2 rounded-lg">
              Buy Now
            </button>
          </div>

          <div className="max-w-xl md:mt-10 ">
            <div className="mt-2 md:mt-5">
              <h1 className="text-xl font-bold ">About This Plant</h1>
              <p className="p italic text-sm sm:text-md mt-1 md:mt-3">
                {plant.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="mt-4 md:mt-10">
        <ReviewsSection productId={plant._id} />
      </div>

      <div className="mt-10 px-10 min-h-screen">
        <h1 className="font-bold text-3xl">You may Also like</h1>
      </div>
    </div>
  );
};

export default PlantDetails;
