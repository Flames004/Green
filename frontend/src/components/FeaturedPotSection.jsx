import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import API from '../api/axios';
import { toast } from "react-toastify";
import { Loader } from './Loader';
import { Link } from 'react-router-dom';



const FeaturedPotSection = () => {

   const [pots, setPots] = useState([]);
   const [loading, setLoading] = useState(true);


   const AllPots = async()=>{
      try {
        const {data} = await API.get("/products/all/pots?featured=true&available=true&limit=9");
        setPots(data.data.docs);
        
      } catch (error) {
        toast.error("Server Error");
        console.log(error);
        
      } finally{
        setLoading(false);
      }
    }

  useEffect(()=>{

    AllPots();

  }, []) 


   if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <Loader/>
      </div>
    );
  }

  return (
    <div className='py-10 md:py-5 px-5 md:px-25'>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {pots.map((pot) =>(
            <ProductCard key={pot._id} product={pot}/>
        ))}
      </div>
      <div className='text-end py-10 md:py-10'>
        <Link to={"/pots"}>
        <button className=' text-white  p-3 rounded-full bg-emerald-800'>
            View All
      </button>
      </Link>
      </div>
    </div>
  )
}

export default FeaturedPotSection
