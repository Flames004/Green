import React, { useState } from "react";
import StarRating from "../components/StarRating";
import { Droplet, Sun, TreePalm } from "lucide-react";
import ProductImagesLayout from "../components/ProductImagesLayout";
import PlantFeatures from "../components/PlantFeatures";

const images = [
  {
    id: 1,
    url: "/indoor_plants.jpg",
  },
  {
    id: 2,
    url: "/outdoor.jpg",
  },
  {
    id: 3,
    url: "/plant_pot.jpg",
  },
  {
    id: 4,
    url: "/indoor_plants.jpg",
  },
];

const reviews = [
  {
    name: "Aarav Sharma",
    time: "2 days ago",
    review: "Beautiful and healthy plant. Arrived well packed and fresh.",
    rating: 5
  },
  {
    name: "Neha Verma",
    time: "1 week ago",
    review: "Looks great in my living room. Needs moderate watering.",
    rating: 4
  },
  {
    name: "Rohan Patel",
    time: "3 weeks ago",
    review: "Good quality but delivery took a little longer.",
    rating: 4
  },
  {
    name: "Simran Kaur",
    time: "1 month ago",
    review: "Perfect for beginners. Very easy to take care of.",
    rating: 5
  },
  {
    name: "Vikram Rao",
    time: "2 months ago",
    review: "Plant was smaller than expected but still healthy.",
    rating: 3
  }
];


const PlantDetails = () => {
  const [activeImage, setActiveImage] = useState(images[0]?.url);

  return (
    <div className="min-h-screen m-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-10">
        <div className="max-w-sm md:max-w-xl">
          <ProductImagesLayout
            images={images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>

        <div>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-1 text-xs rounded">Size</button>
            <button className="bg-gray-200 p-1 text-xs rounded">Care</button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">Monte Carlo</h1>
            <p className="p italic">plant category</p>

            <div className="flex gap-2 items-center mt-5">
              <StarRating rating={5} />
              <p className="p text-sm">(126 reviews)</p>
            </div>

            <div className="mt-5">
              <h1 className="text-lg">
                A bold plant with thick, glossy leaves in deep burgundy, perfect
                for <br /> modern interiors.
              </h1>
            </div>
          </div>

          <hr className="mt-5 text-gray-300" />

          <div className="flex items-center justify-around mt-5">
            <PlantFeatures icon={<Sun />} title={"Light"} subtitle={"Bright"} />
            <PlantFeatures
              icon={<Droplet />}
              title={"Water"}
              subtitle={"Medium"}
            />
            <PlantFeatures
              icon={<TreePalm />}
              title={"Care Level"}
              subtitle={"Easy"}
            />
          </div>

          <hr className="mt-5 text-gray-300" />

          <div className="mt-5 flex items-baseline gap-2">
            <h1 className="text-4xl font-semibold">$450</h1>
            <p className="p text-sm">Free shipping over 500</p>
          </div>

          <div className="mt-5">
            <button className="w-full bg-emerald-900 text-white text-md p-2 rounded-lg">
              Add To Cart
            </button>
          </div>

          <div className="max-w-xl mt-20">
            {/* <h1 className="text-xl text-gray-800 font-semibold">Description </h1> */}

            <div className="mt-5">
              <h1 className="text-xl font-bold ">About This Plant</h1>
              <p className="p italic mt-3">
                The Monte Carlo is a lush, elegant plant known for its vibrant
                foliage and effortless charm. Its rich, glossy leaves bring life
                to any corner of your home, making it perfect for living rooms,
                bedrooms, or workspaces. Easy to care for and adaptable to most
                indoor environments, this plant is a great choice for beginners
                and plant lovers alike. With just the right amount of light and
                occasional watering, the Monte Carlo will reward you with fresh,
                healthy growth all year long.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="mt-10">
        <div className="px-10 flex gap-10">
          <div className="max-w-3xl">
            <h1 className="text-xl text-gray-800 font-semibold">Customer Reviews </h1>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
